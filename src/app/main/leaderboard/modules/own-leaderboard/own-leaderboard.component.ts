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
import { BANK_API, OwnLeaderboardService } from './own-leaderboard.service';
import { Router } from "@angular/router";
import { GiftCoinComponent } from '../shared-modal/gift-coin/gift-coin.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-own-leaderboard',
  templateUrl: './own-leaderboard.component.html',
  styleUrls: ['./own-leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class OwnLeaderboardComponent implements OnInit {
  myDate = new Date();
  level: filterLevel[] = [
    {value: 'at10', viewValue: 'All Time'},
    {value: 'mt10', viewValue: 'Monthly 20'},
    {value: 'wt10', viewValue: 'Weekly Top 10'},
  ];
  defualtValues = 'at10';


  // newlevel: filterLevel[] = [
  //   { value: 'dr', viewValue: 'Direct Referral' },
  //   { value: '2ndl', viewValue: '2nd Level' },
  //   { value: '3rdl', viewValue: '3rd Level' }
  // ];
  // defualtValues2 = 'dr';



  displayedColumns = ['rank', 'avatar', 'name', 'country', 'registered', 'direct_signup', 'rewards', 'task_points', 'earned', 'button'];
  exampleDatabase: OwnLeaderboardService | null;
  data: BANK_API[] = [];
  headerData: any = {};
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  PROFILEIMAGE : any;
  dataSource : any;
  filter_range = 'at10';
  filter_date = null;
  userInfo = {};
  dataCount : number;

  private _unsubscribeAll: Subject<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private router: Router,
    private _dialog: MatDialog) {
      this.userInfo = this._auth.userInfo;
     }


    ngOnInit() {
      this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
      this.exampleDatabase = new OwnLeaderboardService(this.http, this._globals, this._auth);
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getOwnLeaderboardData(
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
        ).subscribe((data) => { this.dataSource = new MatTableDataSource(data), this.dataCount = data.length, this.dataSource.paginator = this.paginator  });
    }

    trimProfile(data: any) {
      const splited = data.split('/');
      return splited && splited[2] || '';
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
        this.filter_range = 'at10'
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
  
  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
}

}
export interface filterLevel {
  value: string;
  viewValue: string;
}
