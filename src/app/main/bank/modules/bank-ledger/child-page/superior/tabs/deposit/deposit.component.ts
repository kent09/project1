import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BANKDEPOSITAPI , SuperCoinDepositHttpRequest } from 'app/main/bank/modules/bank-ledger/child-page/superior/tabs/deposit/bank-deposit.service';
import { ModalDepositDetailComponent } from './modal-deposit-detail/modal-deposit-detail.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DepositComponent implements OnInit {


  
  displayedColumns = ['date_received','block', 'amount', 'tx_id',  'status', 'option'];
  exampleDatabase: SuperCoinDepositHttpRequest | null;
  data: BANKDEPOSITAPI[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  search: string = "";
  filter_date = null;
  no_record = "";
  myDate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _dialog: MatDialog,
    private _auth: AuthService) { }

  ngOnInit() {

    this.exampleDatabase = new SuperCoinDepositHttpRequest(this.http, this._globals, this._auth);
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
          if(data.code == 200){
            const decodedData = this._globals.parseJwt(data.data);
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            const itHasCountedValues = typeof decodedData.count === 'undefined' ? 0 : decodedData.count ;
            this.resultsLength = itHasCountedValues;
            return ('list' in decodedData) ? decodedData.list : decodedData;
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

  showDetail(detail) {
    const dialogRef = this._dialog.open(ModalDepositDetailComponent, {
      data: detail
    });
  }

}


