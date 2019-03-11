import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { OwnLeaderboardComponent } from 'app/main/leaderboard/modules/own-leaderboard/own-leaderboard.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    component: OwnLeaderboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    OwnLeaderboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
})
export class OwnLeaderboardModule {
}

