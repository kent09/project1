import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperiorRoutingModule } from './superior-routing.module';
import { SuperiorComponent } from './superior.component';
import { DepositComponent } from './tabs/deposit/deposit.component';
import { WithdrawalComponent } from './tabs/withdrawal/withdrawal.component';
import { CoinLedgerComponent } from './tabs/coin-ledger/coin-ledger.component';
import { CoinWithdrawalComponent } from './tabs/coin-withdrawal/coin-withdrawal.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from '../../../../../../layout/material-module/material.module';
import { ConfirmWithdrawalComponent } from './modal/confirm-withdrawal/confirm-withdrawal.component';
import { WithdrawalDetailComponent } from './modal/withdrawal-detail/withdrawal-detail.component';
import { ModalDepositDetailComponent } from './tabs/deposit/modal-deposit-detail/modal-deposit-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SuperiorRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  declarations: [
    SuperiorComponent, 
    DepositComponent, 
    WithdrawalComponent, 
    CoinLedgerComponent, 
    CoinWithdrawalComponent, 
    ConfirmWithdrawalComponent, 
    WithdrawalDetailComponent, ModalDepositDetailComponent
  ],
  entryComponents: [
    ConfirmWithdrawalComponent, 
    WithdrawalDetailComponent,
    ModalDepositDetailComponent
  ]
  
})
export class SuperiorModule { }
