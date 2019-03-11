import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinRoutingModule } from './bitcoin-routing.module';
import { BitcoinComponent } from './bitcoin.component';
import { DepositComponent } from './tabs/deposit/deposit.component';
import { WithdrawalComponent } from './tabs/withdrawal/withdrawal.component';
import { OptionTradeComponent } from './tabs/option-trade/option-trade.component';
import { CoinWithdrawalComponent } from './tabs/coin-withdrawal/coin-withdrawal.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from '../../../../../../layout/material-module/material.module';
import { ConfirmWithdrawalComponent } from './modal/confirm-withdrawal/confirm-withdrawal.component';

@NgModule({
  imports: [
    CommonModule,
    BitcoinRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  declarations: [
    BitcoinComponent, 
    DepositComponent, 
    WithdrawalComponent, 
    OptionTradeComponent, 
    CoinWithdrawalComponent, ConfirmWithdrawalComponent
  ],
  entryComponents: [ConfirmWithdrawalComponent]
})
export class BitcoinModule { }
