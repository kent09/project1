import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../../../globals/route-guards/auth.guard';
import { SuperiorComponent } from './superior.component';


const routes: Routes = [
  {
    path: '',
    component: SuperiorComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperiorRoutingModule { }
