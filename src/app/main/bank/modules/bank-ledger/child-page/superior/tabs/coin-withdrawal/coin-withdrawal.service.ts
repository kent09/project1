import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinWithdrawalService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {

  }

  postSupWitdrawal(data : any) { 
    return this._globals.postMethod(`/bank/withdraw`, data);
  }
  postSupInfo(data : any) { 
    return this._globals.postMethod(`/bank/balances`, data);
  }
}
