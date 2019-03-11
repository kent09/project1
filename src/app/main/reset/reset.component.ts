import { ResetService } from './reset.service';
import { GlobalsService } from 'app/globals/globals.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  animations : fuseAnimations
})
export class ResetComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  config: any;
  email : any;
  password : any;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private actvRoute: ActivatedRoute,
      private _globals : GlobalsService,
      private _reset : ResetService
  )
  {
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
                width    : 'fullwidth',
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

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this.resetPasswordForm = this._formBuilder.group({
          name           : ['', Validators.required],
          email          : ['', [Validators.required, Validators.email]],
          password       : ['', Validators.required],
          passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
      });

      // Update the validity of the 'passwordConfirm' field
      // when the 'password' field changes
      this.resetPasswordForm.get('password').valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
          });

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

  resetPassword(){
    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    let data = {
        token : getUrl[3],
        email : this.email,
        password : this.password
    }

    this._reset.requestResetPassword(data).subscribe(res => {
        if(res['code'] ==  200){
            swal({
              title: "Success",
              text: res['message'],
              icon: "success",
              dangerMode: true,
            });

            const val = '/auth/login/'
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
