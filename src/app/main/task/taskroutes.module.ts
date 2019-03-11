import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
import { AllTaskModalComponent } from './modules/modal/all-task-modal/all-task-modal.component';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from 'app/layout/material-module/material.module';

const routes = [
    { path: '',
        redirectTo: '/task/alltask',
        pathMatch: 'full'
    },
    {
        path: 'alltask',
        loadChildren: './modules/alltask/alltask.module#AlltaskModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'taskdetails/:slug',
        loadChildren: './modules/taskdetails/taskdetails.module#TaskDetailsModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'mytask',
        loadChildren: './modules/mytask/mytask.module#MytaskModule'
    },
    {
        path: 'createtask',
        loadChildren: './modules/createtask/createtask.module#CreateTaskModule'
    },
    {
        path: 'complete',
        loadChildren: './modules/completedtask/completedtask.module#CompletedTaskModule'
    },
    {
        path: 'hidden',
        loadChildren: './modules/hiddentask/hiddentask.module#HiddenTaskModule'
    },
    {
        path: 'updatetask/:slug',
        loadChildren: './modules/updatetask/updatetask.module#UpdateTaskModule',
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MaterialModule,
    ],
    declarations: [AllTaskModalComponent],
    entryComponents: [AllTaskModalComponent]
})
export class TaskRoutesModule {
}
