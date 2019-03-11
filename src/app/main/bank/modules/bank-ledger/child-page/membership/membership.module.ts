import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from '../../../../../../layout/material-module/material.module';
import { MembershipComponent } from './membership.component';
import { WithdrawalComponent } from './tabs/withdrawal/withdrawal.component';
import { HistoryComponent } from './tabs/history/history.component';
import { ConfirmWithdrawalComponent } from './modals/confirm-withdrawal/confirm-withdrawal.component';
import { PurchaseComponent } from './tabs/purchase/purchase.component';
import { SuperiorRoutingModule } from './membership-routing.module';
import { FormsModule } from '@angular/forms';
import { WithdrawalDetailsComponent } from './tabs/withdrawal/modal/withdrawal-details/withdrawal-details.component';
import { PayoutHistoryComponent } from './tabs/history/modal/payout-history/payout-history.component';
import { PurchaseDetailsComponent } from './tabs/purchase/modal/purchase-details/purchase-details.component';




@NgModule({
  declarations: 
  [
    MembershipComponent,
    ConfirmWithdrawalComponent,
    HistoryComponent,
    WithdrawalComponent,
    PurchaseComponent,
    WithdrawalDetailsComponent,
    PayoutHistoryComponent,
    PurchaseDetailsComponent

    

  ],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    SuperiorRoutingModule,
    FormsModule
  ],
  
  entryComponents: 
  [ConfirmWithdrawalComponent, PayoutHistoryComponent, PurchaseDetailsComponent]
 
})
export class MembershipModule { }
