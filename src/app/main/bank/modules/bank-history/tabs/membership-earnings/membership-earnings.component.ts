import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { switchMap, startWith, map, catchError } from 'rxjs/operators';
import { MembershipEarningsService, MEMBERSHIP_API } from './membership-earnings.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { MemDetailsComponent } from './modal/mem-details/mem-details.component';

@Component({
  selector: 'app-membership-earnings',
  templateUrl: './membership-earnings.component.html',
  styleUrls: ['./membership-earnings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MembershipEarningsComponent implements OnInit {
  
  displayedColumns = ['level', 'referral_name', 'membership_type', 'purchased_date', 'earnings','status','option'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  exampleDatabase: MembershipEarningsService | null;
  data: MEMBERSHIP_API[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _dialog: MatDialog,
    private _auth: AuthService) { }

  ngOnInit() {
    this.exampleDatabase = new MembershipEarningsService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getMembership(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = decodedData.count;
          
          return ('task' in decodedData ) ? decodedData.task : decodedData;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data.list});
  }

  openDialog(detail): void {
    const dialogRef = this._dialog.open(MemDetailsComponent, {
      data: detail
    });
  }
}



