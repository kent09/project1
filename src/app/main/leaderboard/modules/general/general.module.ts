import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import { LeaderBoardGeneralComponent } from 'app/main/leaderboard/modules/general/general.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    component: LeaderBoardGeneralComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    LeaderBoardGeneralComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
})
export class GeneralModule {
}

