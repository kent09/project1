import { NgModule } from '@angular/core';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { ProcessingComponent } from './processing.component';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { QRCodeModule } from 'angularx-qrcode';

const routes = [
  {
    path: '**',
    component: ProcessingComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    QRCodeModule
  ],
  declarations: [
    ProcessingComponent
  ]
})
export class ProcessingModule { }
