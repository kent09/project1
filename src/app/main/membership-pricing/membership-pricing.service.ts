import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembershipPricingService {

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { 

    }

  getMembershipPricing(data : any) {
    return this._globals.postMethod('/membership/get-prices',data);
  }
}
