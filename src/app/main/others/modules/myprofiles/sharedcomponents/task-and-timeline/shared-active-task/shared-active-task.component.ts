import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd } from "@angular/router";
import { filter, takeUntil } from 'rxjs/operators';

import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { ACTIVETASK, ActiveTaskHttpRequest } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-service/task-timeline.service';

@Component({
  selector: 'app-shared-active-task',
  templateUrl: './shared-active-task.component.html',
  styleUrls: ['./shared-active-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SharedActiveTaskComponent implements OnInit {

  displayedColumns = ['user', 'title', 'created_at', 'reward'];
  displayedColumnsMyTask = [ 'title', 'created_at', 'reward'];
  userInfo: any = {};
  activeTaskData: ActiveTaskHttpRequest | null;
  data: ACTIVETASK[] = [];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isMyActiveTask:any;
  routerEvents: any;
  private _unsubscribeAll: Subject<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, 
              private _globals: GlobalsService,
              private _auth: AuthService,
              private router: Router) {

    this.userInfo = this._auth.userInfo;
   
    this._unsubscribeAll = new Subject();            
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      this.routerEvents = res;
      setTimeout(() =>{
        this.populateListOfActiveTask();
        this.isMyActiveTask = localStorage.getItem('isMyActiveTask') == '1';     
      }, 500)
    });
    
  }

  ngOnInit() {
  }

  populateListOfActiveTask() {
    this.activeTaskData = new ActiveTaskHttpRequest(this.http, this._globals, this._auth);
    // If the user changes the sort order, reset back to the first page.
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.activeTaskData!.getActiveTask(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data)
          // Flip flag to show that loading has finished.
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

