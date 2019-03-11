import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { LandingPageComponent } from './landing-page.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';

const routes = [
  {
      path     : '',
      component: LandingPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    FuseSharedModule,
    NgxCarouselModule,
    MatDialogModule,


  ],
  declarations: [
    LandingPageComponent,
    MembershipDetailComponent
  ],
  entryComponents : [MembershipDetailComponent]
})
export class LandingPageModule { }
