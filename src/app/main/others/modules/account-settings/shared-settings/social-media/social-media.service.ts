import { AuthService } from './../../../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  filter_range : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getSocialData(data : any){
    return this._globals.postMethod(`/profile/social-connect-status`, data);
  }
  requestLinkOrUnlink(data : any){
    return this._globals.postMethod('/profile/toggle-social-link',data);
  }

  getInstagramData(url){
    return this.http.get(url).pipe()
  }
  
}
