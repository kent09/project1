import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material';
;
import {
  MatDialog, MatDialogRef,
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from '../login/auth/auth.service';
import { ConfirmComponent } from '../logout-confirm/confirm';
import { COINLIST } from 'app/globals/coinlist';

@Component({
  selector: 'app-coin-sales',
  templateUrl: './coin-sales.component.html',
  styleUrls: ['./coin-sales.component.scss'],
  animations: fuseAnimations
})
export class CoinSalesComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;
  myUserInfo: any;
  user : any;
  showFiller: boolean = false;
  dialogRef: any;
  showCoin: boolean = false;
  selectedCoins: any = {coin: 'btc', icon : 'BTC-alt', name: 'bitcoin'};
  amount: number = 0.0000;

  coins = COINLIST;

  defaultCoin = new FormControl('BTC');

  constructor 
  (
    private _fuseConfigService: FuseConfigService, 
    private router : Router, 
    private _global : GlobalsService,
    private _auth: AuthService,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
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

  onSelect(data): void {
    this.selectedCoins = data;
    this.showCoin = false;
  }

  process() {
    let value = [this.amount, this.selectedCoins];
    localStorage.setItem('coin_process', JSON.stringify(value));
    this.router.navigate(['/coin/sales/processing']);
  }




  coinSales(stepper: MatStepper) {}
}