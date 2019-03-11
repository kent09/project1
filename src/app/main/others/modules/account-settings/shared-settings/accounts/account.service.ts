import { AuthService } from './../../../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userInfo: any = {};
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
      this.userInfo = this._auth.userInfo;
     }

     accountDetails(){
       let data = {
        username : this.userInfo.username
       }
      return this._globals.postMethod(`/profile/info`, data);
  }
    saveDetails(data: any){
      return this._globals.postMethod(`/profile/update-account`, data);
    }
    saveProfilePic(data : any){
      return this._globals.postMethod(`/profile/update-profile-image`, data);

    }
}
