import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}

@Injectable({
  providedIn: 'root'
})

export class DeactivateTask {

  userInfo: any = {};
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }

  requestDeORActivateTask(data: any) {
    return new Promise((resolve, reject) => {
      this._globals.postMethod(`/task/task-${data.type}`, data.params)
        .pipe(
          map(response => <Response>response)
        )
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  updateTaskCategory(data : any) {
    return this._globals.postMethod('/task/task-update-category',data);
  }

  decodeJwt(data) {
    return this._globals.parseJwt(data);
  }
}


