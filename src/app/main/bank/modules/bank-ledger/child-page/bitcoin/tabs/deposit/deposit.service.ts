import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getBankDeposit(sort: string, order: string, page: number, search_key : any, date : any): Observable<any> {

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
    let data = { offset: this.counterPage, limit: 10, filter: null, user_id: this.userInfo.user_id, search_key : search_key, filter_date : date };
    // let data = {  user_id: this.userInfo.user_id };
    return this._globals.postMethod(`/bank/basic-ledger/btc/deposit`, data);
  }

}
