import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';

export interface PAYOUTHISTORY_API {
  id: number;
  paid: number;
  payout_type: string;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getPayoutHistory(sort: string, order: string, page: number): Observable<any> {

    if ( page ==0) {
      this.pageIndex = page;
      this.counterPage = 0;
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPage += 10
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPage = page*10;
      }
    }
    // let data = { offset: this.counterPage, limit: 10, filter: null, user_id: this.userInfo.user_id };
    let data = { page: this.counterPage, limit: 10 };
 
    return this._globals.postMethod(`/bank/membership/withdrawal-history`, data);
  }

}
