import { Injectable } from '@angular/core';
import { ImportsService } from './imports/imports.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import * as crypto from 'crypto-js';
import { environment } from '../../environments/environment';

const TOKEN_PREFIX: string = '_bearer_token: ';

export const MEMBERSHIP = [
  {
    title: 'Bronze Membership',
    discount : 0,
    price: 'FREE',
    slug: 'bronze',
    span: '',
    perks: [
      '4 Tasks Creation/Day',
      '25% Voting Weight',
      '5% Task Fee Charge',
      '14D Rewards on Hold',
      'Referral Task Points up to 0.50%',
      'No Task Requirements',
      'Earn 0.50% USD/BTC Referrer Membership Fee Percentage'
    ],
    button: 'CURRENT PLAN',
  },
  {
    title: 'Silver Membership',
    discount : 0.35,
    price: '9.97',
    slug: 'silver',
    span: 'monthly',
    perks: [
      '25 Free Tasks',
      '10 Task Creation/day',
      '50% Voting Weight',
      'Steemit Voting Calc',
      '7D Rewards On Hold',
      '3% Task Fee Charge',
      'Reputation Renewal',
      'Earn 2% USD/BTC Referrer Membership Fee Percentage',
      'Referral Task Points up to 1%',
      'Can require task attachments on completion',
      'Can require follower-only task completion',
    ],
    button: 'SUBSCRIBE',
  },
  {
    title: 'Gold Membership',
    discount : 0.35,
    price: '24.97',
    slug: 'gold',
    span: 'monthly',
    perks: [
      '50 Free Tasks',
      '20 Task Creation/day',
      '75% Voting Weight',
      'Steemit Voting Calc',
      '4D Rewards On Hold',
      '2% Task Fee Charge',
      'Reputation Score Renewal',
      'Gift Membership',
      'Earn 3% USD/BTC Referrer Membership Fee Percentage',
      'Featured Task Creator',
      'Featured Kblog Blogger',
      'Referral Task Points up to 1.5%',
      'Can require task attachments on completion',
      'Can require follower-only task completion',
      'Can require Reputation and Activity Score for completers'
    ],
    button: 'SUBSCRIBE',
  },
  {
    title: 'Platinum Membership',
    discount : 0.35,
    price: '479.97',
    slug: 'platinum',
    span: 'year',
    perks: [
      '100 Free Tasks',
      'Unlimited Task Creation',
      '100% Voting Weight',
      'Steemit Voting Calc',
      '2D Rewards on Hold',
      '1% Task Fee Charge',
      'Reputation Score Renewal',
      'Gift Membership',
      'Referral Task Points up to 2%',
      'Earn 5% Referrer Membership Fee Percentager',
      'Featured Task Creator',
      'Featured Blogger',
      'All task requirements'
    ],
    button: 'SUBSCRIBE',
  },
  {
    title: 'Founders Membership',
    discount : 0.35,
    price: '999.97',
    slug: 'founder',
    span: '',
    perks: [
      '1000 Free Tasks',
      'Lifetime Membership',
      'Limited 200 Slots Only',
      'Platinum Features'
    ],
    button: 'SUBSCRIBE',
  },
];

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private api_endpoint: string;
  private api_token: string;
  private tokenData: any;

  constructor(private _imports: ImportsService, private router: Router) {
    this.api_endpoint = _imports.ENV.API_ENDPOINT;

  }

  get ENV(): any {
    return this._imports.ENV;
  }
  get ROUTER(): any {
    return this._imports.ROUTER;
  }
  get ACTV_ROUTE() {
    return this._imports.ACTIVATED_ROUTE;
  }

  public publicPostMethod(url: string, data: any) {
    let host = this._imports.ENV.HOST;
    // return this._imports.HTTP.post(host + url, data)
    const headers = new HttpHeaders().set('Access-Control-Allow-Headers', 'X-Custom-Header');
    return this._imports.HTTP.post(host + url, data, { headers: headers });
  }
  public publicPostMethod2(url: string, data: any) {
    let host = this._imports.ENV.MAPI_HOST;
    // return this._imports.HTTP.post(host + url, data)
    const headers = new HttpHeaders().set('Access-Control-Allow-Headers', 'X-Custom-Header');
    return this._imports.HTTP.post(host + url, data, { headers: headers });
  }

  public chatPostMethod($url: string, $data: any = {}): any {
    const token = sessionStorage.getItem('token');
    let chat_token = this.parseJwt(token);
    chat_token = chat_token.data.chat_token;
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + chat_token);
    headers = headers.set('Access-Control-Allow-Headers', 'X-Custom-Header');
    return this._imports.HTTP.post(this.ENV.chat_host_api + $url, $data, { headers: headers });
  }

  public postMethod(url: string, data: any): any {
    let token = sessionStorage.getItem('token');
    if (!token) {
      token = localStorage.getItem('token');
    }
    this.api_token = TOKEN_PREFIX + token;
    let headers = new HttpHeaders().set('Authorization', this.api_token);
    headers = headers.set('Access-Control-Allow-Headers', 'X-Custom-Header');
    return this._imports.HTTP.post<any>(this.api_endpoint + url, data, { headers: headers });
  }
  public getMethod(url) {
    const headers = new HttpHeaders().set('Authorization', this.api_token);
    return this._imports.HTTP.post(this.api_endpoint + url, { headers: headers });
  }

  public getNoToken(url) {
    return this._imports.HTTP.get(url)
  }

  public parseJwt(token: any = '') {
    this.tokenData = { task: [] };
    if (token) {
      this.tokenData = this.validateToken(token);
    }
    return this.tokenData;
  }

  public validateToken(token: any = '') {
    if (!token['wizard']) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    }
    // if (token["wizard"] != undefined && typeof token === 'object') {
    //   this.exeCuteWizardForm(token.wizard);
    //   return { task: [] };
    // } else {
    //   var base64Url = token.split('.')[1];
    //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   return JSON.parse(atob(base64));
    // }
  }

  public exeCuteWizardForm(token) {
    setTimeout(() => {
      if (token) {
        this.router.navigate(['/auth/wizard-form']);

      }
    }, 1000);
  }

  public dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }

  public getFbProfilePic(data) {
    return this.postMethod(`/profile/social-fb-profile-picture`, data);

  }

  public avatarImagePath(userID: any) {
    return `https://kimg.io/avatar/${userID}?resize=50x50`
    // return `http://localhost:8000/image/profiles/${userID}/avatar.png`
  }

  public encryptAES(data: any) {
    if (!data) return null;

    var ciphertext = crypto.AES.encrypt(data, environment.SECRET).toString();
    return ciphertext;
  }
  public decryptAES(ciphertext: any) {
    if (!ciphertext) return null;

    var bytes = crypto.AES.decrypt(ciphertext, environment.SECRET);
    var decryptedData = (bytes.toString(crypto.enc.Utf8));
    return decryptedData;
  }

}
