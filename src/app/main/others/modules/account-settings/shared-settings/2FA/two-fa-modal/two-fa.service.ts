import { AuthService } from './../../../../../../login/auth/auth.service';
import { GlobalsService } from './../../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwoFaService {

  userInfo: any = {};
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
      this.userInfo = this._auth.userInfo;
     }

    enable2FA(){

      let data = { user_id: this.userInfo.user_id };
      return this._globals.publicPostMethod(`/social/2fa/enable`,data);
    }
    register2FA(data:any){
      return this._globals.publicPostMethod(`/social/2fa/register`,data)
    }
    disable2FA(data:any){
      return this._globals.publicPostMethod(`/social/2fa/disable`,data)
    }
}
