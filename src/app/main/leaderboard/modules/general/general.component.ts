import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest } from 'app/main/leaderboard/modules/general/general.service';
import { Router } from "@angular/router";
import { HowItWorkComponent } from '../shared-modal/how-it-work/how-it-work.component';
import { GiftCoinComponent } from '../shared-modal/gift-coin/gift-coin.component';
import { decode } from 'punycode';



@Component({
  selector: 'app-leaderboard-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LeaderBoardGeneralComponent implements OnInit {

  level: filterLevel[] = [
    {value: '100', viewValue: 'All Time 100'},
    {value: '20', viewValue: 'Monthly 20'},
    {value: '10', viewValue: 'Weekly Top 10'}

  ];
  defualtValues = '100';

  myDate: any;
  displayedColumns = ['rank', 'avatar', 'name', 'country', 'direct_signup', 'rewards', 'task_points', 'earned', 'button'];

  exampleDatabase: SuperCoinHttpRequest | null;
  data: BANK_API[] = [];
  headerData = 0;
  date: any = {};
  PROFILEIMAGE : any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource : any;
  range = '100';
  leaderboard_date : any;
  filter_date = null;
  private _unsubscribeAll: Subject<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _dialog: MatDialog,
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
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.range,this.filter_date);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.leaderboard_date = decodedData.leaderboard_updated_at;
          const itHasCountedValues =  decodedData.count ? decodedData.count : decodedData.list.length;
          this.resultsLength = itHasCountedValues;
          const totalEarnings = !decodedData.leaderboard_earnings ? 0 : parseInt(decodedData.leaderboard_earnings, 10);
          this.headerData = totalEarnings;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return ('task' in decodedData) ? decodedData.task : decodedData.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.dataSource = data });
       

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
      this.range = '100'
    }
    this.range = data;
    this.defualtValues = this.range
    this.ngOnInit();
    return this.range;
  }

  trimProfile(data: any) {
    const splited = data.split('/');
    return splited && splited[2] || '';
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(HowItWorkComponent);

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
