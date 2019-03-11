import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { COINLIST } from 'app/globals/coinlist';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CoinSalesService } from '../coin-sales.service';


@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['../coin-sales.component.scss', './processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  coinValue: any;
  myUserInfo: any;
  config: any;
  coins = COINLIST;
  selectedCoins: any = {coin: 'btc', icon : 'BTC-alt', name: 'bitcoin'};
  amount: number;
  showCoin: boolean = false;
  copied: string = "copy";
  isEditable: boolean = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _auth: AuthService,
    private _coinservice: CoinSalesService,
    private _formBuilder: FormBuilder) { 

    this.myUserInfo = this._auth.userInfo;
    this.coinValue = JSON.parse(localStorage.getItem('coin_process'));

  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    if(this.coinValue != null) {
      this.selectedCoins = this.coinValue[1];
      this.firstFormGroup.patchValue({firstCtrl: this.coinValue[0]});
      localStorage.removeItem('coin_process');
    }
    
  }

  onSelect(data): void {
    this.selectedCoins = data;
    this.showCoin = false;
  }

  copy() {
    this.copied = 'copied';
  }

}
