import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule, MatButtonModule, MatListModule, MatStepperModule } from '@angular/material';
import { CoinSalesComponent } from './coin-sales.component';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes = [
  {
      path     : 'coin/sales',
      component: CoinSalesComponent,
  },
  {
    path    : 'coin/sales/processing',
    loadChildren: './processing/processing.module#ProcessingModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MaterialModule,
    MatStepperModule

  ],
  declarations: [
    CoinSalesComponent
  ]
})
export class CoinSalesModule { }
