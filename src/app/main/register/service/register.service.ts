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
export class RegisterService {

  constructor(private _globals: GlobalsService) {  }

  requestPostSignUp(data : any ) {
    return this._globals.publicPostMethod2('/parked/auth/register', data).pipe(
      map(response => <Response>response)
    );
  }

  requestCheckReferralCode(data : any ) {
    return this._globals.publicPostMethod('/auth/check-referral-code', data).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
}

