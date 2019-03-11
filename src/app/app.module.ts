import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginModule} from 'app/main/login/login.module';
import { RegisterModule } from 'app/main/register/register.module';
import { WizardFormModule } from 'app/main/wizard-form/wizard-form.module';
import { ForgotPasswordModule } from 'app/main/forgot-password/forgot-password.module';
import { AuthGuard } from 'app/globals/route-guards/auth.guard';
// import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { MaterialModule } from './layout/material-module/material.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { ResetModule } from './main/reset/reset.module';
import { LandingPageModule } from './main/landing-page/landing-page.module';
import { CalculatorGuard } from './globals/route-guards/calculator.guard';
import { ThankyouModule } from './main/thankyou/thankyou.module';
import { MemberThankyouModule } from './main/membershipthankyou/membershipthankyou.module';
import { MembershipPricingModule } from './main/membership-pricing/membership-pricing.module';
import { DiscountPipe } from './pipes/discount.pipe';
import { PopupComponent } from './modals/popup/popup.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'environments/environment';
import { CoinSalesModule } from './main/coin-sales/coin-sales.module';

const env = environment;
const config: SocketIoConfig = { url: env.socket, options: {
    path: '/kryptonia',
    forceNew: false,
} };

  
const appRoutes: Routes = [
    {
        path      : 'task',
        loadChildren: './main/task/taskroutes.module#TaskRoutesModule',
        canActivate: [AuthGuard],
    },
    {
        path      : 'bank',
        loadChildren: './main/bank/bankroutes.module#BankRoutesModule',
        canActivate: [AuthGuard],
    },
    {
        path      : 'leaderboard',
        loadChildren: './main/leaderboard/leaderboard.module#LeaderBoardRoutesModule',
        canActivate: [AuthGuard],
    },
    {
        path      : 'others',
        loadChildren: './main/others/othersroutes.module#OtherApplicationsRoutesModule',
        canActivate: [AuthGuard],
    },
    {
        path      : 'steemit-calculator',
        loadChildren: './main/steemit-calculator/steemit-calculator.module#SteemitCalculatorModule',
        canActivate: [AuthGuard, CalculatorGuard],
    },
    {
        path      : '**',
        redirectTo: 'task/alltask'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        DiscountPipe,
        PopupComponent,
        // LandingPageComponent,

    ],
    entryComponents: [PopupComponent],
    imports     : [
        // BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes,  {onSameUrlNavigation: 'reload'}),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        WizardFormModule,
        MaterialModule,
        ResetModule,
        // App modules
        LayoutModule,
        LandingPageModule,
        ThankyouModule,
        MemberThankyouModule,
        MembershipPricingModule,
        CoinSalesModule,

        SocketIoModule.forRoot(config),
    ],
    
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
