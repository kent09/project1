import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { UserLeaderboardComponent } from './user-leaderboard.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { LeaderboardComponent } from './tables/leaderboard/leaderboard.component';
import { ReferralComponent } from './tables/referral/referral.component';

const routes: Routes = [
  {
    path: '**',
    component: UserLeaderboardComponent,
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
  declarations: [
    UserLeaderboardComponent,
    LeaderboardComponent, 
    ReferralComponent
  ]
})
export class UserLeaderboardModule { }
