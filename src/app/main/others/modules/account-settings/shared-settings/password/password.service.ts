import { GlobalsService } from './../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private _httpClient: HttpClient,
    private _globals : GlobalsService) { }

    changePassword(data : any){
      return this._globals.postMethod(`/profile/update-password`, data);
  }
}
