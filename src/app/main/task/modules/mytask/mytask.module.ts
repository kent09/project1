import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MytaskComponent } from 'app/main/task/modules/mytask/mytask.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { DeactivateComponent } from './modal/deactivate/deactivate.component';
import { GenerateUrlComponent } from './modal/generate-url/generate-url.component';
import { DetailComponent } from './modal/detail/detail.component';

const routes: Routes = [
  {
    path: '**',
    component: MytaskComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MytaskComponent,
    DeactivateComponent,
    GenerateUrlComponent,
    DetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
  ],
  entryComponents: [DeactivateComponent, GenerateUrlComponent, DetailComponent]
})
export class MytaskModule {
}

