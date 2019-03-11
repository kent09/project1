import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { MembershipEarningsComponent } from './membership-earnings.component';
import { MemDetailsComponent } from './modal/mem-details/mem-details.component';
import { MatDialog } from '@angular/material';



const routes: Routes = [
  {
    path: '**',
    component: MembershipEarningsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
 
  declarations: [MembershipEarningsComponent, MemDetailsComponent ],
  entryComponents: [
    MemDetailsComponent
  ]
})
export class MembershipEarningsModule { }
