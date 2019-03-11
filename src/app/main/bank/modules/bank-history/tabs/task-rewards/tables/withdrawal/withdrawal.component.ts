import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { HttpClient } from "@angular/common/http";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { GlobalsService } from "app/globals/globals.service";
import { AuthService } from "app/main/login/auth/auth.service";
import {
    BANK_API,
    SuperCoinHttpRequest
} from "app/main/bank/modules/bank-history/tabs/task-rewards/tables/withdrawal/withdrawal.service";
import { WithdrawalModalComponent } from "./withdrawal-modal/withdrawal-modal.component";

@Component({
    selector: "app-bank-widthrawal-reward",
    templateUrl: "./withdrawal.component.html",
    styleUrls: ["./withdrawal.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BankWithdrawalRewardsTableComponent implements OnInit {
    displayedColumns = [
        "category",
        "task_title",
        "reward",
        "task_expiration",
        'avatar',
        "completed_by",
        "completed_date",
        "status",
        "option"
    ];

    exampleDatabase: SuperCoinHttpRequest | null;
    data: BANK_API[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    PROFILEIMAGE: any;

    constructor(
        private http: HttpClient,
        private _globals: GlobalsService,
        private _auth: AuthService,
        private _dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
        this.exampleDatabase = new SuperCoinHttpRequest(
            this.http,
            this._globals,
            this._auth
        );
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.exampleDatabase!.getBankDatas(
                        this.sort.active,
                        this.sort.direction,
                        this.paginator.pageIndex
                    );
                }),
                map(data => {
                    const decodedData = this._globals.parseJwt(data.data);
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = decodedData.count;

                    return "task" in decodedData
                        ? decodedData.task
                        : decodedData;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            )
            .subscribe(data => {
                this.data = data.list;
            });
    }
    
    avatarImagePath(id: any):any {
        return this._globals.avatarImagePath(id);
    }

    openDialog(detail): void {
        const dialogRef = this._dialog.open(WithdrawalModalComponent, {
          data: detail
        });
    }
}
