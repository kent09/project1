import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

@Component({
  selector: 'app-superior-coin',
  templateUrl: './superior-coin.component.html',
  styleUrls: ['./superior-coin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SuperiorCoinComponent implements OnInit {

  tabBank: TabsBank[] = [
    { value: 'd-0', viewValue: 'Deposit' },
    { value: 'w-1', viewValue: 'Withdrawal' },
    { value: 'c-2', viewValue: 'Coin Ledger' }
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



