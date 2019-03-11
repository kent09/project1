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
export class CreateTaskService {

  constructor(private _globals: GlobalsService) {  }

  requestPostCreateTask(data : any ) {
    return this._globals.postMethod('/task/task-create', data).pipe(
      map(response => <Response>response)
    );
  }

  requestGetTaskFee(data : any) {
    return this._globals.postMethod('/task/task-fee-charge', data).pipe(
      map(response => <Response>response)
    );
  }

   requestGetFreeTasks(data : any) {
    return this._globals.postMethod('/task/task-free-task', data).pipe(
      map(response => <Response>response)
    );
  }

  requestGetRequirementLimit(data : any) {
    return this._globals.postMethod('/task/task-requirement-limitation', data).pipe(
      map(response => <Response>response)
    );
  }


  decodeJwt(data){
    return this._globals.parseJwt(data);
  }
}

