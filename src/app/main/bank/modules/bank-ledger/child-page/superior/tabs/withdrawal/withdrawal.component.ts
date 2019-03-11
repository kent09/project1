import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANK_API , SuperCoinHttpRequest } from 'app/main/bank/modules/bank-ledger/child-page/superior/tabs/withdrawal/bank-withdrawal.service';
import { WithdrawalDetailComponent } from '../../modal/withdrawal-detail/withdrawal-detail.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class WithdrawalComponent implements OnInit {


  displayedColumns = ['txn_date','amount', 'fee','block', 'description', 'status', 'options'];
  exampleDatabase: SuperCoinHttpRequest | null;
  data: BANK_API[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  no_record = "";
  search: string = "";
  filter_date = null;
  myDate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _dialog: MatDialog) { }

  ngOnInit() {

    this.exampleDatabase = new SuperCoinHttpRequest(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    if (this.search == undefined) {
        this.search = "";
    }
    if (this.filter_date == undefined) {
        this.filter_date = "";
    }
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getBankDeposit(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.search, this.filter_date);
        }),
        map(data => {
          if(data.code == '200'){
              const decodedData = this._globals.parseJwt(data.data);
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = decodedData.count;
              return decodedData.list;
          }else{
            this.no_record = "No records found!";
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
          }
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data });
  }

  cancel() {
    swal({
      text: "Are you sure you want to cancel the approval?",
      icon: "warning",
      dangerMode: true,
    });
  }

  withdrawalDetail(detail) {
    const dialogRef = this._dialog.open(WithdrawalDetailComponent, {
      data: detail
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  resend() {

    swal({
      text: "Are you sure you want to resend your verification?",
      icon: "info",
      dangerMode: true,
    });

    
  }

  cancelConfirm() {
    swal({
      text: "Are you sure you want to cancel the confirmation?",
      icon: "warning",
      dangerMode: true,
    });


  }

  onSearchChange(searchValue: string) {
    this.search = searchValue;
    this.ngOnInit();
  }

  addEvent(event) {
    if(event){
      let exo = `${event['_i']['year']}-${event['_i']['month']+1}-${event['_i']['date']}`;
      this.filter_date = exo;
    }else{
      this.filter_date = null;
    }
    this.ngOnInit()
    return this.filter_date;

  }


}

