import { AuthService } from './../../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiftCoinService {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  set_range : string;
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  postGiftSup(data : any){
    // let data = { offset: this.counterPage, limit: 10, user_id: this.userInfo.user_id, range: this.set_range, filter_date : date };
    return this._globals.postMethod(`/profile/gift-superior-coin`, data);
  }
}
