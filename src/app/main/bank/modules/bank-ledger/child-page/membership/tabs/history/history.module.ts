import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { HistoryComponent } from './history.component';
import { PayoutHistoryComponent } from './modal/payout-history/payout-history.component';



const routes: Routes = [
  {
    path: '**',
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  declarations: [],
  entryComponents:[
    PayoutHistoryComponent
  ]
})
export class HistoryModule { }
