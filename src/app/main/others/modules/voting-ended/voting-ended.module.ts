import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { VotingEndedComponent } from 'app/main/others/modules/voting-ended/voting-ended.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    component: VotingEndedComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    VotingEndedComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: []
})
export class VotingEndedModule {
}

