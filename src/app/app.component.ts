import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { MatDialog } from '@angular/material';
import { PopupComponent } from './modals/popup/popup.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    locationSettings: boolean = true;
    routerEvents: any;
    landingPage: boolean;
    referenceNumber: string;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _router: Router,
        private _actvRoute: ActivatedRoute,
        private _dialog: MatDialog
    ) {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes

        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                if (this.fuseConfig.layout.width === 'boxed') {

                    // this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }
            });


        this._router.events.pipe(
            filter((event: Event) => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerEvents: any) => {

            this._actvRoute.queryParamMap.subscribe((res: any) => {

                const hideSettingToolbar = routerEvents.url;
                if (res.params.verified) {
                    this._router.navigate(['/auth/login'], { queryParams: { verified: res.params.verified }, queryParamsHandling: 'merge' })
                    this.specifiedPages();
                }
                else if (res.params.p) {
                    this.document.body.classList.add('boxed');
                }
                else if (res.keys.length > 0) {
                    // when linking to steemit -> others/account-settings
                    if (!res.params.access_token) {
                        this.document.body.classList.remove('boxed');
                        this.landingPage = true;
                    }
                }
                else {

                    if (hideSettingToolbar) {
                        switch (hideSettingToolbar) {
                            case '/auth/register':
                                this.specifiedPages();
                                break;
                            case '/auth/login':
                                this.specifiedPages();
                                break;
                            case '/auth/forgot-password':
                                this.specifiedPages();
                                break;
                            case '/auth/thankyou':
                                this.specifiedPages()
                                break;
                            case '/auth/purchase/thankyou':
                                this.specifiedPages()
                                break;
                            case '/membership/pricing':
                                this.specifiedPages()
                                break;
                            case '/coin/sales':
                                this.specifiedPages()
                                break;
                            // case '/auth/wizard-form':
                            //     this.locationSettings = false;
                            //     this.document.body.classList.add('boxed');
                            //     break;
                            case '/':
                                this.document.body.classList.remove('boxed');
                                // this.landingPage = true;
                                break;
                            default:
                                this.locationSettings = true;
                                this.document.body.classList.add('boxed');

                        }

                    }
                }

                if (res.params['ref']) {
                    const referenceNumber: string = res.params['ref'];
                    localStorage.setItem('referenceNumber', referenceNumber);
                }

            })

        });

        if (sessionStorage.getItem('token') !== null) {
            const popup_seen = localStorage.getItem('popup_seen');
            if (popup_seen === null) {
                console.log('Popup will show');
                const popup = this._dialog.open(PopupComponent, {});
            } else if (popup_seen === 'no') {
                console.log('Popup will show');
                const popup = this._dialog.open(PopupComponent, {});
            }
        } else {
            localStorage.setItem('popup_seen', 'no');
        }

    }

    specifiedPages() {
        this.locationSettings = false;
        this.document.body.classList.remove('boxed');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
