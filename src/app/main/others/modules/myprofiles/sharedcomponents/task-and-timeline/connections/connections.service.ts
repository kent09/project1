import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';



export interface ACTIVETASK {
  user: string;
  title: string;
  created_at: string;
  reward: string;
}

export class FFCHttpRequest {
  userInfo: any = {};
  counterPages: number = 0;
  pageIndex: number = 0;
  

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }


  getAllFollowers(sort: string, order: string, page: number, urlType: string, searchKey: string): Observable<any> {
 
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
    let data = { offset: this.counterPages, limit: 10, filter: null, user_id: parseInt(activeTaskUserId, 10), search_key : searchKey};
    
    return this._globals.postMethod(`/profile/all-${urlType}`, data);
   
  }

  
}