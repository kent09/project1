import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { VotingAnalyticComponent } from 'app/main/others/modules/voting-analytic/voting-analytic.component';
import { AnalyticsService } from 'app/main/others/modules/voting-analytic/voting-analytic.service';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';


const routes: Routes = [
  {
    path: '**',
    component: VotingAnalyticComponent,
    canActivate: [AuthGuard],
    resolve  : {
        data: AnalyticsService,
    }
  },
];

@NgModule({
  declarations: [
    VotingAnalyticComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MaterialModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),
    ChartsModule,
    NgxChartsModule,
  ],
  providers: [

    AnalyticsService
  ]
})
export class VotingAnalyticModule {
}

