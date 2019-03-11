import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { NotificationComponent } from 'app/main/others/modules/notifications/notifications.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';


const routes: Routes = [
  {
    path: '**',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    NotificationComponent,
    ModalDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [ModalDetailComponent]
})
export class NotificationModule {
}

