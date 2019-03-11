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
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getBankDatas(sort: string, order: string, page: number): Observable<any> {

    if ( page ==0) {
      this.pageIndex = page;
      this.counterPage = 0;
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPage += 10;
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPage = page*10;
      }
    }
    let data = { offset: this.counterPage, limit: 10, filter: null, user_id: this.userInfo.user_id };
    // let data = {  user_id: this.userInfo.user_id };
 
    return this._globals.postMethod(`/bank/history/referral/task-points/direct`, data);
  }

}
