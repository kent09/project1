import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../login/auth/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../logout-confirm/confirm';
import { LandingPageService } from './landing-page.service';
import { GlobalsService, MEMBERSHIP } from '../../globals/globals.service';
import { NgxCarousel } from 'ngx-carousel';
import { FuseConfigService } from '@fuse/services/config.service';
import { MembershipBillingService } from '../others/modules/account-settings/shared-settings/membership-billing/membership-billing.service';
import { Location } from '@angular/common';
import swal2 from 'sweetalert2';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: fuseAnimations
})
export class LandingPageComponent implements OnInit {
  @Input() regEmail: any;
  innerWidth: any;
  today: number = Date.now();
  imgSrc: Array<any>[];
  slider: number = 3;
  showFiller = false;
  myUserInfo: any;
  dialogRef: any;
  countNewlyRegistered: any;
  index = 0;
  businessData: any;
  topBlogger: Array<any>[];
  topBloggerName: any;
  PROFILEIMAGE: any;
  topBlogger_id: any;
  topBlogger_username: any;
  topBloggerPoints: any;
  testimonialsList: Array<any>[];
  featuredTaskCreatorList: Array<any>[];
  visitOtherProfile: any;

  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  // public carouselTileItems2: Array<any>;
  // public carouselTile2: NgxCarousel;

  private membership = MEMBERSHIP;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private router: Router,
    public _matDialog: MatDialog,
    private _global: GlobalsService,
    private _fuseConfigService: FuseConfigService,
    private _landing: LandingPageService,
    private actvRoute: ActivatedRoute,
    private _member: MembershipBillingService,
    private location: Location) {

    this.myUserInfo = this._auth.userInfo;
    this.newlyRegistered();
    this.business();
    this.topBloggers();
    this.testimonials();
    this.featuredTaskCreator();
    this.PROFILEIMAGE = this._global.ENV.PROFILE_IMAGE
    
   
    actvRoute.queryParams.subscribe((res: any) => {
      if (res.paymentId) {
        let data = {
          payment_id: res.paymentId,
          token: res.token,
          payer_id: res.PayerID
        }

        swal2({
          title: 'One more step!',
          text: `Kryptonia is now finalizing your purchase. Please wait.`,
          allowOutsideClick: false,
          onOpen: () => {
            swal2.showLoading()
          }
        })

        this._member.confirmPayment(data).subscribe(res => {
          swal2.close();
          
          if (res.code == 200) {
             swal2({
              title: `<h1><strong>${res.data.code}</strong></h1>`,
              text: 'This is your voucher code. Please always keep a copy of this to use it later.',
              type: 'success',
              allowOutsideClick : false,
              allowEnterKey : false,
              allowEscapeKey : false
            }).then((result) => {
              this._router.navigate(['/task'])
            })

            // this._auth.refreshToken().subscribe(res => {
            //   if (res.code == 200) {
            //     sessionStorage.removeItem('token')

            //     sessionStorage.setItem('token', res.data);

            //     if (localStorage.getItem('token')){
            //       localStorage.removeItem('token')
            //       localStorage.setItem('token', res.data);
            //     }
            //     else{
            //       localStorage.removeItem('token$');
            //       localStorage.setItem('token$', res.data + '@' + Date.now())
            //     }
                
            //     // this._router.navigate(['/task'])
            //   }
            // })


            location.go('/')
            // let membership = sessionStorage.getItem('memb')
            // sessionStorage.removeItem('memb')
            // if (membership) {
              
            //   this._router.navigate(['/auth/purchase/thankyou'], {queryParams : {token : membership}})

            // }

            // this.openMemberhipDetailDialog(membership)
            // swal2({
            //   title: membership.title + ' Successful!',
            //   text: `You are now a ${membership.slug} member!`,
            //   type: 'success'
            // })

          }

        }, (err) => {
         
          swal2.close();
          swal2({
            title: 'Kryptonia error!',
            text: `Kryptonia failed to finalize your purchase. Reload page to try again or contact support`,
            type: 'error'
          })
        })
      }
    })
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  openMemberhipDetailDialog(membership) {
    const dialogRef = this._matDialog.open(MembershipDetailComponent, {
      width: '600px',
      data : membership
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    // this.carouselTileItems = this.dataSource;
    this.carouselTile = {
      grid: { xs: 2, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      loop: true,
      interval: 6000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

    this.carouselTile = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      loop: true,
      interval: 6000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

  }

  newlyRegistered() {
    let data = {
      range: 'week'
    }
    this._landing.requestCountNewlyRegistered(data).subscribe(res => {
      this.countNewlyRegistered = res['data']
    })
  }
  business() {
    let data = {
      offset: 0
    }
    this._landing.requestBusiness(data).subscribe(res => {
      this.businessData = this._global.parseJwt(res['data'])
      this.businessData = this.businessData.list
    })
  }
  topBloggers() {
    this.topBlogger = [];
    let data = {
      limit: 1
    }
    this._landing.requestTopBloggers(data).subscribe(res => {
      const decodedData = this._global.parseJwt(res['data'])
      if(decodedData.length > 0){
        this.topBlogger = decodedData[0]
        this.topBlogger_id = decodedData[0].user_id;
        this.topBloggerPoints = decodedData[0].total_blog_points;
        this.topBloggerName = decodedData[0].name;
        this.topBlogger_username = decodedData[0].username
      }
      
    })
  }
  testimonials() {
    this.testimonialsList = [];
    let data = {
      offset: 0
    }
    this._landing.requestTestimonials(data).subscribe(res => {
      const decodedData = this._global.parseJwt(res['data']);
      this.testimonialsList = decodedData.list;
    })
  }

  featuredTaskCreator() {
    // this.featuredTaskCreatorList = [];

    this._landing.requestFeaturedTaskCreator().subscribe(res => {
      const decodedData = this._global.parseJwt(res['data'])

      this.featuredTaskCreatorList = decodedData.list;
    })
  }

  navigateRoute(value): void {
    setTimeout(() => {
      this.router.navigate([value]);
      // location.reload();
    }, 200);
  }

  navigateRoute2(value): void {
    const val = '/others/profile/' + value
    window.location.href = val;
  }
  navigateRegister() {
    this.router.navigate(['/auth/register']);
    setTimeout(() => {
      // location.reload();
    }, 200);
    localStorage.setItem('setEmail', this.regEmail);
  }
  setNav() {
    location.reload();
  }



  nav() {
    if (this.showFiller) {
      this.showFiller = false
      return false;
    }
    this.showFiller = true;
  }

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



