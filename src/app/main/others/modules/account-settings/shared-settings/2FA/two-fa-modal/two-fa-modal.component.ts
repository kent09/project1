import { TwoFaService } from './two-fa.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TWOFAService } from './../twofa.service';
import { AuthService } from './../../../../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-two-fa-modal',
  templateUrl: './two-fa-modal.component.html',
  styleUrls: ['./two-fa-modal.component.scss']
})
export class TwoFAModalComponent implements OnInit {

  imageData: any;
  key : any;
  pw : any;
  twoFAcode: any;
  userInfo: any = {};
  OTP : any;

  constructor(public dialogRef: MatDialogRef<TwoFAModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data ,private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _2fa : TWOFAService,
    private sanitizer: DomSanitizer,
    private _2faModal  : TwoFaService) {
      this.userInfo = this._auth.userInfo;
     }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register2FA(){
    if(this.pw == null || this.twoFAcode == null){
        swal({
          title: "Error",
          text: "Please fill-up all required fields",
          icon: "error",
          dangerMode: true,
        });
    }else{
      let data = {
        user_id : this.userInfo.user_id,
        totp :  this.twoFAcode,
        password  : this.pw,
        secret : this.data.secret
      }
      this._2faModal.register2FA(data).subscribe(res => {
        if(res['code'] ==  200){
          swal({
            title: "Success",
            text: res['message'],
            icon: "success",
            dangerMode: true,
          });
          this.dialogRef.close()
          const val = '/others/account-settings/'
          window.location.href = val;
        }else{
          swal({
            title: "Something went wrong",
            text: res['message'],
            icon: "error",
            dangerMode: true,
          });
        }
      })
    }
  }

  disable2FA(){
    if(this.OTP == null){
      swal({
        title: "Error",
        text: "Please fill-up all required fields",
        icon: "error",
        dangerMode: true,
      });
    }else{
      let data = {
        user_id : this.userInfo.user_id,
        totp :  this.OTP,
      }
      this._2faModal.disable2FA(data).subscribe(res => {
        const decodedData = this._globals.parseJwt(res['data']);
        if(res['code'] ==  200){
          swal({
            title: "Success",
            text: res['message'],
            icon: "success",
            dangerMode: true,
          });
          this.dialogRef.close()
          const val = '/others/account-settings/'
          window.location.href = val;
        }else{
          swal({
            title: "Something went wrong",
            text: res['message'],
            icon: "error",
            dangerMode: true,
          });
        }
      })
    }

  }

}
