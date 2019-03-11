import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

@Component({
  selector: 'app-option-trade',
  templateUrl: './option-trade.component.html',
  styleUrls: ['./option-trade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class OptionTradeComponent implements OnInit {

  optionTrade: TabsBank[] = [
    { value: 'optionTradeDeposit', viewValue: 'Deposit' },
    { value: 'optionTradeRewards', viewValue: 'Withdrawal' },
  ];
  selectedOptionTrade = 'optionTradeDeposit';


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



