import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/layout/material-module/material.module';

import {
    FuseSearchBarModule,
    FuseShortcutsModule,
    FuseConfirmDialogModule
} from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { ConfirmComponent } from 'app/main/logout-confirm/confirm';
import { LazyLoadImageModule  } from 'ng-lazyload-image';
import { VoucherdialogComponent } from './voucherdialog/voucherdialog.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        ConfirmComponent,
        VoucherdialogComponent
    ],
    imports: [
        RouterModule,
        MaterialModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseConfirmDialogModule,
        LazyLoadImageModule,
    ],
    exports: [
        ToolbarComponent
    ],
    entryComponents: [
        ConfirmComponent,
        VoucherdialogComponent
    ]
})
export class ToolbarModule {
}
