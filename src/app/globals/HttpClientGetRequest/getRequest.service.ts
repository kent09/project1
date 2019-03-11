import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { ImportsService } from 'app/globals/imports/imports.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientRequest  {

  private api_endpoint: string;

  constructor(private _http: Http, private _imports: ImportsService,) {
    this.api_endpoint = this._imports.ENV.API_ENDPOINT;
  }

  createAuthorizationHeader(headers: Headers) {
    let token = sessionStorage.getItem('token');
    if(!token){
      token = localStorage.getItem('token')
    }
    headers.append('Authorization', '_bearer_token: ' + token ); 
  }

  public getRequest(url) : any {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(this.api_endpoint+url, {
      headers: headers
    });
  }
}