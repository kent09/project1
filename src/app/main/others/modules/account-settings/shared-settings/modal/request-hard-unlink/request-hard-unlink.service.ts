import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestHardUnlinkService {


  constructor(private _httpClient: HttpClient,
    private _globals : GlobalsService) { }

    requestHardUnlink(data : any){
      return this._globals.postMethod(`/social-connect/hard-unlink-request`, data);
  }
}
