import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from '../auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TermsAgreementComponent } from 'app/main/register/terms-agreement/terms-agreement.component';

@Component({
  selector: 'app-facebook-register-modal',
  templateUrl: './facebook-register-modal.component.html',
  styleUrls: ['./facebook-register-modal.component.scss']
})
export class FacebookRegisterModalComponent implements OnInit {
  ref_code: any = null;
  isfetching : boolean = false;
  referrer : any = {
    name: null,
    referrer_id: null,
    username: null
  }
  captcha_res : any = null;
  siteKey = "";
  profile_img ="";
  code_checked : boolean = false;
  captcha_loaded : boolean = false;
  aFormGroup: FormGroup;
  isFacebookLoggingIn : boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<FacebookRegisterModalComponent>, public _matDialog: MatDialog,
    private _auth: AuthService,
    private _global : GlobalsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.captcha_loaded = false;
    this.siteKey = this._global.ENV.SITE_KEY;
    this.profile_img = this._global.ENV.PROFILE_IMAGE;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      termsAgreement : [false, Validators.required]
    });
    
    if(this._data.ref_code){
      this.ref_code = this._data.ref_code;
      this.checkReferralCode(this.ref_code)
    }
   

  }
  public registerViaFacebook(referrer?:any){
    let data = {
        username : this._data.name.replace(/[^a-z0-9_]+/gi, '_').replace(/^-|-$/g, '').toLowerCase(),
        name : this._data.name,
        password : this._data.id,
        email : this._data.email,
        id : this._data.id
    }
    if(this.referrer.name){
        data['ref_code'] = this.ref_code;
    }
    this.isFacebookLoggingIn = true;
    this._auth.registerViaFacebook(data).subscribe((res:any) => {
        this.isFacebookLoggingIn = false;
        if(res.code == 200){
            sessionStorage.setItem('token', res.data);
            this.matDialogRef.close(true);
           
        }
    });
    
}
  checkReferralCode(ev: any) {
    if (ev.length == 10) {
      this.referrer = {
        name: null,
        referrer_id: null,
        username: null
      }
      this.isfetching = true;
      this.code_checked = false;
      this._auth.checkRefCode(ev).subscribe((res:any) => {
        this.code_checked = true;
        this.isfetching = false;
        if(res.code == 200){
          let ref = this._global.parseJwt(res.data)
          this.referrer = ref;
        }
      })
    }
    else{
      this.referrer = {
        name: null,
        referrer_id: null,
        username: null
      }
      this.isfetching = false;
      this.code_checked = false;
    }
  }
  handleLoad(){
    this.captcha_loaded = true;
  }
  handleSuccess(ev:any){
    this.captcha_res = ev;
  }

  handleExpire(){
    // captcha expired
  }
  
  termsAndAgreement(): void{
     this._matDialog.open(TermsAgreementComponent, {
        panelClass: 'terms-agreement-dialog',
        data      : {
            confirm: { } , // something you want to pass-on add here
            action : 'edit'
        }
    });

    // this.dialogRef.afterClosed()
    //     .subscribe(response => {
    //     });
}
}
