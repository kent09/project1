import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface BANK_API {
  id: number,
  user: string;
  title: string;
  created_at: string;
  reward: string;
}


@Injectable({
  providedIn: 'root'
})

/** An example database that the data source uses to retrieve data for the table. */
export class SuperCoinHttpRequest {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getBankDatas(sort: string, order: string, page: number, category: string, searchKey:string): Observable<any> {

    if ( page ==0) {
      this.pageIndex = page;
      this.counterPage = 0
    } else {
      if (page > this.pageIndex && page !== 0) {
        this.counterPage += 10
        this.pageIndex = page;
      } else {
        this.pageIndex = page;
        this.counterPage = page*10;
      }
    }
    let data = { offset: this.counterPage, limit: 10, filter: category, user_id: this.userInfo.user_id, search_key: searchKey};
    // let data = {  user_id: this.userInfo.user_id };
 
    return this._globals.postMethod(`/task/task-hidden`, data);
  }

}


export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}

@Injectable({
  providedIn: 'root'
})

export class UnhideTask {

  constructor(private _globals: GlobalsService) {  }

  getTotalCount(data : any) {
    return this._globals.postMethod('/task/task-hidden-count',data).pipe(
      map(response => <Response>response)
    );
  }

  requestUnhideTask(data : any ) {
    return this._globals.postMethod('/task/task-unhide', data).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
}


