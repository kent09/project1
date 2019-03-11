import { AuthService } from './../../../login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  userInfo = {}
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  requestAnnouncement(data : any){
    return this._globals.postMethod('/announcement/',data);
  }

}
