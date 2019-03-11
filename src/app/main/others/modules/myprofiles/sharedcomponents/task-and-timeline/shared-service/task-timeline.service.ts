import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';


export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}



@Injectable({
  providedIn: 'root'
})
export class GetTimelineDataService {
  username: string;
  urlParams: string;
  loggedin_user: string;
  routerEvents: any;
  constructor(private _globals: GlobalsService, private actvRoute: ActivatedRoute, private _auth: AuthService, private router: Router) {
    
    this.urlParams = this.actvRoute['_routerState']['snapshot']['url'];
    this.loggedin_user = this._auth.userInfo.username
    if (this.urlParams) {
      this.username = this.urlParams.split("/")[2];
    }
    
    
  }

  requestFollowerData(username_params = '') {
    const usernname = username_params ? username_params : this.username;
    return this._globals.postMethod('/profile/all-followers', { username: usernname }).pipe(
      map(response => <Response>response)
    );
  }

  requestFollowingData(username_params = '') {
    const usernname = username_params ? username_params : this.username;
    return this._globals.postMethod('/profile/all-following', { username: usernname }).pipe(
      map(response => <Response>response)
    );
  }


  requestConnectionData(username_params = '') {
    const usernname = username_params ? username_params : this.username;
    return this._globals.postMethod('/profile/all-connections', { username: usernname }).pipe(
      map(response => <Response>response)
    );
  }

  requestTimeLineData(username_params = ''): Observable<any> {
    
    const usernname = username_params ? username_params : this.username;
    return this._globals.postMethod('/profile/timeline', { username: usernname }).pipe(
      map(response => <Response>response)
    );

  }

  requestProfileData(username_params = ''): Observable<any> {

    const usernname = username_params ? username_params : this.username;
    return this._globals.postMethod('/profile/info', { username: usernname }).pipe(
      map(response => <Response>response)
    );

  }

  requestSocialConnectResponse(userId){

    return this._globals.postMethod('/profile/social-connect', { user_id: userId }).pipe(
      map(response => <Response>response)
    );
    
  }

  countFollowers(usernames){

    return this._globals.postMethod('/profile/count-followers', { username: usernames }).pipe(
      map(response => <Response>response)
    );
    
  }

  countFollowings(usernames){

    return this._globals.postMethod('/profile/count-following', { username: usernames }).pipe(
      map(response => <Response>response)
    );
    
  }

  countConnections(usernames){

    return this._globals.postMethod('/profile/count-connections', { username: usernames }).pipe(
      map(response => <Response>response)
    );
    
  }

  countActivityScore(usernames){

    return this._globals.postMethod('/profile/activity-score', { username: usernames }).pipe(
      map(response => <Response>response)
    );
    
  }

  countReputationScore(usernames){

    return this._globals.postMethod('/profile/reputation-score', { username: usernames }).pipe(
      map(response => <Response>response)
    );
    
  }

  followUnfollow(data: any){
    return new Promise((resolve, reject) => {
        this._globals.postMethod('/profile/toggle-follow-user', data)
            .subscribe((response : any) => {
                resolve(response)
            }, reject)
    })
}


  decodeJwt(data) {
    return this._globals.parseJwt(data);
  }

  /* profile manage object data */
  profileDataExtra(profile) {
    return {
      ref_link: `${this._globals.ENV.liveHost}membership/pricing/?ref=${profile.ref_code}`,
    //   https://kryptonia.io/membership/pricing/?ref=XDP69PN3Y7
      profile_image: `${this._globals.ENV.PROFILE_IMAGE}/${profile.user_id}/avatar.png`,
    }
  }

  get userInfo() {
    return this.loggedin_user;
  }

  urlParamListen(): Observable<any> {
    return this.actvRoute['_routerState']['snapshot'];
  }
}



// sharedTask Service 



export interface ACTIVETASK {
  user_id: number,
  is_followed: boolean,
  user: string;
  title: string;
  created_at: string;
  reward: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ActiveTaskHttpRequest {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }


  getActiveTask(sort: string, order: string, page: number): Observable<any> {
 
    if ( page ==0) {
      this.pageIndex = page;
      this.counterPage = 0;
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPage += 10
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPage = page*10;
      }
    }
    const activeTaskUserId = localStorage.getItem('activeTaskUserId');
    const username = localStorage.getItem('visit_username');
    
    let data = { offset: this.counterPage, limit: 10, filter: null, user_id: parseInt(activeTaskUserId, 10), username : username };
   
    return this._globals.postMethod(`/profile/active-task`, data);
   
  }

  
}


export class FFCHttpRequest {
  userInfo: any = {};
  counterPages: number = 0;
  pageIndex: number = 0;
  getUrl : any;
  

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private actvRoute : ActivatedRoute) {
    this.userInfo = this._auth.userInfo;
   
  }


  getAllFollowers(sort: string, order: string, page: number, urlType: string, searchKey: string): Observable<any> {

    this.getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    if ( page ==0 ) {
      this.pageIndex = page;
      this.counterPages = 0
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPages += 10
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPages = page*10;
      }
    }

    const activeTaskUserId = localStorage.getItem('activeTaskUserId');
    let data = { offset: this.counterPages, limit: 10, filter: null, username:this.getUrl[3], search_key : searchKey};
    
    return this._globals.postMethod(`/profile/all-${urlType}`, data);
   
  }

  
}