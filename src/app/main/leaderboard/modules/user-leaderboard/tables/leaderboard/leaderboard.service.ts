import { Observable } from 'rxjs';
import { AuthService } from './../../../../../login/auth/auth.service';
import { GlobalsService } from './../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface BANK_API {
  user: string;
  title: string;
  created_at: string;
  reward: string;
}
@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {

  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  filter_range : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getOwnLeaderboardData(username:any,sort: string, order: string, page: number , range : string,date : any): Observable<any> {

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
    if(range == '10'){
      this.filter_range = 'weekly';
    }else if(range == '20'){
      this.filter_range = 'monthly';
    }else if(range == '100'){
      this.filter_range = 'all-time';
    }
    let data = {  username: username, range : this.filter_range , filter_date : date  };
 
    return this._globals.postMethod(`/leaderboard/own`, data);
  }

  setFollowUser(data:any){
    return this._globals.postMethod('/profile/toggle-follow-user',data);
  }
}
