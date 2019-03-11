
import { CoinWithdrawalService } from './coin-withdrawal.service';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './../../../../../../../../globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmWithdrawalComponent } from '../../modal/confirm-withdrawal/confirm-withdrawal.component';

@Component({
  selector: 'app-coin-withdrawal',
  templateUrl: './coin-withdrawal.component.html',
  styleUrls: ['./coin-withdrawal.component.scss']
})
export class CoinWithdrawalComponent implements OnInit {
  wallet_id : any;
  amount : any;
  address : any;
  memo : any;
  userInfo: any = {};
  receiver_address : any;
  hasError : any;
  validBtcAddress : boolean = false;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _btcWithdrawal : CoinWithdrawalService) { 

    this.userInfo = this._auth.userInfo;
  }

  ngOnInit() {
    let data = {
      user_id : this.userInfo.user_id
    }
    this._btcWithdrawal.postBtcInfo(data).subscribe(res => {
      if(res.data == null){
        this.address = null;
      }else{
        const decodedData = this._globals.parseJwt(res.data);
        this.address = decodedData['address'];
      }
    })
  }

  withdrawal(){
    let data = {
      wallet_id :this.address,
      amount : this.amount,
      memo : this.memo,
      address : this.receiver_address

    }
    this._btcWithdrawal.postBtcWitdrawal(data).subscribe(res => {
    })
  }

  openWithdrawDialog(): void {
    if(this.receiver_address == null || this.amount == null){
      swal({
        text: "Please input all required fields!",
        icon: "error",
        dangerMode: true,
      });
    }else if(this.address == null){
      swal({
        text: "Please generate a BTC wallet!",
        icon: "error",
        dangerMode: true,
      });
    }else if(!this.validBtcAddress){
      swal({
        text: "Invalid BTC Address",
        icon: "error",
        dangerMode: true,
      });
    }else{
     
      const dialogRef = this._dialog.open(ConfirmWithdrawalComponent, {
        data: { wallet_id :this.address,
                amount : this.amount,
                memo : this.memo,
                address : this.receiver_address }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.status){
          this.address = '';
          this.amount = '';
          this.memo = '';
          this.address = '';
        }
      });
    }
  }

  validator(){
    let v = this.normalize(this.receiver_address);
    let result = this.validate(v);
    if (result) {
      this.receiver_address = v;
    }
  }
  validate(s){
      let className = 'msg fail';
      let textMessage = 'Invalid bitcoin address';
      
      if (!s) {
        textMessage = 'Please enter a valid address';
      }
      
      let re = this.check(s);
      if (re) {
        className = 'msg pass';
        textMessage = 'Bitcoin address is valid';
      }
      if(textMessage == 'Invalid bitcoin address'){
        this.validBtcAddress = false;
      }else{
        this.validBtcAddress = true;
      }
      return re;
  }
  check(s) {

    if (s.length < 26 || s.length > 35) {
      return false;
    }
    
    let re = /^[A-Z0-9]+$/i;
    if (!re.test(s)) {
      return false;
    }
    
    return true;
  }
  normalize(s){
    let x = String(s) || '';
   return x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
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
