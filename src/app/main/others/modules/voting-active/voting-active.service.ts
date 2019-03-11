import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotingActiveService {

  constructor(
    private _httpClient: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  getVotingPollList(data : any){
        return this._globals.postMethod(`/vote/voting-poll-list`, data);
  }
  castVote(data : any){
    return this._globals.postMethod(`/vote/vote`,data);
  }
}
