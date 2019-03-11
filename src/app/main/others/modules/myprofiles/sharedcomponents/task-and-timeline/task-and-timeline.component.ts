import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AuthService } from 'app/main/login/auth/auth.service';
import { Router, NavigationEnd } from "@angular/router";
import { filter, takeUntil } from 'rxjs/operators';
import { GetTimelineDataService } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-service/task-timeline.service';
import swal from 'sweetalert';
import { Observable, Subject } from 'rxjs';
import { GlobalsService } from 'app/globals/globals.service';
import { GiftcoinProfileComponent } from "./modal/giftcoin/giftcoin.component";
import { BlockModalComponent } from './block-modal/block-modal.component';
import { ChatPanelService } from 'app/layout/components/chat-panel/chat-panel.service';


@Component({
  selector: 'app-task-timeline',
  templateUrl: './task-and-timeline.html',
  styleUrls: ['./task-and-timeline.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TaskTimeLineComponent implements OnInit, OnDestroy {

  PROFILEIMAGE: any;
  userStatusOptions: any[];
  userInfo: any = {};
  usersocialConnect: any = [];

  countFollowersData: any;
  countFollowingsData: any;
  countConnectionsData: any;
  countActivityScoreData: any;
  countReputationScoreData: any;

  myUserInfo: any;
  dialogRef: any;
  routerEvents: any;
  username: string;
  childrenLinks: string = 'timeline';
  urlParams: string;
  loadingTimeline: boolean;

  followingState: boolean = false;
  followLabel: string = 'Follow';

  indexTabs: number = 0;
  indexTabsEqualValues: any = {
    ACTIVE_TASK: 0,
    TIMELINE: 1,
  };

  component_type: string;

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
    public _matDialog: MatDialog,
    public _getUserProfile: GetTimelineDataService,
    private _globals: GlobalsService,
    private _Chat: ChatPanelService,
  ) {

    this.myUserInfo = this._auth.userInfo;
    this._unsubscribeAll = new Subject();
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      this.routerEvents = res;
      if (this.routerEvents.url) {
        this.username = this.routerEvents.url.split("/")[3];
        this.returnOfPromiseOfProfileData();
      }
    });
  }

  ngOnInit(): void {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE;

  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
  }

  public get authorized(): boolean {
    return true;
  }

  viewChildrenLink(data: any): void {
    this.childrenLinks = data;
  }



  returnOfPromiseOfProfileData(): Observable<any> | Promise<any> | any {

    this.loadingTimeline = true;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.poppulateData(),
        this.countFollowers(),
        this.countFollowings(),
        this.countConnections(),
        this.countActivityScore(),
        this.countReputationScore()
      ]).then(
        ([values]) => {
          this.loadingTimeline = false;
          resolve();
        },
        reject
      );
    });
  }

  poppulateData(): Promise<any> {

    this.userInfo = {};
    return new Promise((resolve, reject) => {
      this._getUserProfile.requestProfileData(this.username)
        .pipe(
          takeUntil(this._unsubscribeAll)
        )
        .subscribe((response: any) => {
          const copyUserInfo = this._getUserProfile.decodeJwt(response.data);
          this.userInfo = { ...copyUserInfo, ... this._getUserProfile.profileDataExtra(copyUserInfo) };
          localStorage.setItem('activeTaskUserId', this.userInfo.user_id);
          const isMyActiveTask = parseInt(this.userInfo.user_id, 10) === this.myUserInfo.user_id ? '1' : '0';
          localStorage.setItem('isMyActiveTask', isMyActiveTask);
          resolve(this.getSocialsData());
        }, reject);
    }
    );
  }

  getSocialsData(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.requestSocialConnectResponse(this.userInfo.user_id)
        .subscribe((response: any) => {
          const copySocialInfo = this._getUserProfile.decodeJwt(response.data);
          const itHasCountedValues = ('task' in copySocialInfo) ? copySocialInfo.task : copySocialInfo;
          this.usersocialConnect = itHasCountedValues || [];
          resolve(this.usersocialConnect);
        }, reject);
    }
    );
  }

  /**
   * count all followers, following, connections
   */
  countFollowers(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.countFollowers(this.username)
        .subscribe((response: any) => {
          const countFollowersInfo = response.data;
          this.countFollowersData = countFollowersInfo;
          resolve(this.countFollowersData);
        }, reject);
    }
    );

  }

  countFollowings(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.countFollowings(this.username)
        .subscribe((response: any) => {
          const countFollowingInfo = response.data;
          this.countFollowingsData = countFollowingInfo;
          resolve(this.countFollowingsData);
        }, reject);
    }
    );

  }

  countConnections(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.countConnections(this.username)
        .subscribe((response: any) => {
          const countConnectionInfo = response.data;
          this.countConnectionsData = countConnectionInfo;
          resolve(this.countConnectionsData);
        }, reject);
    }
    );

  }

  countActivityScore(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.countActivityScore(this.username)
        .subscribe((response: any) => {
          const countActivityScoreInfo = response.data;
          this.countActivityScoreData = countActivityScoreInfo;
          resolve(this.countActivityScoreData);
        }, reject);
    }
    );

  }

  countReputationScore(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._getUserProfile.countReputationScore(this.username)
        .subscribe((response: any) => {
          const countReputationScoreInfo = response.data;
          this.countReputationScoreData = countReputationScoreInfo;
          resolve(this.countReputationScoreData);
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

  openLinkSocial(type: string, id: any) {
    switch (type) {
      case 'facebook':
        this.openlinkNewTab(`https://www.facebook.com/${id}`);
        break;
      case 'linkedin':
        this.openlinkNewTab(`${id}`);
        break;
      case 'instagram':
        this.openlinkNewTab(`https://www.instagram.com/${id}`);
        break;
      case 'steemit':
        this.openlinkNewTab(`https://www.steemit.com/@.${id}`);
        break;
      case 'google-plus':
        this.openlinkNewTab(`https://plus.google.com/u/0/${id}`);
        break;
      case 'twitter':
        this.openlinkNewTab(`https://www.twitter.com/${id}`);
        break;
    }
  }
  openlinkNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();

  }
  /**
   * Search
   *
   * @param value
   */
  submitRequest(): void {

  }

  copyData(type: string, codes: string) {
    const message = this.alertType().messageType[`${type}`];
    swal({
      title: "Copied",
      text: message,
      icon: "success",
      dangerMode: true,
    });



    this.copyCommand(codes);

  }

  copyCommand(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }
  alertType() {
    return {
      messageType: {
        code: 'Code has copied!',
        link: 'Links has copied!'
      },

    }
  }

  openGiftDialog(): void {
    const userDatas = { task: this.userInfo };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = "giftcoin-task-dialog";
    dialogConfig.data = { ...userDatas };
    dialogConfig.autoFocus = true;
    const dialogRef = this._matDialog.open(GiftcoinProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  hookServiceChat(): void {
    console.log(this.userInfo.user_id);
    this._Chat.event('toggleChat', {contact_id: this.userInfo.user_id});
  }

  followUnfollow() {
    if (!this.userInfo.user_id) {
      swal({
        title: 'Either data is not available!',
        text: 'Please Try to Refresh the page',
        timer: 3000,
        icon: "info",
      });
      return;
    }
    /*    
    'SUBJECT TO CHANGE PARAMETER IF API IS IMPLEMENTED'

    const parameterFollow = {
      follower_id: this.myUserInfo.user_id, 
      followed_id: this.userInfo.user_id, 
      status: 1,
      is_profile: 1,
    } 
    */
    const followState = !this.userInfo.is_follower ? 1 : 0;

    const parameterFollow = {
      follower_id: this.myUserInfo.user_id,
      followed_id: this.userInfo.user_id,
      status: followState,
      is_profile: 1,
    };

    this._getUserProfile.followUnfollow(parameterFollow).then((response: any) => {
      if (response.code == 200 || response.code == 201) {
        this.followingState = !this.followingState;
        this.userInfo.is_follower = !this.userInfo.is_follower;

        const msgType = this.userInfo.is_follower ? `isFollow` : `isUnFollow`;
        this.followLabel = this.message[msgType].title;
        swal({
          title: this.message[msgType].title,
          text: this.message[msgType].text + ` ${this.userInfo.name}`,
          timer: 3000,
          icon: "success",
        });
      }
    })
  }

  openBlockDialog(): void {

    const userDatas = { otherInfo: this.userInfo, myInfo: this.myUserInfo };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = "block-user-dialog";
    dialogConfig.data = { ...userDatas };
    dialogConfig.autoFocus = true;
    const dialogRef = this._matDialog.open(BlockModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });

  }

}
