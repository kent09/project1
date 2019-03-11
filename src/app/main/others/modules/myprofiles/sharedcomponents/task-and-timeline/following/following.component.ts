import { Component,  EventEmitter, ElementRef, OnDestroy, OnInit, Input, ViewChild, ViewEncapsulation, Output } from '@angular/core';
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
import { GiftcoinProfileComponent } from '../modal/giftcoin/giftcoin.component';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FollowingComponent implements OnInit {

 
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

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
  searchKey:any;
  PROFILEIMAGE: any;
  private _unsubscribeAll: Subject<any>;
  myUserInfo: any;
  followingState:boolean = false;
  followLabel:string = 'Follow';
  toTimeline: string = 'timeline';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() userNames: string;
  @Output() followingToTimeline = new EventEmitter<string>();

  constructor(private http: HttpClient, 
              private _globals: GlobalsService,
              private _auth: AuthService,
              public _matDialog: MatDialog,
              public _getUserProfile: GetTimelineDataService,
              private router: Router,
              private actvRoute : ActivatedRoute) {

    this.userInfo = this._auth.userInfo;
    this._unsubscribeAll = new Subject();            
  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
  }


  ngOnInit() {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE;
    this.activeFollwers = new FFCHttpRequest(this.http, this._globals, this._auth,this.actvRoute);
  
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.activeFollwers!.getAllFollowers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, 'following', this.searchKey);
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

  followUnfollow(data) {   

    const parameterFollow = {
      follower_id: this.userInfo.user_id, 
      followed_id: data.user_id, 
      status: 0,
      is_profile: 1,
    };

    this._getUserProfile.followUnfollow(parameterFollow).then((response: any) => {
      if (response.code == 200 || response.code == 201) {
        swal({
          title: 'Unfollowed',
          text: 'you unfollowed ' + ` ${data.name}`,
          timer: 3000,
          icon: "success",
        });

        const newData = this.data.filter( el => el.user_id !==  data.user_id ) || []; 
        this.data = newData;
        this.resultsLength = this.resultsLength - 1;
      }
    })
  }

  back() {
    this.followingToTimeline.emit(this.toTimeline);
  }

}
