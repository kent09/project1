import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from './../../../../../login/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TWOFAService {
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
}
