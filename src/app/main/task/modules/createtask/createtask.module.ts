import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { CreateTaskComponent } from 'app/main/task/modules/createtask/createtask.component';
import { NgxWigModule } from 'ngx-wig';
const routes: Routes = [
  {
    path: '**',
    component: CreateTaskComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CreateTaskComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    NgxWigModule
  ],
  providers: []
})
export class CreateTaskModule {
}

