import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule,  } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { LoginComponent } from 'app/main/login/login.component';
import { AuthServiceConfig, FacebookLoginProvider,GoogleLoginProvider, LinkedInLoginProvider , SocialLoginModule } from 'angularx-social-login';
import { FacebookRegisterModalComponent } from './facebook-register-modal/facebook-register-modal.component';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PopupComponent } from 'app/modals/popup/popup.component';

export function getAuthServiceConfigs() {
    
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("1233672820112384")
          },
          {
            // 
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_PROVIDER_ID)
          },
           {
            id: LinkedInLoginProvider.PROVIDER_ID,
            provider: new LinkedInLoginProvider("81rzzw67sqyu3q",false,'en_US')
          },
        ]
    );
    return config;
  }
  
const routes = [
    {
        path     : 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        FacebookRegisterModalComponent,
        // PopupComponent,
    ],
    // entryComponents: [PopupComponent],
    imports     : [
        RouterModule.forChild(routes),
        MaterialModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        SocialLoginModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ],
    providers : [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
          }
    ],
    entryComponents : [
        FacebookRegisterModalComponent
    ],
    exports : [
        FacebookRegisterModalComponent,
    ]
})
export class LoginModule
{
  
}
