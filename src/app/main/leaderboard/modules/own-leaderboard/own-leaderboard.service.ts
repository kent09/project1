import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';

export interface BANK_API {
  user: string;
  title: string;
  created_at: string;
  reward: string;
}


@Injectable({
  providedIn: 'root'
})

/** An example database that the data source uses to retrieve data for the table. */
export class OwnLeaderboardService {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  filter_range : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getOwnLeaderboardData(sort: string, order: string, page: number , range : string,date : any): Observable<any> {

    if ( page ==0) {
      this.pageIndex = page;
      this.counterPage = 0
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPage += 10
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPage = page*10;
      }
    }
    if(range == 'wt10'){
      this.filter_range = 'weekly';
    }else if(range == 'mt10'){
      this.filter_range = 'monthly';
    }else if(range == 'at10'){
      this.filter_range = 'all-time';
    }
    let data = {  user_id: this.userInfo.user_id, range : this.filter_range , filter_date : date  };
 
    return this._globals.postMethod(`/leaderboard/own`, data);
  }

  setFollowUser(data:any){
    return this._globals.postMethod('/profile/toggle-follow-user',data);
  }

}


