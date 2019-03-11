import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
// import { BANK_API, OwnLeaderboardService } from './own-leaderboard.service';
import { Router, ActivatedRoute } from "@angular/router";
import { GiftCoinComponent } from '../shared-modal/gift-coin/gift-coin.component';
import swal from 'sweetalert';
import { BANK_API,OwnLeaderboardService } from './user-leaderboard.service';
@Component({
  selector: 'app-user-leaderboard',
  templateUrl: './user-leaderboard.component.html',
  styleUrls: ['./user-leaderboard.component.scss']
})
export class UserLeaderboardComponent implements OnInit {

  subTables : string = 'leaderboard';

  // exampleDatabase: OwnLeaderboardService | null;
  data: BANK_API[] = [];
  headerData: any = {};
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  PROFILEIMAGE : any;
  dataSource : any;
  filter_range = 'wt10';
  filter_date = null;
  leaderboard_name : any;
  leaderboard_earnings : any;
  total_earnings : any;
  leaderboard_username : any;
  leaderboard_userid : any;
  follower_status : any;
  datax : any;
  datay : any;
  range : any;
  private _unsubscribeAll: Subject<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userInfo: any = {};
  constructor(private _dialog: MatDialog,
              private actvRoute : ActivatedRoute,
              private http: HttpClient,
              private _globals: GlobalsService,
              private _auth: AuthService,
              private router: Router,
              private exampleDatabase : OwnLeaderboardService) {
                this.userInfo = this._auth.userInfo;
 
                
               }

  ngOnInit() {
    this.range = localStorage.getItem('range')

    
    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")

    if(this.range == '10'){
      this.filter_range = 'weekly';
    }else if(this.range == '20'){
      this.filter_range = 'monthly';
    }else{
      this.filter_range = 'all-time';
    }

    this.datax = {
      username : getUrl[2],
      range : this.filter_range
    }
    this.datay = {
      username : getUrl[2],
    }
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.exampleDatabase.checkFollowerStatus(this.datay).subscribe(res2 =>{
      if(res2['code'] == 201){
        this.follower_status = true;
      }else{
        this.follower_status = false;
      }
    })
    this.exampleDatabase.getOwnLeaderboardData(this.datax).subscribe(res =>{
     this.dataSource = this._globals.parseJwt(res.data);
     this.leaderboard_userid = this.dataSource['leaderboard_userid'];
     this.leaderboard_name = this.dataSource['leaderboard_name'];
     this.leaderboard_earnings = this.dataSource['leaderboard_earnings'];
     this.total_earnings = this.dataSource['total_earnings'];
     this.leaderboard_username = this.dataSource['leaderboard_username'];
     localStorage.clear();
    })
   
  }
  ref(username){
    this.datax = {
      username : username,
      range : 'all-time'
    }
    this.ngOnInit()

    return this.datax;
  }

  openGiftDialog(userid, name): void {
    const dialogRef = this._dialog.open(GiftCoinComponent, {
      data: {userid: userid, name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  follow(userid,name){
    let data = {
      followed_id : userid,
      status : 1,
      is_profile: 1
    }
    this.exampleDatabase.setFollowUser(data).subscribe(res => {
      if(res['code'] == 201){
        swal({
          title: "Success",
          text: "Successfully followed "+name+"!",
          icon: "success",
          dangerMode: true,
        });
        this.ngOnInit();
      }else{
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }
     
    })
  }

  unfollow(userid,name){
    let data = {
      followed_id : userid,
      status : 0,
      is_profile: 1
    }
    this.exampleDatabase.setFollowUser(data).subscribe(res => {
      if(res['code'] == 201){
        swal({
          title: "Success",
          text: "Successfully unfollowed "+name+"!",
          icon: "success",
          dangerMode: true,
        });
        this.ngOnInit();
      }else{
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }
     
    })
  }

}

