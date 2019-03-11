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

  

@Injectable()
export class MyTaskService
{
    userInfo: any = {};
    counterPage: number = 0;
    pageIndex: number = 0;
    
    constructor(private http: HttpClient,
      private _globals: GlobalsService,
      private _auth: AuthService) {
      this.userInfo = this._auth.userInfo;
    }
  
    getBankDatas(sort: string, order: string, page: number, category: string, search_key: any): Observable<any> {
        
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
      let data = { offset: this.counterPage, limit: 10, filter: category, user_id: this.userInfo.user_id, search_key: search_key };
      // let data = {  user_id: this.userInfo.user_id };
   
      return this._globals.postMethod(`/task/task-own-list`, data);
    }

    archiveTask(task_id : string){
      return this._globals.postMethod(`/task/task-delete`, {task_id : task_id})
    }

    getTotalCount(data : any) {
      return this._globals.postMethod('/task/task-own-count',data);
    }

    updateTaskCategory(data : any) {
      return this._globals.postMethod('/task/task-update-category',data);
    }

}
