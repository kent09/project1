import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { UpdateTaskComponent } from 'app/main/task/modules/updatetask/updatetask.component';
import { UpdateTaskService } from 'app/main/task/modules/updatetask/services/updatetask.service';
import { NgxWigModule } from 'ngx-wig';
const routes: Routes = [

  {
    path: '**',
    component: UpdateTaskComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: UpdateTaskService
    },
    data: { path: 'taskdetails/:slug' }

  },
];

@NgModule({
  declarations: [
    UpdateTaskComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    NgxWigModule
  ],

  providers: [
    UpdateTaskService
  ]
})
export class UpdateTaskModule {
}

