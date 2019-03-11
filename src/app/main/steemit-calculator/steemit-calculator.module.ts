import { NgModule } from '@angular/core';
import { SteemitCalculatorComponent } from './steemit-calculator.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { MatFormFieldModule } from '@angular/material';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes = [
  {
    path     : '**',
    component: SteemitCalculatorComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    MatFormFieldModule
  ],
  declarations: [SteemitCalculatorComponent]
})
export class SteemitCalculatorModule { }
