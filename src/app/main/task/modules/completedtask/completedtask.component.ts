


import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest } from 'app/main/task/modules/completedtask/completedtask.service';
import { Router } from "@angular/router";
import { ModalDetailComponent } from './modal-detail/modal-detail.component';


@Component({
    selector: 'app-completedtask',
    templateUrl: './completedtask.component.html',
    styleUrls: ['./completedtask.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})


export class CompletedTaskComponent implements OnInit, OnDestroy {



    displayedColumns = ['category', 'avatar','creator', 'task_info', 'reward', 'slug'];

    search : string = "";
    category: any;

    exampleDatabase: SuperCoinHttpRequest | null;
    data: BANK_API[] = [];
    PROFILEIMAGE: any;

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
        private router: Router) { }

    ngOnInit() {
        this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
        this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
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
                    const body_URL = ('_body' in data) ?  JSON.parse(data.data) : [];
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
            ).subscribe((data) => { this.data = data; });
        
    }


    onSearchChange(searchValue: string) {
        this.search = searchValue;
        this.ngOnInit();
    }

    avatarImagePath(id: any):any {
        return this._globals.avatarImagePath(id);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
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
        }else{
            this.router.navigate([`/task/taskdetails/${taskData.slug}`]);
        }
        
    }


    filterByCategory(category: string) {
        this.category = category;
        this.ngOnInit();
        return this.category;
    }

    
    errorHandle() {
        swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');
    }

    modalView(details) {
        const dialogRef = this._dialog.open(ModalDetailComponent, {
            data: details
        });

    }

}

