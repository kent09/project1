import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';


const routes = [
    {
        path: 'bank-and-ledger', 
        redirectTo: 'bank-and-ledger/superiorcoin', 
        pathMatch: 'full'
    },
    {
        path: 'bank-and-ledger',
        loadChildren: './modules/bank-ledger/bankledger.module#BankLedgerModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'tasks/rewards',
        loadChildren: './modules/bank-history/tabs/task-rewards/task-rewards.module#TaskRewardsModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'referral/points',
        loadChildren: './modules/bank-history/tabs/referral-points/referral-points.module#ReferralPointsModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'membership-earnings',
        loadChildren: './modules/bank-history/tabs/membership-earnings/membership-earnings.module#MembershipEarningsModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'gift/coins',
        loadChildren: './modules/bank-history/tabs/gift/gift.module#GiftsModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'bonus/coins',
        loadChildren: './modules/bank-history/tabs/bonus-social/bonus-social.module#BunosSocialModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'option/trade',
        loadChildren: './modules/bank-history/tabs/option-trade/option-trade.module#OptionTradeModule',
        canActivate: [AuthGuard],
        
    },
    {
        path: 'blog-payout',
        loadChildren: './modules/bank-history/tabs/blog-payout/blog-payout.module#BlogPayoutModule',
        canActivate: [AuthGuard],
        
    },
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [],
})
export class BankRoutesModule {
}
