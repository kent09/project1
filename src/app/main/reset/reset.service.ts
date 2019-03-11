import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(
    private _httpClient: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  requestResetPassword(data : any){
        return this._globals.publicPostMethod(`/auth/reset-password`, data);
  }
}
