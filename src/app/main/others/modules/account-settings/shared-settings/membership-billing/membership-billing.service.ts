import { Injectable } from '@angular/core';
import { GlobalsService } from '../../../../../../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipBillingService {

  constructor(private _global : GlobalsService) {}

  public payment(data : any){
    return this._global.postMethod('/membership/apply', data)
  }

  public confirmPayment(data : any){
    return this._global.postMethod('/membership/application-status', data)
  }
}
