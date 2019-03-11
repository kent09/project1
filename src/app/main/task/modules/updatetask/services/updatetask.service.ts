import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalsService } from 'app/globals/globals.service';
import { map } from 'rxjs/operators';


export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}

@Injectable()
export class UpdateTaskService implements Resolve<any>
{
  taskDetails: any;
  slugParams: string;

  taskDetailsOnChanged: BehaviorSubject<any>;


  constructor(
    private _httpClient: HttpClient,
    private _globals: GlobalsService,
  ) {
    // Set the defaults
    this.taskDetailsOnChanged = new BehaviorSubject({});
  }


  
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      this.slugParams = route.params['slug'];
    
      return new Promise((resolve, reject) => {
        
          Promise.all([
              this.getTaskDetails(route.params['slug']),
          ]).then(
              () => {
                resolve()
              },
              reject
          );
      });
  }

  

  getTaskDetails(slug: any) {
    return new Promise((resolve, reject) => {
      this._globals.postMethod('/task/task-show', { slug: slug })
        .subscribe((taskDetails: any) => {
          const taskData = this._globals.parseJwt(taskDetails.data);
          this.taskDetails = { ...taskData.data, profileImage: null };
          this.taskDetails.profileImage  = `${this._globals.ENV.PROFILE_IMAGE}/${this.taskDetails.task.user_id}/avatar.jpg`;
          this.taskDetailsOnChanged.next(this.taskDetails);
          resolve(this.taskDetails);
        }, reject);
    });
  }

  requestPostUpdateTask(data: any) {
    return this._globals.postMethod('/task/task-update', data).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data) {
    return this._globals.parseJwt(data);
  }
}

