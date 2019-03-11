import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AnnouncementDetailsComponent } from 'app/main/others/modules/announcement-details/announcement-details.component';
import { SubmotRequestFormComponent } from 'app/main/others/modules/submit-request/submit-request.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    component: AnnouncementDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AnnouncementDetailsComponent,
    SubmotRequestFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [
    SubmotRequestFormComponent
  ]
})
export class AnnouncementDetailsModule {
}

