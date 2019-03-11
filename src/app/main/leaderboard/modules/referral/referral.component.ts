import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, ReferralService } from './referral.service';
import { Router } from "@angular/router";
import { GiftCoinComponent } from '../shared-modal/gift-coin/gift-coin.component';
import swal2 from 'sweetalert2';
import { ImportsService } from 'app/globals/imports/imports.service';





@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReferralComponent implements OnInit {

  level: filterLevel[] = [
    { value: 'wt10', viewValue: 'Weekly Top 10' },
    { value: 'mt10', viewValue: 'Monthly 20' },
    { value: 'at10', viewValue: 'All Time 100' }
  ];
  defualtValues = 'wt10';
  myDate = new Date();

  newlevel: filterLevel[] = [
    { value: '1', viewValue: 'Direct Referral' },
    { value: '2', viewValue: '2nd Level' },
    { value: '3', viewValue: '3rd Level' }
  ];
  defualtValues2 = '1';

  displayedColumns = ['avatar', 'name', 'status', 'registered', 'referral_count', 'task_points', 'rewards', 'button'];
  exampleDatabase: ReferralService | null;
  data: BANK_API[] = [];
  headerData: any = {};
  newHeaderData: any = {};
  date: any = {};
  PROFILEIMAGE: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource: any;
  filter_range = 'wt10';
  filter_date = null;
  filter_level = '1';
  private _unsubscribeAll: Subject<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  savingRef : boolean = false;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _import: ImportsService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _ref : ReferralService,
    private router: Router) { }


  ngOnInit() {
    if (this.filter_level != '1') {
      this.displayedColumns = ['referrer', 'avatar', 'name', 'status', 'registered', 'referral_count', 'task_points', 'rewards', 'button'];
    } else {
      this.displayedColumns = ['avatar', 'name', 'status', 'registered', 'referral_count', 'task_points', 'rewards', 'button'];

    }
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.exampleDatabase = new ReferralService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getReferraldData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filter_range, this.filter_level, this.filter_date);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.newHeaderData = this._auth.userInfo
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          const itHasCountedValues = typeof decodedData.count === 'undefined' ? 0 : decodedData.count;
          this.resultsLength = itHasCountedValues;
          const totalEarnings = !decodedData.leaderboard_earnings ? 0 : parseInt(decodedData.leaderboard_earnings, 10);
          this.headerData = decodedData;


          const updatedDate = decodedData.Time === 'yyyy-MM-ddTHH:mm' ? 0 : decodedData.Time;
          this.date = updatedDate;
          return ('task' in decodedData) ? decodedData.task : decodedData.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.dataSource = data });
  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
  }

  filterRange(data: any) {
    if (data == null) {
      this.filter_range = 'wt10'
    }
    this.filter_range = data;
    this.ngOnInit();
    return this.filter_range;
  }
  filterLevel(data: any) {
    if (data == null) {
      this.filter_level = '1'
    }

    this.filter_level = data;
    this.ngOnInit();
    return this.filter_level;
  }
  events: string[] = [];
  addEvent(event) {
    if (event) {
      let exo = `${event['_i']['year']}-${event['_i']['month'] + 1}-${event['_i']['date']}`;
      this.filter_date = exo;
    } else {
      this.filter_date = null;
    }
    this.ngOnInit()
    return this.filter_date;

  }

  giftCOinDialog(userid, name): void {
    const dialogRef = this._dialog.open(GiftCoinComponent, {
      data: { user: userid, name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  follow(userid, name) {
    let data = {
      followed_id: userid,
      status: 1,
      is_profile: 1
    }
    this.exampleDatabase.setFollowUser(data).subscribe(res => {
      if (res['code'] == 201) {
        swal({
          title: "Success",
          text: "Successfully followed " + name + "!",
          icon: "success",
          dangerMode: true,
        });
        this.ngOnInit();
      } else {
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }

    })
  }

  unfollow(userid, name) {
    let data = {
      followed_id: userid,
      status: 0,
      is_profile: 1
    }
    this.exampleDatabase.setFollowUser(data).subscribe(res => {
      if (res['code'] == 201) {
        swal({
          title: "Success",
          text: "Successfully unfollowed " + name + "!",
          icon: "success",
          dangerMode: true,
        });
        this.ngOnInit();
      } else {
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }

    })
  }
  setRefferer() {
    swal2({
      title: 'Enter referral code.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        
        return fetch(`${this._import.ENV.HOST}/auth/check-referral-code`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: code }),

        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            swal2.showValidationError(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !swal2.isLoading()
    }).then((result) => {
      if (result.value && result.value.code == 200) {
        let data = this._globals.parseJwt(result.value.data)
        swal2({
          title: `${data.name}`,
          text : 'Set as referrer?',
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
           this.setReferrer(data)
          }
        })
      }
      else{
        swal2({
          type : 'error',
          title : 'Referral code not found!'
        })
      }
    })
  }

  setReferrer(data){
    let user = this._auth.userInfo;
    this.savingRef = true;
    this._ref.setReferrer({referrer_id : data.referrer_id, id : user.user_id}).subscribe((res:any) => {
      this.savingRef = false;
      if(res.code == 200){
        this.headerData.referrer_name = data.username;
      }
    })
  }
}



export interface filterLevel {
  value: string;
  viewValue: string;
}
