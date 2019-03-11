import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { CheckoutComponent } from './modals/checkout/checkout.component';
import { GlobalsService } from 'app/globals/globals.service';
import swal2 from 'sweetalert2';
import { AuthService } from 'app/main/login/auth/auth.service';
import { MEMBERSHIP } from '../../../../../../globals/globals.service';

@Component({
  selector: 'app-tab-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class UserVerificationTabsComponent implements OnInit {


  founder: boolean = false;
  user: any = null;
  mship: any = {
    bronze: false,
    silver: false,
    gold: false,
    platinnum: false,
    founder: false
  }
  slidedown: string;

  prices = MEMBERSHIP;

  perkList = [
    'Free Tasks',
    'Task Creation Per Day',
    'Voting Weight',
    'Steemit Voting Calculator',
    'Rewards on Hold',
    'Task Fee Charge',
    'Reputation Score Renewal',
    'Gift Membership',
    'Referral Task Points',
    'Membership Referral Fee Percentage',
    'Featured Task Creator',
    'Featured Blogger',
    'Reputation & Activity Score Task Requirement',
    'Follower Only Task Requirement',
    'Attachment required Task Requirement',
    'Duration'
  ];

  bronze = [
    false, // free tasks
    4, // task creation per day
    '25%', // voting weight
    false, // steemit calc
    '14 Days', // reward hold
    '5%', // task fee charge
    false, // reputaion renewal
    false, // gift membership
    '0.50%', // referral task point,
    '0.50%', // referral membership
    false, // feature task creator
    false, // featured bloger
    false, // reputaion req
    false, // follower req
    false, // attachment req
    'Monthly' // duration
  ];
  
  silver = [
    25, // free tasks
    10, // task creation per day
    '50%', // voting weight
    true, // steemit calc
    '7 Days', // reward hold
    '3%', // task fee charge
    true, // reputaion renewal
    false, // gift membership
    '1%', // referral task points
    '2%', // referral membership
    false, // feature task creator
    false, // featured bloger
    false, // reputaion req
    true, // follower req
    true, // attachment req,
    'Monthly' // duration
  ];

  gold = [
    50, // free tasks
    20, // task creation per day
    '75%', // voting weight
    true, // steemit calc
    '4 Days', // reward hold
    '2%', // task fee charge
    true, // reputaion renewal
    true, // gift membership
    '1.5%', // referral task points
    '3%', // referral membership
    true, // feature task creator
    true, // featured bloger
    true, // reputaion req
    true, // follower req
    true, // attachment req
    'Monthly' // duration
  ];
  platinum = [
    100, // free tasks
    'Unlimited', // task creation per day
    '100%', // voting weight
    true, // steemit calc
    '2 Days', // reward hold
    '1%', // task fee charge
    true, // reputaion renewal
    true, // gift membership
    '2%', // referral task points
    '5%', // referral membership
    true, // feature task creator
    true, // featured bloger
    true, // reputaion req
    true, // follower req
    true, // attachment req
    'Monthly' // duration
  ];

  founders = [
    1000, // free tasks
    'Unlimited', // task creation per day
    '100%', // voting weight
    true, // steemit calc
    '2 Days', // reward hold
    '1%', // task fee charge
    true, // reputaion renewal
    true, // gift membership
    '2%', // referral task points
    '5%', // referral membership
    true, // feature task creator
    true, // featured bloger
    true, // reputaion req
    true, // follower req
    true, // attachment req
    'Lifetime'
  ];


  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _global: GlobalsService,
    private _auth : AuthService
  ) {
  
    this.user = this._auth.userInfo;
    if (this.user) {
      this.prices.forEach(element => {
        if (element.slug === this.user.membership) {
          element.button = 'CURRENT PLAN';
        }
        else {
          element.button = 'SUBSCRIBE';
        }
      });
    }
  }
  ngOnInit() {

  }

  navigateLogin(item): void {
    sessionStorage.setItem('memb', this._global.encryptAES(JSON.stringify(item)));
    this._router.navigate(['/others/account-settings/membership-billing']);
  }


  openDialog() {
    this.dialog.open(CheckoutComponent);
  }
  entermouse(ev) {
    this.mship[ev] = true;

  }
  leavemouse(ev) {
    this.mship[ev] = false;
  }

  buy(index : number){
    let item = MEMBERSHIP[index];
    
    if (item.slug === this.user.membership) {
      swal2({
        title: 'Hold up!',
        html: `You are currently enrolled in <strong>${this.user.membership.toUpperCase()} MEMBERSHIP </strong>. This will extend your current membership plan. Continue?`,
        showCancelButton: true,
        type : 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Extend it!'
      }).then((result) => {
        if (result.value) {
          setTimeout(() => {
            sessionStorage.setItem('memb', this._global.encryptAES(JSON.stringify(item)));
            this._router.navigate(['/others/account-settings/membership-billing']);
          }, 200);      
        }
      })
    }
    else if(item.slug !== this.user.membership && this.user.membership !== 'bronze'){
      
      swal2({
        title: 'Hold up!',
        html: `Are you sure you want to purchase <strong>${item.slug.toUpperCase()} MEMBERSHIP</strong> ? This will cancel your current <strong>${this.user.membership.toUpperCase()} MEMBERSHIP</strong> plan. Continue?`,
        showCancelButton: true,
        type : 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Purhcase it!'
      }).then((result) => {
        if (result.value) {
          setTimeout(() => {
            sessionStorage.setItem('memb', this._global.encryptAES(JSON.stringify(item)));
            this._router.navigate(['/others/account-settings/membership-billing']);
          }, 200);      
        }
      })
    }
    else{
      setTimeout(() => {
        sessionStorage.setItem('memb', this._global.encryptAES(JSON.stringify(item)));
        this._router.navigate(['/others/account-settings/membership-billing']);
      }, 200); 
    }
  }

  getPerk(data) {
    if(this.slidedown == data) {
      this.slidedown = null;
    } else {
      this.slidedown = data;
    }
  }

}
