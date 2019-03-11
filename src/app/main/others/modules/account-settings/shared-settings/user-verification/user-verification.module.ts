import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './modals/checkout/checkout.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatToolbarModule} from "@angular/material";
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { UserVerificationTabsComponent } from './user-verification.component';

const routes: Routes = [
  {
      path: "**",
      component: UserVerificationTabsComponent,
      canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    RouterModule,
    MaterialModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule

    
  ],
  declarations: [
  ],
  providers: [],
  entryComponents: [CheckoutComponent]
})
export class UserVerificationModule { }
