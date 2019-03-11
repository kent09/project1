import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { VotingAnalyticComponent } from './modules/voting-analytic/voting-analytic.component';
import { VotingActiveComponent } from './modules/voting-active/voting-active.component';
import { VotingEndedComponent } from './modules/voting-ended/voting-ended.component';
import { FaqComponent } from './modules/faq/faq.component';
import { MainSearchComponent } from './modules/main-search/main-search.component';

const routes = [

    { path: '',
        redirectTo: '/task/alltask',
        pathMatch: 'full'
    },
    {
        path: 'profile/:username',
        loadChildren: './modules/myprofiles/myrprofiles.module#MyProfilesModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'announcement',
        loadChildren: './modules/announcement/announcement.module#AnnouncementModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'announcement-details',
        loadChildren: './modules/announcement-details/announcement-details.module#AnnouncementDetailsModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'account-settings',
        loadChildren: './modules/account-settings/account-settings.module#AccountSettingsModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'voting-active',
        loadChildren: './modules/voting-active/voting-active.module#VotingActiveModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'voting-ended',
        loadChildren: './modules/voting-ended/voting-ended.module#VotingEndedModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'voting-analytic',
        loadChildren: './modules/voting-analytic/voting-analytic.module#VotingAnalyticModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'faq',
        loadChildren: './modules/faq/faq.module#FaqModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'notifications',
        loadChildren: './modules/notifications/notifications.module#NotificationModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'search/:search_key',
        loadChildren: './modules/main-search/main-search.module#MainSearchModule',
        canActivate: [AuthGuard],
    }
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: []
})
export class OtherApplicationsRoutesModule {
}
