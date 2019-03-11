
import { Component, ElementRef, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd } from "@angular/router";
import { filter, takeUntil } from 'rxjs/operators';

import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { ACTIVETASK, FFCHttpRequest } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/connections/connections.service';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ConnectionsComponent implements OnInit, OnChanges {
 
  loadingTimeline: boolean;
  follower: Array<any> = [];

  displayedColumns = ['name', 'option'];
  userInfo: any = {};
  activeFollwers: FFCHttpRequest | null;
  data: ACTIVETASK[] = [];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isMyActiveTask:any;
  routerEvents: any;
  searchKey: any;
  PROFILEIMAGE: any;
  toTimeline : string = 'timeline';
  private _unsubscribeAll: Subject<any>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() userNames: string;
  @Output() connectionToTimeline = new EventEmitter<string>();

  constructor(private http: HttpClient, 
              private _globals: GlobalsService,
              private _auth: AuthService,
              private router: Router) {

    this.userInfo = this._auth.userInfo;
    this._unsubscribeAll = new Subject(); 
  }

  ngOnChanges(userNames: SimpleChanges) {
      
    const isValid = userNames.userNames.currentValue && userNames.userNames.previousValue;
    if (isValid) {
      const isNotSimilar = userNames.userNames.currentValue !== userNames.userNames.previousValue;
      if (isNotSimilar) {
        this._unsubscribeAll.next();
        this.paginator.pageIndex = 0;
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      }
    }

  }

  ngOnInit() {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.activeFollwers = new FFCHttpRequest(this.http, this._globals, this._auth);  
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageIndex = 0;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.activeFollwers!.getAllFollowers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, 'connections', this.searchKey);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data)
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
        
          const itHasCountedValues = decodedData.count;
          this.resultsLength = itHasCountedValues;
          return decodedData.list;

        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        }),
        takeUntil(this._unsubscribeAll)
      ).subscribe((data) => { this.data = data });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  navigateUsers(username: any, userID: any){
    localStorage.setItem('activeTaskUserId', userID);
    this.router.navigate([`/others/profile/${username}`]);
    this.paginator.pageIndex = 0;
    setTimeout(() =>{
      this.ngOnInit();
    }, 500);
  }

  searchList(search_key){
    this.searchKey = search_key;
    this.ngOnInit();
  }

  back() {
    this.connectionToTimeline.emit(this.toTimeline);
  }

}
