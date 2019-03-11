import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule,  } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { ForgotPasswordComponent } from 'app/main/forgot-password/forgot-password.component';

const routes = [
    {
        path     : 'auth/forgot-password',
        component: ForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MaterialModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
    ]
})
export class ForgotPasswordModule
{
}
