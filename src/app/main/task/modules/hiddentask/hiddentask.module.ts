import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HiddenTaskComponent } from 'app/main/task/modules/hiddentask/hiddentask.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

const routes: Routes = [
  {
    path: '**',
    component: HiddenTaskComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    HiddenTaskComponent,
    DetailModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [DetailModalComponent]
})
export class HiddenTaskModule {
}

