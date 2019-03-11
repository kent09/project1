import { CoinWithdrawalService } from './coin-withdrawal.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../../../../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmWithdrawalComponent } from '../../modal/confirm-withdrawal/confirm-withdrawal.component';

@Component({
  selector: 'app-coin-withdrawal',
  templateUrl: './coin-withdrawal.component.html',
  styleUrls: ['./coin-withdrawal.component.scss']
})
export class CoinWithdrawalComponent implements OnInit {
  supReceiverAddress : any;
  paymentId : any;
  supAmount : any = "";
  memo : any;
  userInfo: any = {};
  totalCharge : number = 0;
  hasError : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _sup : CoinWithdrawalService) {
      this.userInfo = this._auth.userInfo;
     }

  ngOnInit() {
    let data = {
      user_id : this.userInfo.user_id
    }
    this._sup.postSupInfo(data).subscribe(res => {
    })
  }

  openDialog(): void {
    if(this.supReceiverAddress == null  || this.supAmount == null || this.memo == null){
      swal({
        text: "Please input all required fields!",
        icon: "error",
        dangerMode: true,
      });
    }else{
      const dialogRef = this._dialog.open(ConfirmWithdrawalComponent, {
        data: {rec_address: this.supReceiverAddress,
               payment_id: this.paymentId,
               coins : this.supAmount,
               description : this.memo,
               totalCharge: this.supAmount + 3}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.status){
            this.supReceiverAddress = '';
            this.paymentId = '';
            this.supAmount = '';
            this.memo = '';
            
        }
      });
    }

  }

  checkInput(e : any){
    this.hasError = {
      status : false,
      message : "Non numeric is not allowed and This field is required!"
      }

    // Ensure that it is a number and stop the keypress
    if (!(((e.keyCode > 47 && e.keyCode < 59) || (e.keyCode > 95 && e.keyCode < 106)) || e.keyCode == 8)) {
      e.preventDefault();
      swal({
        text: "Non numeric is not allowed!",
        icon: "error",
        dangerMode: true,
      });
    }

  }



}
