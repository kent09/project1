import { UserLeaderboardComponent } from './../../user-leaderboard.component';
import { GiftCoinComponent } from './../../../shared-modal/gift-coin/gift-coin.component';
import { map, catchError } from 'rxjs/operators';
import { startWith, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AuthService } from './../../../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort } from '@angular/material';
import { Subject, of as observableOf  } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BANK_API,ReferralService } from './referral.service';


@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  displayedColumns: string[] = ['avatar', 'name', 'country', 'status', 'date', 'count', 'direct', 'point', 'button'];

  myDate = new Date();

  level: filterLevel[] = [
    {value: 'wt10', viewValue: 'Weekly Top 10'},
    {value: 'mt10', viewValue: 'Monthly 20'},
    {value: 'at10', viewValue: 'All Time 100'}
  ];
  defualtValues = 'wt10';
  exampleDatabase: ReferralService | null;
  data: BANK_API[] = [];
  headerData: any = {};
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  PROFILEIMAGE : any;
  dataSource : any;
  filter_range = 'wt10';
  filter_date = null;
  datax : any;
  private _unsubscribeAll: Subject<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  
  constructor(
    private actvRoute : ActivatedRoute,
    private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private router: Router,
    private _dialog: MatDialog,
    private ulead : UserLeaderboardComponent
  ) {
    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    this.datax = {
      username : getUrl[2],
    }
   }

  ngOnInit() {

    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.exampleDatabase = new ReferralService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getOwnLeaderboardData(this.datax.username,
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.filter_range , this.filter_date);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);      
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          const itHasCountedValues = typeof decodedData.list.length === 'undefined' ? 0 : decodedData.list.length;
          this.resultsLength = itHasCountedValues;

          const totalEarnings = !decodedData.leaderboard_earnings ? 0 : parseInt(decodedData.leaderboard_earnings, 10);
          this.headerData = decodedData;
          return ('task' in decodedData) ? decodedData.task : decodedData.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.dataSource = new MatTableDataSource(data), this.dataSource.paginator = this.paginator  });
  }

  trimProfile(data: any) {
    const splited = data.split('/');
    return splited && splited[2] || '';
  }
  ref(username){
    this.datax = {
      username : username,
    }
    this.ngOnInit()
    this.ulead.ref(username);

    return this.datax;
  }
  events: string[] = [];
  addEvent(event) {
    if(event){
      let exo = `${event['_i']['year']}-${event['_i']['month']+1}-${event['_i']['date']}`;
      this.filter_date = exo;
    }else{
      this.filter_date = null;
    }

    this.ngOnInit()
    return this.filter_date;

  }

  filter(data : any){
    if(data == null){
      this.filter_range = 'wt10'
    }
    this.filter_range = data;
    this.ngOnInit();
    return this.filter_range;
  }

 giftCoinDialog(userid, name): void {
  const dialogRef = this._dialog.open(GiftCoinComponent, {
    data: {user: userid, name: name}
  });

  dialogRef.afterClosed().subscribe(result => {
  });

}

follow(userid){
  let data = {
    followed_id : userid,
    status : 1,
    is_profile: 1
  }
  this.exampleDatabase.setFollowUser(data).subscribe(res => {
    if(res['code'] == 201){
      swal({
        title: "Success",
        text: res.message,
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

unfollow(userid){
  let data = {
    followed_id : userid,
    status : 0,
    is_profile: 1
  }
  this.exampleDatabase.setFollowUser(data).subscribe(res => {
    if(res['code'] == 201){
      swal({
        title: "Success",
        text: res.message,
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

avatarImagePath(id: any): any {
  return this._globals.avatarImagePath(id);
}

}

export interface filterLevel {
  value: string;
  viewValue: string;
}
