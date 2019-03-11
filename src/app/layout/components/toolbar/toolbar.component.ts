import { Component, OnDestroy, OnInit, AfterViewInit, ViewEncapsulation, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthService } from '../../../main/login/auth/auth.service';
import { navigation } from 'app/navigation/navigation';
import { Router, NavigationEnd } from "@angular/router";
import { BankBalancesService } from 'app/layout/components/toolbar/bank_available_total.service';
import { ConfirmComponent } from 'app/main/logout-confirm/confirm';
import { GlobalsService } from 'app/globals/globals.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { VoucherdialogComponent } from './voucherdialog/voucherdialog.component';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    userInfo: any = {};
    dialogRef: any;
    bankBalanceData: object;
    notificationsData: any[];
    countTotal: number = 0;
    offset: number = 0;
    currentOffset: number = 10;
    isLoadingNotifications:boolean = false;
    fbAvatar : any;
    hasAvatar :boolean = false;
    username : any;
    searchKey : string = "";
    
    // Private
    private _unsubscribeAll: Subject<any>;
    @ViewChildren(FusePerfectScrollbarDirective)
    private _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;
    private _chatViewScrollbar: FusePerfectScrollbarDirective;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {AuthService} _auth
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private router: Router,
        private _auth: AuthService,
        public _matDialog: MatDialog,
        private _bankBalance: BankBalancesService,
        public _globals: GlobalsService,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        setTimeout(() => {
            this.userInfo = this._auth.userInfo;
            this.username = this.userInfo.username;    
        }, 500);
        // get User Current Infos
        
        // this.getFbAvatar();
    }

   

    getFbAvatar(){
        let data = {
            social : 'facebook'
        }
        this._globals.getFbProfilePic(data).subscribe(res => {
            let decodedData = this._globals.parseJwt(res.data);
            if(res['code'] == 201){
                this.fbAvatar = decodedData.fb_profile_pic
                this.hasAvatar = true;
            }
          
        });
            
    }
    avatarImagePath(id: any): any {
        return this._globals.avatarImagePath(id);
      
    }
 
    populateBankBalances() {

        this._bankBalance.requestPostBankBalances({ user_id: this._auth.userInfo.user_id }).
            subscribe(response => {

                if (response.code === 200) {
                    this.bankBalanceData = this._bankBalance.decodeJwt(response.data);
                }

            });
    }

    populateNotifications() {
        this._bankBalance.requestPostBankNotifications({ user_id: this._auth.userInfo.user_id })
            .subscribe((response) => {
                if (response.code === 201 || response.code === 200) {
                    const notifications = this._bankBalance.decodeJwt(response.data);
                    this.notificationsData = notifications;
                }
            });
    }

    
    countNotifications() {
        this._bankBalance.requestPostCountNotifications({ user_id: this._auth.userInfo.user_id })
            .subscribe((response) => {
                if (response.code === 201 || response.code === 200) {
                    const notifications = this._bankBalance.decodeJwt(response.data);
                    this.countTotal = notifications;
                }
            });
    }

    openVoucherDialog(): void {
        const dialogRef = this._matDialog.open(VoucherdialogComponent, {
            width: '500px',
            data : null
          });
          
          dialogRef.afterClosed().subscribe(result => {
          });
    
      }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

        this._unsubscribeAll = new Subject();
        this.router.events.pipe(
            filter((event: Event) => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((res: any) => {
            if (res.url !== '/') {
                this.populateNotifications();
                this.populateBankBalances();
                this.countNotifications();
                this._unsubscribeAll.next();
                this._unsubscribeAll.complete();
            }
        });
    }

    ngAfterViewInit(): void {
        this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
            return directive.elementRef.nativeElement.id === 'notification-lists';
        });
    }

    private _prepareNotifLoadMore(): void {
        setTimeout(() => {
          // Scroll to the bottom of the messages list
            if (this._chatViewScrollbar) {
                this._chatViewScrollbar.update();
                setTimeout(() => {
                    this._chatViewScrollbar.scrollToBottom(0);
                });
            }
        });
    }

    waitToRenderHtmlEl() {
        // setTimeout(() => {
        //     var bottomDivScroll = document.getElementById("notification-lists");
        //     bottomDivScroll.addEventListener('scroll', (event: any) => {
        //         var element = event.target;
        //         if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        //             if(this.currentOffset == 10){
        //                 this.currentOffset = 20;
        //                 this.offset = this.currentOffset;
        //                 this.loadMore(this.offset);
        //             return;
        //             }
        //             this.offset += 10;
        //             this.loadMore(this.offset);
        //         }
        //     });
        // }, 500);
            this.countTotal = 0;
            if(this.currentOffset == 10){
                this.currentOffset = 20;
                this.offset = this.currentOffset;
                this.loadMore(this.offset);
            return;
            }
            this.offset += 10;
            this.loadMore(this.offset);
        
    }


    loadMore(offsets) {
        this.isLoadingNotifications = true;
        const params = { limit: offsets, filter: null, user_id: this.userInfo.user_id };
        this._bankBalance.requestPostBankNotifications(params)
            .subscribe((response) => {
                if (response.code === 201 || response.code === 200) {
                    const notifications = this._bankBalance.decodeJwt(response.data);
                    this.notificationsData = notifications;
                    this.isLoadingNotifications = false;
                    this._prepareNotifLoadMore();
                }
            });
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

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        if(value.target){
            this.searchKey = value.target.value;
        }
        
    }
    onKeydown(event) {
        if (event.key === "Enter") {
            if(this.searchKey.trim().length > 0){
                this.router.navigate([`/others/search/${encodeURI(this.searchKey)}`])
            }
            
          
        }
      }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }


    /**
     * Search
     *
     * @param value
     */
    logOut(): void {

        this.dialogRef = this._matDialog.open(ConfirmComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                confirm: {}, // something you want to pass-on add here
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (response) {
                    localStorage.clear();
                    sessionStorage.clear();
                    setTimeout(() => {
                        this.router.navigate(['/auth/login'])
                        location.reload();
                    }, 200);
                }
                // this.router.navigate(['/auth/login']);
            });



    }
}
