import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private _globals: GlobalsService) {
  }

  getAllComments(params) {
    return this._globals.postMethod('/task/task-comments', params).pipe(
      map(response => <Response>response)
    );
  }

  getCountComments(params) {
    return this._globals.postMethod('/task/task-comment-count', params).pipe(
      map(response => <Response>response)
    );
  }

  addComments(params) {
    return this._globals.postMethod('/task/task-comment-save', params).pipe(
      map(response => <Response>response)
    );
  }
  
  replyComments(params){
    return this._globals.postMethod('/task/task-comment-reply-save', params).pipe(
      map(response => <Response>response)
    );
  }
  
  getInnerComments(params){
    return this._globals.postMethod('/task/task-comment-specific', params).pipe(
      map(response => <Response>response)
    );
  }

  deleteComment(params){
    return this._globals.postMethod('/task/task-comment-delete', params).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
  
}