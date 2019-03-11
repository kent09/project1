import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipBillingComponent } from './membership-billing.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/material-module/material.module';

import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {
    path: '**',
    component: MembershipBillingComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    MatSelectModule,
    
  ],
  declarations: [MembershipBillingComponent]
})
export class MembershipBillingModule { }
