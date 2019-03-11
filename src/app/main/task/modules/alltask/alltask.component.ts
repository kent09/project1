import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Subject, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API, SuperCoinHttpRequest } from 'app/main/task/modules/alltask/alltasks.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import { HttpClientRequest } from 'app/globals/HttpClientGetRequest/getRequest.service';
import { AllTaskModalComponent } from '../modal/all-task-modal/all-task-modal.component';
import { MembershipBillingService } from 'app/main/others/modules/account-settings/shared-settings/membership-billing/membership-billing.service';
import { PopupComponent } from 'app/modals/popup/popup.component';


@Component({
    selector: 'app-alltask',
    templateUrl: './alltask.component.html',
    styleUrls: ['./alltask.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AlltaskComponent implements OnInit, OnDestroy {
    displayedColumns = ['category', 'avatar', 'user', 'title', 'reward', 'slug'];

    search: string = '';

    exampleDatabase: SuperCoinHttpRequest | null;
    data: BANK_API[] = [];

    all_available = 0;

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    category: any;

    PROFILEIMAGE: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient,
        private _globals: GlobalsService,
        private _auth: AuthService,
        private router: Router,
        private _alltask: SuperCoinHttpRequest,
        private getRequest: HttpClientRequest,
        private _dialog: MatDialog,
        private _activated: ActivatedRoute,
        private _member: MembershipBillingService,
    ) { }

    ngOnInit() {
        this._activated.queryParams.subscribe(params => {

            if (params.paymentId) {
                const data = {
                  payment_id: params.paymentId,
                  token: params.token,
                  payer_id: params.PayerID
                };
        
                swal2({
                  title: 'One more step!',
                  text: `Kryptonia is now finalizing your purchase. Please wait.`,
                  allowOutsideClick: false,
                  onOpen: () => {
                    swal2.showLoading();
                  }
                });
        
                this._member.confirmPayment(data).subscribe(res => {
                  swal2.close();
                  
                  if (res.code === 200) {
                     swal2({
                      title: `<h1><strong>${res.data.code}</strong></h1>`,
                      text: 'This is your voucher code. Please always keep a copy of this to use it later.',
                      type: 'success',
                      allowOutsideClick : false,
                      allowEnterKey : false,
                      allowEscapeKey : false
                    }).then((result) => {
                      this.router.navigate(['/task']);
                    });        
        
                  }
        
                }, (err) => {
                 
                  swal2.close();
                  swal2({
                    title: 'Kryptonia error!',
                    text: `Kryptonia failed to finalize your purchase. Reload page to try again or contact support`,
                    type: 'error'
                  });
                });
            }
        });


        this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE;
        const auth = this._auth.userInfo;
        
        this._alltask.getTotalCount().then((response: any) => {
            if (response.status == 200) {
                const body_URL = ('_body' in response) ?  JSON.parse(response._body).data : [];
                this.all_available = body_URL;
            }
        })

        this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth, this.getRequest);
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
                    return this.exampleDatabase.getBankDatas(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.category, this.search);
                }),
                map((data) => {
                    // data = JSON.parse(data._body);
                    const body_URL = ('_body' in data) ?  JSON.parse(data._body).data : [];
                    const decodedData = this._globals.parseJwt(body_URL);
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = decodedData.count;
                    return ('task' in decodedData) ? decodedData.task : decodedData;
                }),
                catchError((err) => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe((data) => { this.data = data;});
    }
    
    avatarImagePath(id: any): any {
        return this._globals.avatarImagePath(id);
    }

    errorHandle() {
        swal('Oops...', `SLUG task is empty\n Please contact support`, 'error');

    }

    onSearchChange(searchValue: string) {
        this.search = searchValue;
        this.ngOnInit();
    }


    filterByCategory(category: string) {
        this.category = category;
        this.ngOnInit();
        return this.category;
    }

    splitdata(data: any): any{
        let dataAny = '';
        if(data){
            const split = data.split(',');
            dataAny = split;
        }
       return dataAny;
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

    hideTask(task_id): void {
        swal2({
            title: 'Hide task?',
            text: "You can unhide this task in the hidden task list.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, hide it!'
        }).then((result) => {
            if (result.value) {

                this._alltask.hideTask(task_id).then((response: any) => {
                    if (response.code == 200) {
                        this.ngOnInit();
                    }
                })
            }
        })

    }

    viewDetailsModal(taskData) {
        const dialogRef = this._dialog.open(AllTaskModalComponent, {
            data: { taskData : taskData}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

}

