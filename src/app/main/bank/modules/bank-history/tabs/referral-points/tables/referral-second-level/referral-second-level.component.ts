import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API , SuperCoinHttpRequest } from 'app/main/bank/modules/bank-history/tabs/referral-points/tables/referral-second-level/referral-second-level.service';
import { SecondLevelComponent } from '../modal/second-level/second-level.component';

@Component({
  selector: 'app-bank-referral-second-level',
  templateUrl: './referral-second-level.component.html',
  styleUrls: ['./referral-second-level.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BankReferralSecondTableComponent implements OnInit {

  displayedColumns = ['category', 'avatar', 'name', 'task_title', 'points', 'completed_date', 'status', 'option'];
  exampleDatabase: SuperCoinHttpRequest | null;
  data: BANK_API[] = [];
  PROFILEIMAGE : any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _dialog: MatDialog,
    private _auth: AuthService) { }

  ngOnInit() {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getBankDatas(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = decodedData.count;

          return decodedData.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data });
  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
  }

  openDialog(detail): void {
    const dialogRef = this._dialog.open(SecondLevelComponent, {
      data: detail
    });
  }

}



