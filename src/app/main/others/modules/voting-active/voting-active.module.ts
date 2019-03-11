import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { VotingActiveComponent } from 'app/main/others/modules/voting-active/voting-active.component';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { PollChoicesComponent } from './poll-choices/poll-choices.component';
import { MatDialogModule, MatRadioModule } from '@angular/material';

const routes: Routes = [
  {
    path: '**',
    component: VotingActiveComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    VotingActiveComponent,
    PollChoicesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    MatDialogModule,
    MatRadioModule
  ],
  entryComponents : [PollChoicesComponent],
  providers: []
})
export class VotingActiveModule {
}

