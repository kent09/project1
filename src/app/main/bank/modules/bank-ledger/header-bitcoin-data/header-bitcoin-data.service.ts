import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderBitcoinDataService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {

  }

  postBtcInfo(data : any) { 
    return this._globals.postMethod(`/bank/btc-info`, data);
  }
  postGenerateBtcWallet(data : any){
    return this._globals.postMethod('/bank/btc-create-wallet', data);
  }
  postResyncWallet(data: any){
    return this._globals.postMethod('/bank/btc-resync',data);
  }
}
