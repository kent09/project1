import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';


import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { GiftComponent } from 'app/main/bank/modules/bank-history/tabs/gift/gift.component';
import { giftTables } from 'app/main/bank/modules/bank-history/tabs/gift/tables/gift-tables';
import { BanksDataHistoryComponent } from 'app/main/bank/modules/bank-history/tabs/gift/header-history-data/banksdata.component';
const routes: Routes = [
  {
    path: '**',
    component: GiftComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    GiftComponent,
    giftTables,
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
export class GiftsModule {
}

