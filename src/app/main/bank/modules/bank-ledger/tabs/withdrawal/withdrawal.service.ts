import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {

  }

  postBtcWitdrawal(data : any) { 
    return this._globals.postMethod(`/bank/btc-withdraw`, data);
  }
  postBtcInfo(data : any) { 
    return this._globals.postMethod(`/bank/btc-info`, data);
  }
}
