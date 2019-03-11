import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MainSearchComponent } from 'app/main/others/modules/main-search/main-search.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { UsersComponent } from './tabs/users/users.component';
import { TasksComponent } from './tabs/tasks/tasks.component';


const routes: Routes = [
  {
    path: '**',
    component: MainSearchComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MainSearchComponent,
    UsersComponent,
    TasksComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: []
})

export class MainSearchModule { }
