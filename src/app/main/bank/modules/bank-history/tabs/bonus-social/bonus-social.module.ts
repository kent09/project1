import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { BonusCoinsComponent } from 'app/main/bank/modules/bank-history/tabs/bonus-social/bonus-social.component';
import { bonusSocialsTables  } from 'app/main/bank/modules/bank-history/tabs/bonus-social/tables/bonus-social-tables';
import { BanksDataHistoryComponent } from 'app/main/bank/modules/bank-history/tabs/bonus-social/header-history-data/banksdata.component';

const routes: Routes = [
  {
    path: '**',
    component: BonusCoinsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    BonusCoinsComponent,
    bonusSocialsTables,
    BanksDataHistoryComponent
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
export class BunosSocialModule {
}

