import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { BankLedgerComponent } from 'app/main/bank/modules/bank-ledger/bankledger.component';
import { BanksDataLedgerComponent } from 'app/main/bank/modules/bank-ledger/header-ledger-data/banksdata.component';
import { SuperiorCoinComponent } from 'app/main/bank/modules/bank-ledger/tabs/superior-coin/superior-coin.component';
import { WithdrawalFormComponent } from 'app/main/bank/modules/bank-ledger/tabs/withdrawal/withdrawal.component';
import { superCoinTables } from 'app/main/bank/modules/bank-ledger/tabs/superior-coin/tables/super-coin-table';
import { HeaderBitcoinDataComponent } from './header-bitcoin-data/header-bitcoin-data.component';
import { HeaderMembershipDataComponent } from './header-membership-data/header-membership-data.component';


const routes: Routes = [
  {
    path: '',
    component: BankLedgerComponent,
    children: [
      {
        path: 'superiorcoin',
        loadChildren: './child-page/superior/superior.module#SuperiorModule',
      },
      {
        path: 'bitcoin',
        loadChildren: './child-page/bitcoin/bitcoin.module#BitcoinModule',
      },
      {
        path: 'membership',
        loadChildren: './child-page/membership/membership.module#MembershipModule',
      },
    ]
  },
  
];

@NgModule({
  declarations: [
    BankLedgerComponent,
    BanksDataLedgerComponent,
    SuperiorCoinComponent,
    WithdrawalFormComponent,
    superCoinTables,
    HeaderBitcoinDataComponent,
    HeaderMembershipDataComponent,


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
export class BankLedgerModule {
}

