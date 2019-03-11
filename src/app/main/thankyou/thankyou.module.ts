import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ThankyouComponent } from './thankyou.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  {
      path     : 'auth/thankyou',
      component: ThankyouComponent,
      
  }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
   MatButtonModule
  ],
  declarations: [
    ThankyouComponent
  ],
  entryComponents : []
})
export class ThankyouModule { }
