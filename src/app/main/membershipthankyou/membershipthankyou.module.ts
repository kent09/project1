import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatButtonModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembershipthankyouComponent } from './membershipthankyou.component';

const routes = [
  {
      path     : 'auth/purchase/thankyou',
      component: MembershipthankyouComponent,
      
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
    MembershipthankyouComponent
  ],
  entryComponents : []
})
export class MemberThankyouModule { }
