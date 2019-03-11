import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { PurchaseService, PURCHASE_API } from './purchase.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { merge, of as observableOf } from 'rxjs';
import { switchMap, startWith, map, catchError } from 'rxjs/operators';
import { PurchaseDetailsComponent } from './modal/purchase-details/purchase-details.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PurchaseComponent implements OnInit {

  displayedColumns = ['purchased_date', 'membership_type', 'charged_by', 'status','paid','option'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  exampleDatabase: PurchaseService | null;
  data: PURCHASE_API[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _dialog: MatDialog,
    private _auth: AuthService) { }

  ngOnInit() {
    this.exampleDatabase = new PurchaseService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getPurchase(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = decodedData.count;
          
          return ('task' in decodedData ) ? decodedData.task : decodedData.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data});
  }

  openDialog(detail) {
    const dialogRef = this._dialog.open(PurchaseDetailsComponent, {
      data: { history : detail}
    });
  }

 
}



