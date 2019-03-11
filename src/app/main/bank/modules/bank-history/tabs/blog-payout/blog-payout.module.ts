import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { BlogPayoutComponent } from 'app/main/bank/modules/bank-history/tabs/blog-payout/blog-payout.component';
import { ModalComponent } from './modal/modal.component';


const routes: Routes = [
  {
    path: '**',
    component: BlogPayoutComponent,
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
  providers: [],
  declarations: [BlogPayoutComponent, ModalComponent],
  entryComponents: [ModalComponent]
})
export class BlogPayoutModule { }



