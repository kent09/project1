import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { AuthService } from 'app/main/login/auth/auth.service';
import { Router, NavigationEnd } from "@angular/router";
import { filter, takeUntil } from 'rxjs/operators';
import { GetTimelineDataService } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-service/task-timeline.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-timeline-shared',
  templateUrl: './shared-timeline.component.html',
  styleUrls: ['./shared-timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TimeLineComponent implements OnInit, OnDestroy {

  public timeline: any;
  timeLineData: any = [];
  userInfo: any = {};
  dialogRef: any;
  routerEvents: any;
  username: string;
  urlParams: string;
  resultsLength = 0;
  loadingTimeline: boolean;
  private _unsubscribeAll: Subject<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {AuthService} _auth
   * @param {MatDialog} _matDialog
   */
  constructor(
    private router: Router,
    private _auth: AuthService,
    private _getTimeLine: GetTimelineDataService,
    public _matDialog: MatDialog,
  ) {
    this._unsubscribeAll = new Subject();
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      this.routerEvents = res;
      if (this.routerEvents.url) {
        this.username = this.routerEvents.url.split("/")[3];
        this.returnOfPromiseOfTimelineData();
      }
    });
  }

  ngOnInit(): void {
    // this.poppulateData();
  }


  returnOfPromiseOfTimelineData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.poppulateData()
      ]).then(
        ([values]) => {
          resolve();
        },
        reject
      );
    });
  }


  poppulateData(): Promise<any> {

    this.timeLineData = [];
    this.loadingTimeline = true;
    return new Promise((resolve, reject) => {
      this._getTimeLine.requestTimeLineData(this.username)
        .subscribe((response: any) => {
          this.timeline = this._getTimeLine.decodeJwt(response.data);
          if (this.timeline.data) {
            for (let x in this.timeline.data) {
              this.timeLineData.push({ dd: x, data: this.timeline.data[x] });
            }
            this.loadingTimeline = false;
            this.resultsLength = this.timeline.count;
          }
          resolve(this.timeLineData);
        }, reject);
    }
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  oddOrEven(x) {
    return (x & 1) ? true : false;
  }




}
