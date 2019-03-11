import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

@Component({
  selector: 'app-referral-points',
  templateUrl: './referral-points.component.html',
  styleUrls: ['./referral-points.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReferralPointsComponent implements OnInit {

  taskPoints: TabsBank[] = [
    { value: 't-points', viewValue: 'Task Points' },
    { value: 't-referral', viewValue: 'Referral' },
  ];

  referral: TabsBank[] = [
    { value: 'sign-up-reward', viewValue: 'Default Sign up Reward' },
    { value: 'social-referrals', viewValue: 'Referral Social' }, 
  ];

  directReferral: TabsBank[] = [
    { value: 'd-levelReferral', viewValue: 'Direct Level Referral' },
    { value: 'd-secondReferral', viewValue: '2nd Level Referral' },
    { value: 'd-thirdReferral', viewValue: '3rd Level Referral' }
  ];

  selectedTaskPoints = 't-points';
  selectedReferral = 'd-levelReferral';
  selectedSignReferral = 'sign-up-reward';


  constructor(
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  ngOnInit() {
  }

  mainChanges(data: any){
    this.selectedReferral = 'd-levelReferral';
  }
}
export interface TabsBank {
  value: string;
  viewValue: string;
}




