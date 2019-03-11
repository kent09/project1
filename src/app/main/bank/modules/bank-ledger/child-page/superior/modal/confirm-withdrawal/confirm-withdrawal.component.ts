import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../../../../globals/globals.service';
import { ConfirmWithdrawalService } from './confirm-withdrawal.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, 
  MAT_DIALOG_DATA, 
  MatSnackBar, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition } from '@angular/material';
  import * as emailjs from 'emailjs-com'
@Component({
  selector: 'app-confirm-withdrawal',
  templateUrl: './confirm-withdrawal.component.html',
  styleUrls: ['./confirm-withdrawal.component.scss']
})
export class ConfirmWithdrawalComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  rec_address: any;
  payment_id: any;
  coins : any;
  description : any;
  totalCharge : any
  issending : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmWithdrawalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public _sup : ConfirmWithdrawalService,
    private _globals: GlobalsService,
    private _auth: AuthService
    ) {}

    
    ngOnInit() {
      this.rec_address = this.data.rec_address;
      this.payment_id = this.data.payment_id;
      this.coins = this.data.coins;
      this.description = this.data.description;
      this.totalCharge = this.data.totalCharge;
    }

    onNoClick(type: boolean): void {
      if(!type) {
        this.dialogRef.close({status:true});
        return;
      }
      let data = {
          rec_address: this.data.rec_address,
          payment_id: this.data.payment_id,
          coins : this.data.coins,
          description : this.data.description
      }
      this.issending = true;
      this._sup.postSupWitdrawal(data).subscribe(res => {
        
        if(res['code']== 200){
          this.snackBar.open('Please check your email address for authorizing your withdrawal', 'close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.dialogRef.close({status:true});
        }else{
          let err_msg = res.message;
          if(res.message == 'Transaction Error! Code: 0'){
            err_msg = "Please verify your last withdrawal!";
          }
          this.snackBar.open(err_msg, 'close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.issending = false;
        this.dialogRef.close({status:false});
      },(err) => {
        this.issending = false;
        
      })

    }
    send(){
        var templateParams = {
          to_name: 'James',
          from_name:'kryptonia',
          message_html: 'Check this out!'
      };
        emailjs.send('testsmtp','template_kfEKECyF', templateParams,'user_qBMvdT0Gmy4j5xNC0SzEl')
      .then(function(response) {
      }, function(err) {
      });
    }

}
