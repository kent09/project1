import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../../../globals/route-guards/auth.guard';
import { BitcoinComponent } from './bitcoin.component';


const routes: Routes = [
  {
    path: '**',
    component: BitcoinComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitcoinRoutingModule { }
