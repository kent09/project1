import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { RegisterComponent } from 'app/main/register/register.component';
import { TermsAgreementComponent } from 'app/main/register/terms-agreement/terms-agreement.component';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxCaptchaModule } from 'ngx-captcha';

const routes = [
    {
        path     : 'auth/register',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent,
        TermsAgreementComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MaterialModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ],
    entryComponents: [
        TermsAgreementComponent
    ],
    exports : [
        TermsAgreementComponent
    ]
})
export class RegisterModule
{
}
