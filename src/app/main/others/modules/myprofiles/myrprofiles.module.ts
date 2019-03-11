import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { AuthGuard } from 'app/globals/route-guards/auth.guard';

import { MyProfilesComponent } from 'app/main/others/modules/myprofiles/myprofiles.component';
import { TaskTimeLineComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/task-and-timeline.component';
import { SharedConnectionsComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-connections/shared-connections.component';
import { FollowersComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/followers/followers.component';
import { FollowingComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/following/following.component';
import { ConnectionsComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/connections/connections.component';
import { TimeLineComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-timeline/shared-timeline.component';
import { SharedActiveTaskComponent } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/shared-active-task/shared-active-task.component';

import { GiftcoinProfileComponent } from "app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/modal/giftcoin/giftcoin.component";
import { BlockModalComponent } from './sharedcomponents/task-and-timeline/block-modal/block-modal.component';

const routes: Routes = [

  {
    path: '**',
    component: MyProfilesComponent,
    canActivate: [AuthGuard],
  }

];

@NgModule({
  declarations: [
    MyProfilesComponent,
    TaskTimeLineComponent,
    SharedActiveTaskComponent,
    SharedConnectionsComponent,
    TimeLineComponent,
    FollowersComponent,
    FollowingComponent,
    ConnectionsComponent,
    GiftcoinProfileComponent,
    BlockModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [GiftcoinProfileComponent, BlockModalComponent]
})
export class MyProfilesModule {
}

