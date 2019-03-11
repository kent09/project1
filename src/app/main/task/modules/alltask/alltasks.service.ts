import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientRequest } from 'app/globals/HttpClientGetRequest/getRequest.service';

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
export class SuperCoinHttpRequest {
  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private getRequest : HttpClientRequest) {
    this.userInfo = this._auth.userInfo;
  }

  getBankDatas(sort: string, order: string, page: number, category: string, searchValue: string): Observable<any> {

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
    let data = { offset: this.counterPage, limit: 10, filter: category, user_id: this.userInfo.user_id, search_key: searchValue};
    // let data = {  user_id: this.userInfo.user_id };
    
    return this.getRequest.getRequest(`/task/task-list?offset=${this.counterPage}&limit=${10}&filter=${category}&search_key=${searchValue}`);
  }

  getTotalCount(){
    return new Promise((resolve, reject) => {
      this.getRequest.getRequest('/task/task-active-count')
          .subscribe((response : any) => {
              resolve(response)
          }, reject)
  })
}

  hideTask(task_id){
    return new Promise((resolve, reject) => {
        this._globals.postMethod('/task/task-hide',{task_id : task_id})
            .subscribe((response : any) => {
                resolve(response)
            }, reject)
    })
}

}


