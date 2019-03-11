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
    return this._globals.postMethod('/bank/balances', data).pipe(
      map(response => <Response>response)
    );
  }

  requestPostBankNotifications(data : any ) {
    return this._globals.postMethod('/notification/user', data).pipe(
      map(response => <Response>response)
    );
  }
  
  requestPostCountNotifications(data : any ){
    return this._globals.postMethod('/notification/count-all', data).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }

  checkVoucherCode(code : string){
    return this._globals.postMethod('/membership/check-code', {code : code}).pipe()
  }
  useVoucherCode(code : string){
    return this._globals.postMethod('/membership/use-code', {code : code}).pipe()
  }

}