import { PasswordService } from './password.service';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterService } from 'app/main/register/service/register.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-tab-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PasswordTabComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  dialogRef: any;
  copyFormValues: any;
  checkingCode: boolean = false;
  referralName: string = '';
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {MatDialog} _matDialog
   * @param {RegisterService} _signUp
   */


  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _signUp: RegisterService,
    private _password : PasswordService
  ) {

    this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      curPassword: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      ref_code: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm.get('newPassword').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
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
  
  saveAccount(control: AbstractControl): void {
    let curPassword = this.registerForm.get('curPassword')['_pendingValue'];
    let newPassword = this.registerForm.get('newPassword')['_pendingValue'];
    let passwordConfirm = this.registerForm.get('passwordConfirm')['_pendingValue'];
    let data = {
      cur_password : curPassword,
      new_password : newPassword
    }
    if(newPassword === passwordConfirm){
      this._password.changePassword(data).subscribe(res => {
        if(res['status'] == 'success'){
          swal(res.message);
          this.clear();
        }
        swal(res.message);
      })
    }
  }

  clear(){
    this.registerForm.reset()
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

  const password = control.parent.get('newPassword');
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

