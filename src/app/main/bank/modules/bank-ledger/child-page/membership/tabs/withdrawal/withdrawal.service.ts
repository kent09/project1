import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembershipWithdrawalService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { }

    requestWithdraw(data){
      return new Promise((resolve, reject) => {
        this._globals.postMethod('/bank/membership/request-withdraw',data)
            .subscribe((response : any) => {
                resolve(response)
            }, reject)
      })
  }
}
