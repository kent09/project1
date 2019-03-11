import { GlobalsService } from './../../../../../../../globals/globals.service';
import { SocialMediaService } from './../../social-media/social-media.service';
import { RegisterService } from './../../../../../../register/service/register.service';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { FuseConfigService } from './../../../../../../../../@fuse/services/config.service';
import { AuthService } from './../../../../../../login/auth/auth.service';
// import { SocialMediaTabComponent } from './../../social-media/social-media.component';
import { RequestHardUnlinkService } from './request-hard-unlink.service';
// import { swal } from 'sweetalert';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  AuthService as AS,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login'
@Component({
  selector: 'app-request-hard-unlink',
  templateUrl: './request-hard-unlink.component.html',
  styleUrls: ['./request-hard-unlink.component.scss']
})
export class RequestHardUnlinkComponent {

  reason : any;
  exampleDatabase : any;

  constructor(
    public dialogRef: MatDialogRef<RequestHardUnlinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _requestHardUnlink : RequestHardUnlinkService,
    private _auth : AuthService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _signUp: RegisterService,
    private _social : SocialMediaService,
    private _globals : GlobalsService,
    private socialAuthService: AS
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){

    // this.exampleDatabase = new SocialMediaTabComponent(this._fuseConfigService,this._formBuilder, this._matDialog,this._signUp,this._auth,this._social,this._globals,this.socialAuthService);
    let data = {
      reason : this.reason,
      sc_id : this.data.sc_id
    }
    this._requestHardUnlink.requestHardUnlink(data).subscribe( res => {
      if(res['code'] == 200){
        swal({
          title: "Success",
          text: "Successfully send a request !",
          icon: "success",
          dangerMode: true,
        });
        this.dialogRef.close();
        // this.exampleDatabase.ngOnInit();
      }
    })

  }
}
