import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetComponent } from 'app/main/reset/reset.component';

const routes = [
    {
        path     : 'auth/reset-password/:token',
        component: ResetComponent
    }
];
@NgModule({
  declarations: [
    ResetComponent
  ],
  imports     : [
      RouterModule.forChild(routes),

      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,

      FuseSharedModule
  ]
})
export class ResetModule { }
