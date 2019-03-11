import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest, UnhideTask } from 'app/main/task/modules/hiddentask/hiddentask.service';
import swal from 'sweetalert';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
    selector: 'app-hiddentask',
    templateUrl: './hiddentask.component.html',
    styleUrls: ['./hiddentask.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})


export class HiddenTaskComponent implements OnInit, OnDestroy {

    displayedColumns = ['category', 'avatar', 'creator', 'task', 'reward', 'option'];

    search: string = "";
    category: any;
    dataSource: any;
    all_available = 0;
    exampleDatabase: SuperCoinHttpRequest | null;
    data: BANK_API[] = [];
    PROFILEIMAGE: any;

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient,
        private _globals: GlobalsService,
        private _auth: AuthService,
        private router: Router,
        private _dialog: MatDialog,
        private _unhideTask: UnhideTask) { }

    ngOnInit() {
        this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
        let data = {limit : 1};
        this._unhideTask.getTotalCount(data).subscribe(response => {
            if (response.code == 200) {
                this.all_available = response.data;
            }
        });


        this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.paginator.pageIndex = 0;

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
                    return this.exampleDatabase!.getBankDatas(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.category, this.search);
                }),
                map(data => {
                    const decodedData = this._globals.parseJwt(data.data);
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = this.all_available;
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

    filterByCategory(category: string) {
        this.category = category;
        this.ngOnInit();
        return this.category;

    }

    errorHandle() {
        swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');

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

    unhideTask(taskData: any): void {
        this.apiCallUnhideTask(taskData);
    }

    apiCallUnhideTask(taskData: any) {

        swal({
            title: `Are you sure you want to unhide this task?`,
            text: `${taskData.title}`,
            icon: `warning`,
            buttons: {
                cancel: true,
                confirm: true
            },
            dangerMode: true,
        }).then(willUnhide => {
            if (!willUnhide) throw null;
            if (willUnhide) {
                return this._unhideTask.requestUnhideTask({
                    user_id: this._auth.userInfo.user_id,
                    task_id: taskData.task_id
                });
            }
        }).then(results => {
            return results.subscribe(response => {
                const { code, message, data } = response;
                if (code == 200) {
                    const newData = this.data.filter( el => el.id !==  taskData.id ) || []; 
                    this.data = newData;
                    swal("Yes!", message, "success");
                } else {
                    const isDataMessage = data && data.length  ? data.join('') : ''; 
                    swal("Oh noes!", `${message} ${isDataMessage}` , "error");
                }
            });
        }).catch(err => {
            if (err || err == '' || err == null) {
                swal({
                    title: "Cancelled!",
                    text: "cancelled unhide task.",
                    timer: 1000
                });
            } else {
                swal.stopLoading();
                swal.close('true');
            }
        });

    }

    modalView(detail) {
        const dialogRef = this._dialog.open(DetailModalComponent, {
            data: detail
        });

    }


}


