import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MembershipComponent implements OnInit {

  tabBank: TabsBank[] = [
    { value: 'd-0', viewValue: 'Main' },
    { value: 'w-1', viewValue: 'Withdrawal' },
    { value: 'c-2', viewValue: 'Billing' }
  ];
  selected = 'd-0';


  constructor(
    private _globals: GlobalsService,
    private _auth: AuthService) { }

  ngOnInit() {
  }
}
export interface TabsBank {
  value: string;
  viewValue: string;
}



