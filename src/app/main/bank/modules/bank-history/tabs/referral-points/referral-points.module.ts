import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { ReferralPointsComponent } from 'app/main/bank/modules/bank-history/tabs/referral-points/referral-points.component';
import { referralPointsTables } from 'app/main/bank/modules/bank-history/tabs/referral-points/tables/referral-points-table';
import { BanksDataHistoryComponent } from 'app/main/bank/modules/bank-history/tabs/referral-points/header-history-data/banksdata.component';
import { SignUpRewardComponent } from './tables/modal/sign-up-reward/sign-up-reward.component';
import { ReferralSocialComponent } from './tables/modal/referral-social/referral-social.component';
import { DirectLevelComponent } from './tables/modal/direct-level/direct-level.component';
import { SecondLevelComponent } from './tables/modal/second-level/second-level.component';
import { ThirdLevelComponent } from './tables/modal/third-level/third-level.component';

const routes: Routes = [
  {
    path: '**',
    component: ReferralPointsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ReferralPointsComponent,
    referralPointsTables,
    BanksDataHistoryComponent,
    SignUpRewardComponent,
    ReferralSocialComponent,
    DirectLevelComponent,
    SecondLevelComponent,
    ThirdLevelComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [], 
  entryComponents: [
    SignUpRewardComponent, 
    ReferralSocialComponent, 
    DirectLevelComponent,
    SecondLevelComponent,
    ThirdLevelComponent
  ]
})
export class ReferralPointsModule {
}

