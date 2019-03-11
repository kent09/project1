import { TWOFAService } from './twofa.service';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterService } from 'app/main/register/service/register.service';
import { TwoFAModalComponent } from './two-fa-modal/two-fa-modal.component';
import { GlobalsService } from 'app/globals/globals.service';
@Component({
  selector: 'app-tab-2FA',
  templateUrl: './2FA.component.html',
  styleUrls: ['./2FA.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TWFTabComponent implements OnInit{

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
  image : any;
  username : any;
  secret : any;
  is_verified : any;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _signUp: RegisterService,
    private _2fa : TWOFAService,
    private _globals : GlobalsService
  ) {

    this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {

    this._2fa.enable2FA().subscribe(res => {
      if(res['code']== 201){
        
        let decodedData = this._globals.parseJwt(res['data'])
        this.image = decodedData.image
        this.secret = decodedData.secret
        this.username = decodedData.username
        this.is_verified = decodedData.verified
      }
    })

    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      termsAgreement: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      ref_code: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });

  }

  /**
   * On destroy
   */
  // ngOnDestroy(): void {

  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }

  saveAccount(): void {

  }
  openDialog(): void {
    const dialogRef = this._matDialog.open(TwoFAModalComponent, {
      data: {image: this.image, secret: this.secret, username: this.username ,verified : this.is_verified}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { 'passwordsNotMatching': true };
};

