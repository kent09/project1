import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';

export interface BANK_API {
  user: string;
  title: string;
  created_at: string;
  reward: string;
}


@Injectable({
  providedIn: 'root'
})

/** An example database that the data source uses to retrieve data for the table. */
export class OwnLeaderboardService {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  filter_range : any;
  datax : any;
  datay : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private actvRoute : ActivatedRoute) {
    this.userInfo = this._auth.userInfo;

    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    
    this.datax = {
      username : getUrl[2],
      range : 'all-time'
    }
    this.datay = {
      username : getUrl[2]
    }
  }

  getOwnLeaderboardData(x: any) {
 
    return this._globals.postMethod(`/leaderboard/own`, x);
  }

  setFollowUser(data:any){
    return this._globals.postMethod('/profile/toggle-follow-user',data);
  }

  checkFollowerStatus(data : any){
    return this._globals.postMethod('/profile/check-is-follower',data);

  }

}


