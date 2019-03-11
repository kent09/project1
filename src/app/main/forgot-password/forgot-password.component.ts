import { ForgotPasswordService } from './forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from "@angular/router";
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import swal from 'sweetalert';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
  
    forgotPasswordForm: FormGroup;
    email : any;

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
        public _matDialog: MatDialog,
        private _auth: AuthService,
        private _global: GlobalsService,
        private _forgotPW : ForgotPasswordService
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


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    sendRestLink(){
        let data = {
            email :this.email
        }
        this._forgotPW.requestForgotPassword(data).subscribe(res => {
            if(res['code'] == 200){
                swal({
                  title: "Success",
                  text: res['message'],
                  icon: "success",
                  dangerMode: false,
                });
      
              }else{
                swal({
                  title: "Error",
                  text: res['message'],
                  icon: "error",
                  dangerMode: true,
                });
              }
        })

    }
}
