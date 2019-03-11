import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { map } from 'rxjs/operators';

export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
export class BankBalancesService {

  constructor(private _globals: GlobalsService) {  }

  requestPostBankBalances(data : any ) {
    return this._globals.postMethod('/bank/balances', data)
  }

  requestResyncWallet(data : any){
    return this._globals.postMethod('/bank/resync',data)
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
}

