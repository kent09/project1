import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { OptionTradeComponent } from 'app/main/bank/modules/bank-history/tabs/option-trade/option-trade.component';
import  { optionsTradeTable } from 'app/main/bank/modules/bank-history/tabs/option-trade/tables/option-trade-tables';
import { BanksDataHistoryComponent } from 'app/main/bank/modules/bank-history/tabs/option-trade/header-history-data/banksdata.component';
const routes: Routes = [
  {
    path: '**',
    component: OptionTradeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    OptionTradeComponent,
    optionsTradeTable,
    BanksDataHistoryComponent,
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
export class OptionTradeModule {
}

