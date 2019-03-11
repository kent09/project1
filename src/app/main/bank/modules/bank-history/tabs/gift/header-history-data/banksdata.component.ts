import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { BankBalancesService } from 'app/main/bank/modules/bank-history/tabs/task-rewards/header-history-data/services/banksdata.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-header-history-data',
  templateUrl: './banksdata.component.html',
  styleUrls: ['./banksdata.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BanksDataHistoryComponent implements OnInit, OnDestroy {

  isLoading:boolean = true;
  bankBalanceData:object; 
  userInfo:object; 

  /**
   * Constructor
   *
   * @param {BankBalancesService} _bankBalance
   * @param {AuthService} _auth
   */

  constructor(
    private _bankBalance: BankBalancesService,
    private _auth: AuthService,
  ) {
    this.populateBankBalances();
  }

  populateBankBalances(){
    this._bankBalance.requestPostBankBalances({ user_id: this._auth.userInfo.user_id  }).
    subscribe(response => {
        if(response.code === 200){
            this.isLoading = false;
            this.bankBalanceData = this._bankBalance.decodeJwt(response.data);
        }
    });
  }

  refreshDataBank(): void{
    this.isLoading = true;
    this.bankBalanceData = {} ;
    this.populateBankBalances();
  }


  ngOnInit(): void {

  }

  copyData(type: string, codes: string){
    const message = this.alertType().messageType[`${type}`];
    swal({
      title: "Copied",
      text: message,
      icon: "success",
      dangerMode: true,
    });
    this.copyCommand(codes);

  }

  
  copyCommand(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }
  alertType(){
    return {
      messageType: {
        code: 'Address has copied!',
        link: 'Links has copied!'
      },

    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }

}
