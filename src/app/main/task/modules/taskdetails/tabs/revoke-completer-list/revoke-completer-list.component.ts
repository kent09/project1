import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest } from 'app/main/task/modules/taskdetails/tabs/revoke-completer-list/task-revoke-compoleter-list.service';
import { Router } from "@angular/router";


@Component({
  selector: 'revoke-completer-list',
  templateUrl: './revoke-completer-list.component.html',
  styleUrls: ['./revoke-completer-list.component.scss'],
  animations: fuseAnimations
})
export class RevokeCompleterListComponent implements OnInit {

  displayedColumns = ['name', 'date', 'disabled', 'actions'];


  exampleDatabase: SuperCoinHttpRequest | null;
  data: BANK_API[] = [];
  slug: any;
  PROFILEIMAGE: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  private _unsubscribeAll: Subject<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input('slug') slugs: string;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE

    this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getBankDatas(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.slugs);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = decodedData.count;

          return ('task' in decodedData) ? decodedData.task : decodedData;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data });
  }

}

