import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { map } from 'rxjs/operators';

export interface Response {
  status: string;
  code: number;
  data: string;
  message: any;
}



@Injectable({
  providedIn: 'root'
})
export class CompleteService {

  constructor(private _globals: GlobalsService) {  }

  requestPostCompleteTask(data : any ) {
    return this._globals.postMethod('/task/task-complete', data).pipe(
      map(response => <Response>response)
    );
  }

  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
}

