import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { TermsAgreementComponent } from 'app/main/register/terms-agreement/terms-agreement.component';
import { RegisterService } from 'app/main/register/service/register.service';
import swal from 'sweetalert';
import { LandingPageService } from '../landing-page/landing-page.service';
import { GlobalsService } from 'app/globals/globals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookRegisterModalComponent } from '../login/facebook-register-modal/facebook-register-modal.component';
import { FacebookLoginProvider, AuthService as FBService } from 'angularx-social-login';
import { AuthService } from '../login/auth/auth.service';

@Component({
    selector   : 'register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{   
    registering : boolean = false;
    registerForm: FormGroup;
    dialogRef: any;
    copyFormValues:any;
    checkingCode: boolean = false;
    referralName: string = '';
    referralId: string = '';
    regEmail : any;
    code_checked : boolean = false;
    // Private
    private _unsubscribeAll: Subject<any>;
 
    /**
     * Constructor
     *
     * @param {MatDialog} _matDialog
     * @param {RegisterService} _signUp
     */
    siteKey : string = "";
    validCaptcha : boolean = false;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public _matDialog: MatDialog,
        private _signUp: RegisterService,
        private _landing : LandingPageService,
        private _global : GlobalsService,
        private router : Router,
        private _actvRoute: ActivatedRoute,
        private _auth : AuthService,
        private socialAuthService: FBService
    )
    {
        this.siteKey = this._global.ENV.SITE_KEY;
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.regEmail = localStorage.getItem('setEmail');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    onChanges(): void {
        this.registerForm.get('ref_code').valueChanges.subscribe(val => {
            
            this.checkingRefCode2(val)
        });
      }
    /**
     * On init
     */
    ngOnInit(): void
    {
        let ref_code = "";
       
        this.registerForm = this._formBuilder.group({
            name           : ['', Validators.required],
            termsAgreement : ['', Validators.required],
            username       : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            ref_code       : [ref_code, [Validators.minLength(10), Validators.maxLength(10)]], 
            recaptcha : ['']
        });

        this._actvRoute.queryParamMap.subscribe((res:any) => {
            if(res.params.ref){
                ref_code = res.params.ref;
                this.registerForm.get('ref_code').setValue(ref_code);
                this.checkingRefCode2(ref_code)
            }else{
                if(localStorage.getItem('referenceNumber')){
                    const referenceNumber = localStorage.getItem('referenceNumber');
                    this.registerForm.get('ref_code').setValue(referenceNumber);
                    setTimeout(() => {
                      this.checkingRefCode2(referenceNumber);
                    }, 500);
                }
            }
        });
        
     
        

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
            this.onChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    handleSuccess(event){
        this.validCaptcha = true;
    }
    // recaptcha functions
    handleExpire(){} 
    handleLoad(){}

    termsAndAgreement(): void{
        this.dialogRef = this._matDialog.open(TermsAgreementComponent, {
            panelClass: 'terms-agreement-dialog',
            data      : {
                confirm: { } , // something you want to pass-on add here
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
            });
    }

    
    /**
     * Save Account
     */

     
    saveAccount(){
        this.copyFormValues = {... this.registerForm.value};
        this.registering = true;
        this._signUp.requestPostSignUp(this.copyFormValues).
                    subscribe(response => {
                        this.regMessage(response);
                    });

    }

    regMessage(statusType){
        this.registering = false;
  
        if(statusType.code == 200){
            this.router.navigate(['/auth/thankyou'], {queryParams : {token : this._global.encryptAES(statusType.data)}})
            // swal('Registration Successful!', 'Please check your email to verify your account. ', 'success');
            //  this.router.navigate(['/auth/login'])
        }else{
            swal('Oops...', statusType.message, 'error');     
        }
    }
    registerFacebookModal(fbdata: any, refcode:any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = false;
        dialogConfig.panelClass = "other-task-dialog";
        
        fbdata['ref_code'] = refcode;

        dialogConfig.data = { ...fbdata };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(FacebookRegisterModalComponent, dialogConfig)
            .afterClosed().subscribe(res => {
                if (res) {
                    
                    setTimeout(() => {
                        // this.isLogin = false;
                        if (this._auth.userInfo.user_id) {
                            this.router.navigate(['/task/alltask']);
                        }
                    }, 200);
                }
            });

    }
    
    checkingRefCode2(refcode:string){
       
        if(refcode.length == 10){
            const code = { code : refcode}; 
            this.checkingCode = true;
            this.code_checked = false;
            this._signUp.requestCheckReferralCode(code).
                subscribe(response => {
                    this.code_checked = true;
                    if(response.code === 200){
                        this.checkingCode = false;
                        this.referralName = this._signUp.decodeJwt(response.data).name
                        this.referralId = this._signUp.decodeJwt(response.data).referrer_id
                    }
                    else{
                        this.checkingCode = false;
                        this.referralName =null;
                        this.referralId = null;
                    }
                });
        }
        else{
            this.code_checked = false;
            this.referralName = null;
        }
       
            
    }
  
    public facebookRegister() {
        let socialPlatformProvider;
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

        // this.isFacebookLoggingIn = true;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                this._auth.requestFacebookLogin(userData).subscribe((res: any) => {

                    if (res && res.code == 200) {
                        // this.isFacebookLoggingIn = false;
                        sessionStorage.setItem('token', res.data);
                        setTimeout(() => {
                            // this.isLogin = false;
                            if (this._auth.userInfo.user_id) {
                                this.router.navigate(['/task/alltask']);
                            }
                        }, 200);
                    }
                    else if (res && res.code == 402) {
                        // this.hasReferral(userData) 
                        this.registerFacebookModal(userData,this.registerForm.value.ref_code)
                    } else {
                        this.regMessage(res);
                    }
                })
            }

        ).catch(err => {
        });
    }
    checkingCodes( max: any, min: any){
       
        if(!max && !min && this.registerForm.value.ref_code){
            const code = { code : this.registerForm.value.ref_code}; 
            this.checkingCode = true;
            this._signUp.requestCheckReferralCode(code).
                subscribe(response => {
                    if(response.code === 200){
                        this.checkingCode = false;
                        this.referralName = this._signUp.decodeJwt(response.data).name
                    }
                });
        }
       
            
    }

    avatarImagePath(id: any): any {
        return this._global.avatarImagePath(id);
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
