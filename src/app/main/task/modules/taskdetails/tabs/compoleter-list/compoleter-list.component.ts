import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest } from 'app/main/task/modules/taskdetails/tabs/compoleter-list/compoleter-list.service';
import { Router } from "@angular/router";

import swal2 from 'sweetalert2';
import { AttachmentViewerComponent } from './attachment-viewer/attachment-viewer.component';

@Component({
  selector: 'app-completer-list',
  templateUrl: './compoleter-list.component.html',
  styleUrls: ['./compoleter-list.component.scss'],
  animations: fuseAnimations
})
export class CompleterListComponent implements OnInit {
  
  displayedColumns = ['name', 'date','attachment','actions'];

  reason : any = null;
  exampleDatabase: SuperCoinHttpRequest | null;
  data: BANK_API[] = [];
  slug: any;
  search_key : any;
  PROFILEIMAGE: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  private _unsubscribeAll: Subject<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input('slug') slugs: string;


  attachment_url : string = "";

  constructor(private http: HttpClient,
      private _globals: GlobalsService,
      private _auth: AuthService,
      private router: Router,
      private dialog :MatDialog) { }

  ngOnInit() {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this.populateTaskCompleterList('');
    this.attachment_url = this._globals.ENV.ATTACHMENT_IMAGE;
  }
  
  openDialog(url : string) {
   
    const dialogRef = this.dialog.open(AttachmentViewerComponent,{
        data : `${this.attachment_url}/${url}`
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  searchList(search_key){
      this.populateTaskCompleterList(search_key);
  }

  populateTaskCompleterList(search_key){

      this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
          .pipe(
              startWith({}),
              switchMap(() => {
                  this.isLoadingResults = true;
                  return this.exampleDatabase!.getBankDatas(
                      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.slugs, search_key);
              }),
              map(data => {
                  const decodedData = this._globals.parseJwt(data.data);
                  this.isLoadingResults = false;
                  this.isRateLimitReached = false;
                  this.resultsLength = decodedData.count;

                  return ('task' in decodedData) ? decodedData.task : decodedData;
              }),
              catchError(() => {
                  this.isLoadingResults = false;
                  this.isRateLimitReached = true;
                  return observableOf([]);
              })
          ).subscribe((data) => { this.data = data; });
  }

  revoke(detail : any, index : number){
    
        swal2({
            title: 'Revoke Completer',
            input : 'text',
            text: "Why was the completer revoked?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, revoke it!'
        }).then((result) => {
            detail['reason'] = "";
            if (result.value.trim()) {
            this.reason = result.value;
            detail['reason'] = result.value;
            
            }
            this.sendRevokeRequest(detail, index)
        })
    
  }
  revokeAndBlock(detail:any){
    swal2({
        title: 'Revoke and Block Completer',
        text: "You will no longer view the user's tasks and profile.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, revoke it!'
      }).then((result) => {
          if(result.value){
            this.sendRevokeAndBlockRequest(detail)
          }
            
      })
    
  }

  sendRevokeAndBlockRequest(data : any){
    let payload = {
        completer_user_id : data.user_id,
        task_id : data.task_id,
    }
    this.exampleDatabase.revokeAndBlockCompleter(payload).subscribe((res:any) => {
        if(res.code == 200){
            this.populateTaskCompleterList('');
            swal2({
                position: 'center',
                type: 'success',
                title: 'Revoke and Block Successful',
                showConfirmButton: false,
                timer: 1500
              });
        }
        
    },(error) => {
        swal2({
            title: 'Oopss!',
            text: 'Something went wrong. Please try again later.',
            position: 'center',
            type: 'error',
            showConfirmButton: true,
            
          });
    })
  }
  sendRevokeRequest(data : any, index : number){
    let payload = {
        completer_user_id : data.user_id,
        task_id : data.task_id,
        reason : data.reason
    }
    this.exampleDatabase.revokeCompleter(payload).subscribe((res:any) => {
        if(res.code == 200){
            this.populateTaskCompleterList('');
            swal2({
                position: 'center',
                type: 'success',
                title: 'Revoke Successful',
                showConfirmButton: false,
                timer: 1500
              });
        }
        else if(res.code == 401){
            swal2({
                position: 'center',
                type: 'error',
                title: 'Unbale to revoke completer from this task',
                showConfirmButton: true
            });
        }
        
    },(err) => {
    })
    
  }
}

