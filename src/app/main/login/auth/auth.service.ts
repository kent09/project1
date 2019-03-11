import { Injectable } from '@angular/core';
import { GlobalsService } from '../../../globals/globals.service';
import { map } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private email : string;
  private password : string;
  private user$ : any;
  private redirect_url : string
  private history : Array<any>;

  constructor(private _globals : GlobalsService, private url : LocationStrategy) {
    this.redirect_url = '/task';
    this.history = [];
  }
  
  set emailParam(email : string){
    this.email = email;
  }
  set passwordParam(password : string){
    this.password = password;
  }
  set redirectURL(url : string){
    this.redirect_url = url;
  }
  get redirectURL(){
    return this.redirect_url;
  }

  get userInfo() : any{
    const dataUser = {
      data:  {
        user_id: '',
        email: '',
        name: '',
        username: '',
        type: '',
        agreed: '',
      }
    }
    let user =  {};
    
    if(sessionStorage.getItem("token") == null && localStorage.getItem('token') == null){
       user = dataUser;
    }else{
      user = this._globals.parseJwt(sessionStorage.getItem('token'))['data'];
     
      if(!user){
        user = this._globals.parseJwt(localStorage.getItem('token'))['data'];
      }
    
    }
    user['profile_img'] = `${this._globals.ENV.PROFILE_IMAGE}/${user['user_id']}/avatar.png`;
    return user;
  }

  get login(){
    this.user$ = this.requestLogin().pipe();
    return this.user$;
  }

  public saveRoutes(){
    this.history = [...this.history, this.url.path()];
  }
  
  get previousUrl(){
    return this.history[this.history.length-1];
  }

  private requestLogin(){
    let data = {
      email : this.email,
      password : this.password
    }
    let url = `/auth/login`;
    // let url = `/public/login`;

    return this._globals.publicPostMethod(url, data).pipe(
      map(response => response)
    )
  }

  public requestFacebookLogin(userdata){
    let data = {
      id : userdata.id,
      email : userdata.email,
      image: userdata.image,
      name: userdata.name,
      token: userdata.token
    }
    return this._globals.publicPostMethod(`/auth/facebook-login`,data).pipe()
  }
 
  public registerViaFacebook(data){
    return this._globals.publicPostMethod(`/auth/facebook-register`,data).pipe()
  }
  public checkRefCode(code){
    return this._globals.publicPostMethod(`/auth/check-referral-code`,{code : code})
  }
  public connectSocial(data){
    return this._globals.publicPostMethod(`/auth/connect-social`,data)
  }
  public refreshToken(){
    return this._globals.postMethod('/refresh-token',{})
  }
} 
