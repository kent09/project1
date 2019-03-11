import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';

@Component({
  selector: 'app-bonus-social',
  templateUrl: './bonus-social.component.html',
  styleUrls: ['./bonus-social.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class BonusCoinsComponent implements OnInit {

  bonusCoin: TabsBank[] = [
    { value: 'monthly', viewValue: 'Monthly Bonus Coins' },
    { value: 'socialconnect', viewValue: 'Social Connect' },
  ];

  selectedBonus= 'monthly';


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



