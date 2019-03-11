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
export class SuperCoinHttpRequest {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  set_range : string;
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getBankDatas(sort: string, order: string, page: number , range : any , date : any): Observable<any> {

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
    if(range == 10){
      this.set_range = 'weekly';
    }else if(range == 20){
      this.set_range = 'monthly';
    }else if( range == 100){
      this.set_range = 'all-time';
    }
    
    // let data = {  range: this.set_range };
    let data = { offset: this.counterPage, limit: 10, user_id: this.userInfo.user_id, range: this.set_range, filter_date : null};
    return this._globals.postMethod(`/leaderboard/general`, data);
  }
  setFollowUser(data:any){
    return this._globals.postMethod('/profile/toggle-follow-user',data);
  }

}


