import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/layout/material-module/material.module';
import { ChatPanelComponent } from 'app/layout/components/chat-panel/chat-panel.component';
import { ChatPanelService } from 'app/layout/components/chat-panel/chat-panel.service';
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        ChatPanelComponent
    ],
    providers   : [
        ChatPanelService
    ],
    imports     : [
        MaterialModule,
        HttpModule,
        FuseSharedModule,
        LazyLoadImageModule.forRoot({
            preset: intersectionObserverPreset
        }),
        RouterModule,
    ],
    exports     : [
        ChatPanelComponent
    ]
})
export class ChatPanelModule
{
}
