import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, SimpleChanges, ViewChild, ViewEncapsulation, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, takeUntil } from 'rxjs/operators';


import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

import { ACTIVETASK, FFCHttpRequest, GetTimelineDataService } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-service/task-timeline.service';
import { GiftcoinProfileComponent } from "../modal/giftcoin/giftcoin.component";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FollowersComponent implements OnInit, OnDestroy, OnChanges {

  loadingTimeline: boolean;
  follower: Array<any> = [];

  displayedColumns = ['name', 'option'];
  userInfo: any = {};
  activeFollwers: FFCHttpRequest | null;
  data: ACTIVETASK[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isMyActiveTask: any;
  routerEvents: any;
  searchKey: any;
  PROFILEIMAGE: any;
  myUserInfo: any;
  followingState:boolean = false;
  followLabel:string = 'Follow';
  toTimeline : string = 'timeline';

  message: object = {
    isFollow: {
      title: 'Followed',
      text: 'you followed'
    },
    isUnFollow: {
      title: 'Unfollowed',
      text: 'you unfollowed'
    }
  };

  private _unsubscribeAll: Subject<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() userNames: string;

  @Output() followerToTimeline = new EventEmitter<string>();



  constructor(private http: HttpClient, 
    private _globals: GlobalsService,
    private _auth: AuthService,
    public _matDialog: MatDialog,
    public _getUserProfile: GetTimelineDataService,
    private router: Router,
    private actveRoute : ActivatedRoute) {

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
          this.toAvoidUsingHooks();
        }, 1000);
      }
    }

  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
  }

  ngOnInit() {
    this.toAvoidUsingHooks();
  }

  toAvoidUsingHooks(){
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE;
    this.activeFollwers = new FFCHttpRequest(this.http, this._globals, this._auth,this.actveRoute);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageIndex = 0;
    
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.activeFollwers!.getAllFollowers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, 'followers', this.searchKey);
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
      ).subscribe((data) => { this.data = data;});

  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  navigateUsers(username: any, userID: any) {
    localStorage.setItem('activeTaskUserId', userID);
    this.router.navigate([`/others/profile/${username}`]);
    this.paginator.pageIndex = 0;
    setTimeout(() => {
      this.toAvoidUsingHooks();
    }, 500);
  }


  follow() {
  }



  followUnfollow(value, is_followed) {   

    const status = is_followed ? 0 : 1;
    // const toggle = is_followed ? is_followed : false;

    const parameterFollow = {
      follower_id: this.userInfo.user_id, 
      followed_id: value.user_id, 
      status: status,
      is_profile: 1,
    };

    is_followed
    this._getUserProfile.followUnfollow(parameterFollow).then((response: any) => {
      if (response.code == 200 || response.code == 201) {
        this.followingState = !this.followingState;
        const msgType = this.followingState ? `isFollow` : `isUnFollow`;
        this.followLabel = this.message[msgType].title;
        swal({
          title: this.message[msgType].title,
          text: this.message[msgType].text + ` ${value.name}`,
          timer: 3000,
          icon: "success",
        });
        const newData = this.data.filter((el) =>{ 
                if(el.user_id ===  value.user_id){
                    el.is_followed = !is_followed; 
                } 
                return el || [];
            });
        this.data = newData;
      }
    })
  }


  searchList(search_key){
    this.searchKey = search_key;
    this.toAvoidUsingHooks();
  }

  openGiftDialog(userid, name): void {
    const userDatas = { user_id: userid, name: name };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = "giftcoin-task-dialog";
    dialogConfig.data = { ...userDatas };
    dialogConfig.autoFocus = true;
    const dialogRef = this._matDialog.open(GiftcoinProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  back() {
    this.followerToTimeline.emit(this.toTimeline);
  }

}

