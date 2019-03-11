import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { ReferralComponent } from 'app/main/leaderboard/modules/referral/referral.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    component: ReferralComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ReferralComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    MatDatepickerModule
  ],
})
export class ReferralModule {
}

