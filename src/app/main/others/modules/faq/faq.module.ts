import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "app/layout/material-module/material.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";
import { FaqComponent } from "app/main/others/modules/faq/faq.component";
import { AuthGuard } from "app/globals/route-guards/auth.guard";
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatToolbarModule} from "@angular/material";
import { FaqService } from "app/main/others/modules/faq/faq.service";
import { ArticleComponent } from './dialogs/article/article.component';
import { AllFaqComponent } from './all-faq/all-faq.component';

const routes: Routes = [
    {
        path: "**",
        component: FaqComponent,
        resolve: {
            knowledgeBase: FaqService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [FaqComponent, ArticleComponent, AllFaqComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MaterialModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule
    ],
    providers: [FaqService],
    entryComponents: [ArticleComponent]
       
    
})
export class FaqModule {}
