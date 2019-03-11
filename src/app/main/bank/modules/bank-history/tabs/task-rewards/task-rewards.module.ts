import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { TaskRewardsComponent } from 'app/main/bank/modules/bank-history/tabs/task-rewards/task-rewards.component';
import { taskRewardsTables } from 'app/main/bank/modules/bank-history/tabs/task-rewards/tables/task-reward-table';
import { BanksDataHistoryComponent } from 'app/main/bank/modules/bank-history/tabs/task-rewards/header-history-data/banksdata.component';
import { CompletionModalComponent } from './tables/completion-reward/completion-modal/completion-modal.component';
import { RevokeModalComponent } from './tables/revoke-rewards/revoke-modal/revoke-modal.component';
import { WithdrawalModalComponent } from './tables/withdrawal/withdrawal-modal/withdrawal-modal.component';

const routes: Routes = [
  {
    path: '**',
    component: TaskRewardsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    TaskRewardsComponent,
    taskRewardsTables,
    BanksDataHistoryComponent,
    CompletionModalComponent,
    RevokeModalComponent,
    WithdrawalModalComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [CompletionModalComponent, RevokeModalComponent, WithdrawalModalComponent]
})
export class TaskRewardsModule {
}

