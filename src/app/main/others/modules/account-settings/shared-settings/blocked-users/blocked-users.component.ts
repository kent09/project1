import { Component, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { BLOCKED_API, BlockedUsersService } from 'app/main/others/modules/account-settings/shared-settings/blocked-users/blocked-users.service';
import { merge,of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';

import swal2 from 'sweetalert2';


@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BlockedUsersComponent implements OnInit {

  displayedColumns = ['name', 'date', 'button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data: BLOCKED_API[] = [];
  resultsLength = 0;
  isunblocking : boolean  = false;
  no_record = "";

  constructor(private _blocked : BlockedUsersService, private _globals : GlobalsService) {
   
  }

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        startWith({}),
        switchMap(() => {
            return this._blocked!.getBlockedUsers(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
            if(data.code == '200'){
                const decodedData = this._globals.parseJwt(data.data);
         
                this.resultsLength = decodedData.count;
            
                return ('list' in decodedData) ? decodedData.list : decodedData;
            }else{
                this.no_record = "No records found!";
            }
            
        }),
        catchError(() => {
            return observableOf([]);
        })
    ).subscribe((data) => { this.data = data; });
  }

  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
}

  unblock(task_user_id){
    swal2({
        title: 'Unblock user?',
        text: "This user can now perform any transaction with you.",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it!'
      }).then((result) => {
        if (result.value) {
            this.isunblocking = true;
            this._blocked.unblockUser(task_user_id).subscribe((res:any)=> {
                this.isunblocking = false;
                this.ngOnInit()
            },(err)=> {
                this.isunblocking = false;
            })
        }
      })
      
  }

}


