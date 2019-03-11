import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../../globals/globals.service';
import { AuthService } from '../login/auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  userInfo: any = {};
  email : any;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) {
    this.userInfo = this._auth.userInfo;
  }
  
  requestCountNewlyRegistered(data : any){
    return this._globals.publicPostMethod('/landing/user/newly-registered-counter',data);
  }
  requestBusiness(data : any){
    return this._globals.publicPostMethod('/landing/business',data)
  }
  requestTopBloggers(data : any){
    return this._globals.publicPostMethod('/landing/blog/get-featured-bloggers',data)
  }
  requestTestimonials(data : any){
    return this._globals.publicPostMethod('/landing/testimonials',data)
  }
  requestFeaturedTaskCreator(){
    let data = {
      limit : 21
    }
    return this._globals.publicPostMethod('/landing/task/get-featured-task-creator',data)
  }

}
