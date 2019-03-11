import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, MyTaskService } from 'app/main/task/modules/mytask/services/mytask.service';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from "@angular/router";
import { DeactivateComponent } from './modal/deactivate/deactivate.component';
import { GenerateUrlComponent } from './modal/generate-url/generate-url.component';

import swal2 from 'sweetalert2';
import { LocationStrategy } from '@angular/common';
import { DetailComponent } from './modal/detail/detail.component';

@Component({
    selector: 'app-mytask',
    templateUrl: './mytask.component.html',
    styleUrls: ['./mytask.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MytaskComponent implements OnInit {

    displayedColumns =  ['category', 'status_str', 'title', 'available_completer', 'reward', 'created_at', 'slug'];
    search : string = "";
    category: any;

    exampleDatabase: MyTaskService | null;
    data: BANK_API[] = [];

    resultsLength = 0;
    all_available = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient,
        private _globals: GlobalsService,
        private _auth: AuthService,
        private _dialog: MatDialog,
        private router: Router,
        private url : LocationStrategy) { }

    ngOnInit() {
        this.exampleDatabase = new MyTaskService(this.http, this._globals, this._auth);
        let data = {limit : 1};
        this.exampleDatabase.getTotalCount(data).subscribe(response => {
            if (response.code == 200) {
                this.resultsLength = response.data;
            }
        });
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        if (this.category == undefined) {
            this.category = "";
        }

        if (this.search == undefined) {
            this.search = "";
        }

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.exampleDatabase!.getBankDatas(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex, this.category, this.search);
                }),
                map(data => {
                    const decodedData = this._globals.parseJwt(data.data);
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;

                    if(this.search !== ""){
                        this.resultsLength = decodedData.task.length;
                    }
                
                    return ('task' in decodedData) ? decodedData.task : decodedData;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe((data) => { this.data = data });
       
    }


    onSearchChange(searchValue: string) {
        this.search = searchValue;
        this.ngOnInit();
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }

    updateTask(slug : string){
        let data = {slug : slug};
        this.exampleDatabase.updateTaskCategory(data).subscribe(response => {
            this.router.navigate([`/task/updatetask/${slug}`]);
        });        
    }

    /**
 * Edit Details
 *
 * @param contact
 */
    editContact(contact): void {
    }

    /**
* View Details
*
* @param contact
*/
    viewDetails(taskData): void {
        if(taskData.slug == null){
            swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');
        }
        this.router.navigate([`/task/taskdetails/${taskData.slug}`]);
    }

    errorHandle() {
        swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');
    }

    filterByCategory(category){
        this.category = category;
        this.ngOnInit();
        return this.category;
    }

    opendeORactivateDialog(taskData: any, type: string): void {
       const dialogRef = this._dialog.open(DeactivateComponent, {
            data: {
                taskData, ...{
                    type: type
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if(result){
                this.ngOnInit();
            }
            
        });
    }

    showDetailMobile(value) {
        const dialogRef = this._dialog.open(DetailComponent, {
            data: {data : value}
        });
    }

    openUrlDialog(slug : string): void {
        const angularRoute = this.url.path();
        const url = window.location.href;
      
        const domain = url.replace(angularRoute, '');
      
        const dialogRef = this._dialog.open(GenerateUrlComponent, {
            data: {url: `${domain}/task/taskdetails/${slug}`}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    deleteContact(ev){
        swal2({
            title: 'Archive task?',
            text: "You can never undo this action.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, archive it!'
          }).then((result) => {
            if (result.value) {
                this.exampleDatabase.archiveTask(ev.task_id).subscribe((res:any) => {
                    this.ngOnInit();
                })   
            }
          })
       
    }
    
}

