import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientRequest } from 'app/globals/HttpClientGetRequest/getRequest.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderMembershipDataService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { }

    getBalance(data){
        return new Promise((resolve, reject) => {
          this._globals.postMethod('/bank/membership/balance',data)
              .subscribe((response : any) => {
                  resolve(response)
              }, reject)
        })
    }
}
