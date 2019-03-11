import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../../../globals/route-guards/auth.guard';
import { MembershipComponent } from './membership.component';


const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperiorRoutingModule { }
