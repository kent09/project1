import { NgModule } from '@angular/core';
import { SocialHistoryComponent } from './social-history.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: SocialHistoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule
  ],
  declarations: [SocialHistoryComponent]
})
export class SocialHistoryModule { }
