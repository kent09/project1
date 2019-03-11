import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './auth/auth.service';
import { GlobalsService } from '../../globals/globals.service';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';

import { FacebookLoginProvider, AuthService as FBService } from 'angularx-social-login';
import { FacebookRegisterModalComponent } from './facebook-register-modal/facebook-register-modal.component';
import { PopupComponent } from 'app/modals/popup/popup.component';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    dialogRef: any;
    login: any;
    isLogin: boolean = false;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    isFacebookLoggingIn: boolean = false;
    referral_code = null;
    returnUrl: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} router
     * @param {MatDialog} _matDialog
     * @param {AuthService} _auth
     * @param {GlobalsService} _global
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _params : ActivatedRoute,
        public _matDialog: MatDialog,
        private _auth: AuthService,
        private _global: GlobalsService,
        private socialAuthService: FBService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };


    }


    // alert ------------------------------------------------------------------------------
    openDialog() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Invalid Username or Password.';
        this.confirmDialogRef.componentInstance.title = 'Invalid';
        this.confirmDialogRef.componentInstance.hideConfirm = false;
        this.confirmDialogRef.componentInstance.buttonLabel = 'OK';
        this.confirmDialogRef.componentInstance.icon = 'account_circle';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            this.confirmDialogRef = null;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            remember: [false]
        });

        this._params.queryParamMap.subscribe((res:any) => {
            if(res.params.verified){
                // ref_code = res.params.ref;
                // this.registerForm.get('ref_code').setValue(ref_code);
                // this.checkingRefCode2(ref_code)
                swal2({
                    title : 'Successfully Verified!',
                    type : 'success'
                })
            }else{
                // if(localStorage.getItem('referenceNumber')){
                //     const referenceNumber = localStorage.getItem('referenceNumber');
                //     this.registerForm.get('ref_code').setValue(referenceNumber);
                //     setTimeout(() => {
                //       this.checkingRefCode2(referenceNumber);
                //     }, 500);
                // }
            }
        });
        
        if (localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null) {
            this.router.navigate(['/task/alltask']);
        }
        
    }

    loginAccount(loginAccount: any): void {
        
        this.isLogin = true;
        this._auth.emailParam = loginAccount.value.email;
        this._auth.passwordParam = loginAccount.value.password;
        this._auth.login.subscribe(res => {
            if (res && res.code == 200) {

                sessionStorage.setItem('token', res.data.token);

                if (loginAccount.value.remember)
                    localStorage.setItem('token', res.data.token);
                else
                    localStorage.setItem('token$',res.data.token+'@'+Date.now())

                setTimeout(() => {
                    this.isLogin = false;

                    if (sessionStorage.getItem('token') !== null) {
                        const popup_seen = localStorage.getItem('popup_seen');
                        if (popup_seen === null) {
                            console.log('Popup will show');
                            const popup = this._matDialog.open(PopupComponent, {});
                        } else if (popup_seen === 'no') {
                            console.log('Popup will show');
                            const popup = this._matDialog.open(PopupComponent, {});
                        }
                    } else {
                        localStorage.setItem('popup_seen', 'no');
                    }

                    if (this._auth.userInfo.user_id) {
                        this.returnUrl = this._params.snapshot.queryParams['returnUrl'] || '/task/alltask';
                        this.router.navigate([this.returnUrl]);
                    }
                }, 200);
            }
            else {
                this.regMessage(res);
            }
        }, (error) => {
            this.openDialog();
            this.isLogin = false;
        });
    }

    regMessage(statusType) {
        if (statusType.code === 401) {
            swal('Oops...', statusType.data.join(), 'error');
            this.isLogin = false;
        }

    }

    registerFacebookModal(fbdata: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = false;
        dialogConfig.panelClass = "other-task-dialog";
        dialogConfig.data = { ...fbdata };
        dialogConfig.autoFocus = true;
        return this._matDialog.open(FacebookRegisterModalComponent, dialogConfig)
            .afterClosed().subscribe(res => {
                if (res) {
                    
                    setTimeout(() => {
                        this.isLogin = false;
                        if (this._auth.userInfo.user_id) {
                            this.router.navigate(['/task/alltask']);
                        }
                    }, 200);
                }
            });

    }

    
    public facebookLogin() {
        let socialPlatformProvider;
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

        this.isFacebookLoggingIn = true;
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                this._auth.requestFacebookLogin(userData).subscribe((res: any) => {

                    if (res && res.code == 200) {
                        this.isFacebookLoggingIn = false;
                        
                        sessionStorage.setItem('token', res.data);
                        localStorage.setItem('token$',res.data+'@'+Date.now())

                        setTimeout(() => {
                            this.isLogin = false;
                            if (this._auth.userInfo.user_id) {
                                this.router.navigate(['/task/alltask']);
                            }
                        }, 200);
                    }
                    else if (res && res.code == 402) {
                        // this.hasReferral(userData) 
                        this.registerFacebookModal(userData)
                    } else {
                        this.regMessage(res);
                    }
                })
            }

        ).catch(err => {
        });
    }
}
