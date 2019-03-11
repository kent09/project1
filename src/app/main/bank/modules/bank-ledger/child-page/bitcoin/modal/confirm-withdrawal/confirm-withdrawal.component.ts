import { CoinWithdrawalService } from './../../tabs/coin-withdrawal/coin-withdrawal.service';
import { Component, OnInit, Inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, 
  MatSnackBar, } from '@angular/material';

@Component({
  selector: 'app-confirm-withdrawal',
  templateUrl: './confirm-withdrawal.component.html',
  styleUrls: ['./confirm-withdrawal.component.scss']
})
export class ConfirmWithdrawalComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  wallet_id :any
  amount :any
  memo :any
  address :any;
  issending : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmWithdrawalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public _btc : CoinWithdrawalService) {
      
    }

  onNoClick(type: boolean): void {
   
    if(!type) {
      this.dialogRef.close({status:false});
      return;
    }
    let data = {
      wallet_id :this.data.wallet_id,
      amount : this.data.amount,
      memo : this.data.memo,
      address : this.data.address

    }
    this.issending = true;
    this._btc.postBtcWitdrawal(data).subscribe(res => {
      if(res['code'] == 200){
        this.snackBar.open('Please check your email address for authorizing your withdrawal', 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.dialogRef.close({status : true});
      }else{
        this.snackBar.open(res.message, 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.issending = false;
        this.dialogRef.close({status : false});
      }
      this.dialogRef.close({status : false});
    },(err) => {
     
      this.issending = false;
    })


  }

  ngOnInit() {
    this.wallet_id = this.data.wallet_id
    this.amount = this.data.amount
    this.memo = this.data.memo
    this.address=  this.data.address
 
  }

}
