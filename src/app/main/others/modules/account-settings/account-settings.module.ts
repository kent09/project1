import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AccountSettingsComponent } from 'app/main/others/modules/account-settings/account-settings.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

import { AccountsTabComponent } from 'app/main/others/modules/account-settings/shared-settings/accounts/accounts.component';
import { PasswordTabComponent } from 'app/main/others/modules/account-settings/shared-settings/password/password.component';
import { TWFTabComponent } from 'app/main/others/modules/account-settings/shared-settings/2FA/2FA.component';
import { SocialMediaTabComponent } from 'app/main/others/modules/account-settings/shared-settings/social-media/social-media.component';
import { UserSessionTabsComponent } from 'app/main/others/modules/account-settings/shared-settings/user-session/user-session.component';
import { UserVerificationTabsComponent } from 'app/main/others/modules/account-settings/shared-settings/user-verification/user-verification.component';
import { TwoFAModalComponent } from './shared-settings/2FA/two-fa-modal/two-fa-modal.component';
import { CheckoutComponent } from './shared-settings/user-verification/modals/checkout/checkout.component';
import { BlockedUsersComponent } from './shared-settings/blocked-users/blocked-users.component';
import { RequestHardUnlinkComponent } from './shared-settings/modal/request-hard-unlink/request-hard-unlink.component';

const routes: Routes = [
  {
    path: 'membership-billing',
    loadChildren: './shared-settings/membership-billing/membership-billing.module#MembershipBillingModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'social-history',
    loadChildren: './shared-settings/social-history/social-history.module#SocialHistoryModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AccountSettingsComponent,
    AccountsTabComponent,
    PasswordTabComponent,
    TWFTabComponent,
    SocialMediaTabComponent,
    UserSessionTabsComponent,
    UserVerificationTabsComponent,
    TwoFAModalComponent,
    CheckoutComponent,
    BlockedUsersComponent,
    RequestHardUnlinkComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [TwoFAModalComponent, RequestHardUnlinkComponent]
})
export class AccountSettingsModule {
}

