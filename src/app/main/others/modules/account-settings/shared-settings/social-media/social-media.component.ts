import { GlobalsService } from './../../../../../../globals/globals.service';
import { SocialMediaService } from './social-media.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfigService } from '@fuse/services/config.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { RegisterService } from 'app/main/register/service/register.service';
import { RequestHardUnlinkComponent } from '../modal/request-hard-unlink/request-hard-unlink.component';
import {
  AuthService as AS,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
import * as sc2 from 'steemconnect';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, Location } from '@angular/common';


@Component({
  selector: 'app-tab-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SocialMediaTabComponent implements OnInit, OnDestroy {
  // displayedColumns = ['logo', 'type', 'status', 'action'];


  registerForm: FormGroup;
  dialogRef: any;
  copyFormValues: any;
  checkingCode: boolean = false;
  referralName: string = '';
  // Private
  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['icon', 'name', 'status', 'active'];
  userInfo: any = {};
  decodedData : any;
  message: string;
  url: string;
  steemurl : string;
  data: any = {};
  clearToken : boolean = false;
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
    private _auth : AuthService,
    private _social : SocialMediaService,
    private _globals : GlobalsService,
    private socialAuthService: AS,
    private actvRoute : ActivatedRoute,
    private loc : LocationStrategy,
    private location : Location
  ) {
    this.userInfo = this._auth.userInfo;
    this._unsubscribeAll = new Subject();

    let steemit = sc2.Initialize({
      baseURL: 'https://steemconnect.com',
      app: 'kryptoniaio',
      callbackURL: 'http://localhost:4200/others/account-settings',
      scope : ['login']
    });
  
    this.steemurl = steemit.getLoginURL();
    this.actvRoute.queryParams.subscribe((res:any) => {
      if(res.access_token){
        steemit.setAccessToken(res.access_token);
        let that = this;
        steemit.me(function (err, res) {
          if(!err){
            let data = {
              social : 'steemit',
              account_name : res.name,
              account_id : `https://steemit.com/@${res._id}`,
              user_id : that.userInfo.user_id,
              status : 1
            }
            
            that._social.requestLinkOrUnlink(data).subscribe(res => {
              that.ngOnInit()
            })
          }
        });
      }
      
    })
  
   
    
  }


  ngOnInit(): void {
 
  this.actvRoute.fragment.subscribe((res:any) => {
    const response = new URLSearchParams(res);
    let token = null;

    if(!this.clearToken){
      token = response.get('access_token');
    }
    
    if(token){
      this.clearToken = true;
      this.location.go('/others/account-settings');
      this._social.getInstagramData(`https://api.instagram.com/v1/users/self/?access_token=${token}`).subscribe((res:any) => {
        if(res){
          let data = {
            social : 'instagram',
            account_name : res.data.full_name,
            account_id : res.data.id,
            user_id : this.userInfo.user_id,
            status : 1
          }
          
          this._social.requestLinkOrUnlink(data).subscribe(res => {
            this.ngOnInit()
          })
        }
      });
    }
  })

  

    let data = {
      user_id : this.userInfo.user_id
    }

    this._social.getSocialData(data).subscribe(res => {
      this.decodedData = this._globals.parseJwt(res.data);
      
    })
  }

  initSteemit(){

  }

  steemitConnect(){
    window.open(this.steemurl, '_self');
  }
  instagramCOnnect(){
    let client_id = '01841da2e0d34502830ccc081b89265c';
    let redirect = 'http://localhost:4200/others/account-settings';
    let url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect}&response_type=token`;
    window.open(url, '_self');
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google-plus"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "linkedin"){
      socialPlatformProvider = LinkedInLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "steemit"){
      this.steemitConnect();
      socialPlatformProvider =  null;
    }
    else if(socialPlatform == "instagram"){
      this.instagramCOnnect();
      socialPlatformProvider =  null;
    }

    if(socialPlatformProvider){
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          if(socialPlatform == "facebook"){
            this.data = {
              social : socialPlatform,
              account_name : userData.name,
              account_id : userData.id,
              status : 1,
              fbProfilePic : userData.photoUrl
            }
          }else{
            this.data = {
              social : socialPlatform,
              account_name : userData.name,
              account_id : userData.id,
              status : 1
            }
          }
       
          this._social.requestLinkOrUnlink(this.data).subscribe(res => {
            this.ngOnInit()
          })
        }
      );
    }
    
  }
  
  linkOrUnlink(data){
    let $data = {
      social : data.social,
      status : data.status,
      fbProfilePic : ''
    }
    this._social.requestLinkOrUnlink($data).subscribe(res => {
      this.ngOnInit()
    })
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

  openRequestDialog(element) {

    const dialogRef = this._matDialog.open(RequestHardUnlinkComponent, {
      data: {sc_id: element.sc_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
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

