import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { Observable } from 'rxjs';


export interface BLOCKED_API {
  blocked_id : string,
  name : string;
  blocked_date: string;
}


@Injectable({
  providedIn: 'root'
})
export class BlockedUsersService {

  userInfo: any = {};
  counterPage: number = 0;
  pageIndex: number = 0;
  
  constructor(
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  getBlockedUsers(sort: string, order: string, page: number): Observable<any> {

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
    let data = { offset: this.counterPage, limit: 10, user_id: this.userInfo.user_id};
    // let data = {  user_id: this.userInfo.user_id };
    return this._globals.postMethod(`/task/task-blocked-users`, data);
  }

  unblockUser(task_user_id){
    return this._globals.postMethod(`/profile/unblock-user`,{user_id:this.userInfo.user_id, task_user_id:task_user_id})
  }

}


