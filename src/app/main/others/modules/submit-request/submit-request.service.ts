import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from './../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmitRequestService {

  userInfo = {}
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  postRequest(data){
    return this._globals.postMethod('/announcement/submit-request',data);
  }
}