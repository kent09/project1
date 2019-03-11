import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from './../../../../../../globals/globals.service';
import { AccountService } from './account.service';
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
  selector: 'app-tab-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})





export class AccountsTabComponent implements OnInit, OnDestroy {
  
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
  registerForm: FormGroup;
  dialogRef: any;
  copyFormValues: any;
  checkingCode: boolean = false;
  referralName: string = '';
  selectedFile: File;
  decodedData : any;
  uname : any;
  // DataArray: Array<any> = [];
  DataArray: any;
  about : any;
  default_country : any;
  full_name : any;
  email : any;
  username : any;
  location : any;
  PROFILEIMAGE : any;
  user_id : any;
  profilepic : any;
  imageFormat : any;
  userInfo : any;
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
    private _acc : AccountService,
    private _globals : GlobalsService,
    private _auth: AuthService
  ) {
    this.userInfo = this._auth.userInfo;
    this._unsubscribeAll = new Subject();

  }


  ngOnInit(): void {
    this.PROFILEIMAGE = this._globals.ENV.PROFILE_IMAGE
    this._acc.accountDetails().subscribe(res => {
      this.decodedData = this._globals.parseJwt(res.data);
      this.DataArray = Object.entries(this.decodedData.countryList).map(([type, value]) => ({type, value}));
      this.about = this.decodedData.about;
      this.default_country = this.decodedData.country;
      this.full_name = this.decodedData.name
      this.email = this.decodedData.email
      this.username = this.decodedData.username
      this.location = this.decodedData.location
      this.user_id = this.decodedData.user_id
      this.profilepic =  this._globals.avatarImagePath(this.user_id);
   })
    this.registerForm = this._formBuilder.group({
      fname: ['', Validators.required],
      city: ['', Validators.required],
      notes: ['', Validators.required],
      username: ['', Validators.required],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes

  }
  avatarImagePath(id: any): any {
    return this._globals.avatarImagePath(id);
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
    let fname = this.registerForm.get('fname')['_pendingValue'];
    let city = this.registerForm.get('city')['_pendingValue'];
    let username = this.registerForm.get('username')['_pendingValue'];
    let data = {
      location : city,
      country : this.default_country,
      username : username,
      about : this.about,
      name : fname
    }
    if(this.registerForm.status == 'INVALID'){
      swal("Error","Please input all fields")
    }else{
      this._acc.saveDetails(data).subscribe(res => {
        if(res['status'] == 'success'){
          swal("Success","Profile Update");
        }
      })
    }

  }
  file: File = null;
  stringpic: any;
  onFileChanged(files: FileList) {

    this.file = files[0];
    this.imageFormat =  this.file.type.split("/")[1]

    var reader = new FileReader();
    reader.onload = this.readerimage.bind(this);
    reader.readAsBinaryString(this.file);
   
  }

  displayProfile(pic: File){
  
    var reader = new FileReader();
    reader.onloadend = (ev) => {
      this.profilepic = reader.result;
    }
    reader.readAsDataURL(pic);
    // this.profilepic = this.PROFILEIMAGE +'/'+ this.user_id + '/avatar.png';
  }
  
  readerimage(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.stringpic = 'data:image/jpeg;base64,' + btoa(binaryString);
    let data = {
      image : this.stringpic,
      image_format : this.imageFormat
    }
    this._acc.saveProfilePic(data).subscribe(res => {
      if(res['code'] == 201){
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          dangerMode: true,
        });
        this.displayProfile(this.file);
      }else{
        swal({
          title: "Error",
          text: "Profile Image is not supported!",
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

