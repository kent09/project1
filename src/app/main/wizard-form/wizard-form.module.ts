import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule,  } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { WizardFormComponent } from 'app/main/wizard-form/wizard-form.component';

const routes = [
    {
        path     : 'auth/wizard-form',
        component: WizardFormComponent
    }
];

@NgModule({
    declarations: [
      WizardFormComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MaterialModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
    ]
})
export class WizardFormModule
{
}
