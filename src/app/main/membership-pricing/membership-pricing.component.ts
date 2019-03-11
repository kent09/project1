import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MEMBERSHIP, GlobalsService } from 'app/globals/globals.service';
import { Router } from '@angular/router';
import swal2 from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../login/auth/auth.service';
import { ConfirmComponent } from '../logout-confirm/confirm';
import { MatDialog } from '@angular/material';
import { MembershipPricingService } from '../membership-pricing/membership-pricing.service';

@Component({
  selector: 'app-membership-pricing',
  templateUrl: './membership-pricing.component.html',
  styleUrls: ['./membership-pricing.component.scss'],
  animations: fuseAnimations,
})
export class MembershipPricingComponent implements OnInit {

  slidedown: string;
  showFiller: boolean = false;
  myUserInfo: any;
  dialogRef: any;
  silverAmount : any = 0;
  goldAmount : any = 0;
  platinumAmount : any = 0;
  foundersAmount : any = 0;
  origSilverAmount : any = 0;
  origGoldAmount : any = 0;
  origPlatinumAmount : any = 0;
  origFoundersAmount : any = 0;
  


// 100 Free Tasks					
// Unlimited Task Creation					
// 100% Voting Weight					
// Steemit Voting Calc					
// 2D Rewards on Hold					
// 1% Task Fee Charge					
// Reputation Score Renewal					
// Gift Membership					
// Earn 5% Referrer Membership Fee Percentager					
// Featured Task Creator					
// Featured Blogger					
// All task requirements

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
    'Withdrawal Limit Per Day',
    'Gift Coin Limit Per Day',
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
    false, // attachment req,
    "25K", // withdrawal limit per day
    "25K", // gift coin limit per day 
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
    '200K', // withdrawal limit per day
    '200K', // gift limit per day
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
    '600K', // withdrawal limit per day
    '600K', // gift limit per day
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
    '1M', // withdrawal limit per day
    '1M', // gift limit per day
    'Yearly' // duration
  ];

  founder = [
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
    'Unlimited', // withdrawal limit per day
    'Unlimited', // gift limit per day
    'Lifetime'
  ];

  description = [
    'A gift from the platform. Every paid member is entitled to receive this. The paid member can choose this task requirement option to run his/her task as task budget. The default reward is 100 SUP.', // free tasks
    'There is a limit to create a task per day but unlimited task completion.', // task creation per day
    'The voting weight is the basis of Kryptonia Steemit Bot Upvote on how much percentage the user will get on his/her Steemit posts.', // voting weight
    'The Steemit Weight Calculator is a tool where the user sees the equivalent of his/her task budget in SBD (Steem Dollars) but the result may differ depending on the current market prices. *CMC price', // steemit calc
    'The reward earned from completing a task will be available 2-14 days after completion date. Days on hold depends on membership level.', // reward hold
    'The platform will charge the task creator for every task created with minimum percentage based on the membership type. (Note: The collected Task Fee Charge will go back to the platform and distribute that as a Free Task).', // task fee charge
    'For every paid member is entitled the Reputation Score replenishes every month. For those who have the lowest reputation score and could not complete a task because some of the task creators set a specific task reputation score requirement. Now we have come up with the solution.', // reputaion renewal
    'The gift membership option is only available for Gold and higher membership levels. They can buy any type of membership. The bought membership will be a gift voucher where they can upgrade the other user.', // gift membership
    'The referrer receives a percentage of task completion reward from each referral.', // referral task points
    'The referrer receives a percentage for every successful paid referral.', // referral membership
    'Gold members and above will be featured as a task creator on the homepage of Kryptonia', // feature task creator
    'Gold members and above will be featured as a blogger on the homepage of Kryptonia', // featured bloger
    'The task creator can choose this option to filter out his/her completers with a given score range during the task creation. If you do not meet the requirement set by the task creator you wont be able to complete the task.', // reputaion req
    'The task creator can choose this option to only allow his followers. The task will only be visible to task creators followers.', // follower req
    'The task creator can choose this option to require his/her completers to attach screenshot before the task is completed. To make sure that his/her completers follow his task details and the task creator can revoke his completer if they do not follow task details.', // attachment req
    'Our membership duration consists of Monthly, Annually, or Lifetime.' // duration
  ];
  
  user : any;
  constructor(
    private _fuseConfigService: FuseConfigService, 
    private router : Router, 
    private _global : GlobalsService,
    private _auth: AuthService,
    private _pricing : MembershipPricingService,
    public _matDialog: MatDialog,
    ) {
      this.myUserInfo = this._auth.userInfo;
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
    this.user = sessionStorage.getItem('token');
    this.user = (this.user) ? this._global.parseJwt(this.user).data : null;
    
  }

  ngOnInit() {
    this.finalPrice();
  }

  finalPrice(){

    let data = {limit : 1};
    this._pricing.getMembershipPricing(data).
      subscribe(response => {
        const prices = this._global.parseJwt(response.data);

        if(response.code == 200){
          let samount = prices[1]['final_price'];
          this.origSilverAmount = prices[1]['amount'];
          this.silverAmount = samount;

          let gamount = prices[2]['final_price'];
          this.origGoldAmount = prices[2]['amount'];
          this.goldAmount = gamount;

          let pamount = prices[3]['final_price'];
          this.origPlatinumAmount = prices[3]['amount'];
          this.platinumAmount = pamount;
      
          let famount = prices[4]['final_price'];
          this.origFoundersAmount = prices[4]['amount'];
          this.foundersAmount = famount;
        }

      });
  }


  buy(index : number){
    let item = MEMBERSHIP[index];
    
    if(!this.user){
      this.router.navigate(['/auth/login'])
    }

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
            this.router.navigate(['/others/account-settings/membership-billing']);
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
            this.router.navigate(['/others/account-settings/membership-billing']);
          }, 200);      
        }
      })
    }
    else{
      setTimeout(() => {
        sessionStorage.setItem('memb', this._global.encryptAES(JSON.stringify(item)));
        this.router.navigate(['/others/account-settings/membership-billing']);
      }, 200); 
    }
  }

  nav() {
    if (this.showFiller) {
      this.showFiller = false
      return false;
    }
    this.showFiller = true;
  }

  navigateRoute(value): void {
    setTimeout(() => {
      this.router.navigate([value]);
      // location.reload();
    }, 200);
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

  getPerk(data) {
    if(this.slidedown == data) {
      this.slidedown = null;
    } else {
      this.slidedown = data;
    }
  }
}
