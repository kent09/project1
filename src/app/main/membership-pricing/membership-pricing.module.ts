import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatButtonModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembershipPricingComponent } from './membership-pricing.component';

const routes = [
  {
      path     : 'membership/pricing',
      component: MembershipPricingComponent,
      
  }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  declarations: [
    MembershipPricingComponent
  ],
  entryComponents : []
})
export class MembershipPricingModule { }
