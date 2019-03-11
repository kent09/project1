import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementDetailsService {
  userInfo = {}
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private actvRoute :ActivatedRoute) {
    this.userInfo = this._auth.userInfo;
  }
  requestAnnouncement(){
    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    
    let data = {
      limit : 1,
      announcementId : getUrl[3]
    }
    return this._globals.postMethod('/announcement/',data);
  }

}
