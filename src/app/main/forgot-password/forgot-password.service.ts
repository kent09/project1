import { AuthService } from './../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  userInfo: any = {};
  email : any;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  
  requestForgotPassword(data : any){
    return this._globals.publicPostMethod2('/parked/auth/forgot-password',data);
  }


}
