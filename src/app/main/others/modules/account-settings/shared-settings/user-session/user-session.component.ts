import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { SESSION_API , UserSessionHttpRequest } from 'app/main/others/modules/account-settings/shared-settings/user-session/user-session.service';

@Component({
  selector: 'app-tab-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserSessionTabsComponent implements OnInit {

  
 displayedColumns = ['ip', 'action', 'loc', 'model', 'date', 'browser'];s
  exampleDatabase: UserSessionHttpRequest | null;
  data: SESSION_API[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  no_record = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  ngOnInit() {

    this.exampleDatabase = new UserSessionHttpRequest(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getBankDeposit(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          if(data.code == '200'){
            const decodedData = this._globals.parseJwt(data.data);
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = decodedData.total_count;
            return ('list' in decodedData ) ? decodedData.list : decodedData;
          }else{
            this.no_record = "No records found!";
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
          }
          
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data});
  }

}
