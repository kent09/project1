import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { PurchaseComponent } from './purchase.component';
import { PurchaseDetailsComponent } from './modal/purchase-details/purchase-details.component';



const routes: Routes = [
  {
    path: '**',
    component: PurchaseComponent,
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
  declarations: [],
  entryComponents: [
    PurchaseDetailsComponent
  ]
})
export class PurchaseModule { }
