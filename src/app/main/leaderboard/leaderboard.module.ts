import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { HowItWorkComponent } from './modules/shared-modal/how-it-work/how-it-work.component';
import { GiftCoinComponent } from './modules/shared-modal/gift-coin/gift-coin.component';
import { HardUnlinkComponent } from './modules/shared-modal/hard-unlink/hard-unlink.component';


const routes = [
    {
        path: 'general',
        loadChildren: './modules/general/general.module#GeneralModule',
        canActivate: [AuthGuard],
    }, 
    {
        path: 'referral',
        loadChildren: './modules/referral/referral.module#ReferralModule',
        canActivate: [AuthGuard],
    }, 
    {
        path: 'leaderboard',
        loadChildren: './modules/own-leaderboard/own-leaderboard.module#OwnLeaderboardModule',
        canActivate: [AuthGuard],
    }, 
    {
        path: ':username',
        loadChildren: './modules/user-leaderboard/user-leaderboard.module#UserLeaderboardModule',
        canActivate: [AuthGuard],
    },    

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MaterialModule,
        MatDatepickerModule
    ],
    declarations: [HowItWorkComponent, GiftCoinComponent, HardUnlinkComponent],
    entryComponents: [HowItWorkComponent, GiftCoinComponent]
  
})
export class LeaderBoardRoutesModule {
}

