import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';


export interface PURCHASE_API {
  purchased_date: string;
  membership_type: string;
  charged_by: string;
  status: string;
  paid: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  getPurchase(sort: string, order: string, page: number): Observable<any> {

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
    let data = {  page: this.counterPage, limit: 10 };
 
    return this._globals.postMethod(`/bank/membership/billing-history`, data);
  }

}
