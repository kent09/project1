import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { TaskServiceDetails } from 'app/main/task/modules/taskdetails/services/taskdetails.services';
import { TaskDetailsComponent } from 'app/main/task/modules/taskdetails/taskdetails.component';
import { CompleterListComponent } from 'app/main/task/modules/taskdetails/tabs/compoleter-list/compoleter-list.component';
import { ProfileAboutComponent } from 'app/main/task/modules/taskdetails/tabs/about/about.component';
import { RevokeCompleterListComponent } from 'app/main/task/modules/taskdetails/tabs/revoke-completer-list/revoke-completer-list.component';
import { OtherTaskComponent } from 'app/main/task/modules/taskdetails/modals/other-task/other-task.component';
import { PreviewTaskComponent } from 'app/main/task/modules/taskdetails/modals/preview-task/preview-task.component';
import { DeactivateComponent } from 'app/main/task/modules/taskdetails/modals/deactivate-task/deactivate-task.component';
import { TaskCompleterComponent } from 'app/main/task/modules/taskdetails/modals/completer-task/completer-task.component';
import { CompleteTaskComponent } from 'app/main/task/modules/taskdetails/modals/complete-task/complete-task.component';
import { FollowUserComponent } from 'app/main/task/modules/taskdetails/modals/follow-user/follow-user.component';
import { ShareUrlComponent } from 'app/main/task/modules/taskdetails/modals/generate-url/generate-url.component';
import { GiftcoinComponent } from './modals/giftcoin/giftcoin.component';
import { RelatedTaskComponent } from './tabs/related-task/related-task.component';
import { MatDialogModule } from '@angular/material';
import { AttachmentViewerComponent } from './tabs/compoleter-list/attachment-viewer/attachment-viewer.component';

const routes: Routes = [
  {
    path: '**',
    component: TaskDetailsComponent,
    canActivate: [AuthGuard],
    resolve  : {
      profile: TaskServiceDetails
  },
  data: { path: 'taskdetails/:slug' }

  },
];



@NgModule({
  declarations: [
    TaskDetailsComponent,
    CompleterListComponent,
    ProfileAboutComponent,
    RevokeCompleterListComponent,
    OtherTaskComponent,
    PreviewTaskComponent,
    DeactivateComponent,
    TaskCompleterComponent,
    GiftcoinComponent,
    CompleteTaskComponent,
    FollowUserComponent,
    RelatedTaskComponent,
    ShareUrlComponent,
    AttachmentViewerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    MatDialogModule
  ],
  providers: [
    TaskServiceDetails

  ],
  entryComponents: [
    OtherTaskComponent,
    PreviewTaskComponent,
    DeactivateComponent,
    TaskCompleterComponent,
    CompleteTaskComponent,
    GiftcoinComponent,
    FollowUserComponent,
    ShareUrlComponent,
    AttachmentViewerComponent
  ]
})
export class TaskDetailsModule {
}

