import { HeaderBitcoinDataService } from './header-bitcoin-data.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-header-bitcoin-data',
  templateUrl: './header-bitcoin-data.component.html',
  styleUrls: ['./header-bitcoin-data.component.scss'], 
  animations: fuseAnimations
})
export class HeaderBitcoinDataComponent implements OnInit {
  
  isLoading: boolean;
  userInfo: any = {};
  wallet_balance : any;
  sending : any;
  receiving : any;
  address : any;
  decodedData : any;
  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _btc: HeaderBitcoinDataService) {
    this.userInfo = this._auth.userInfo;
  }

  ngOnInit() {
    this.isLoading = false;
    let data = {
      user_id : this.userInfo.user_id
    }
    this._btc.postBtcInfo(data).subscribe(res => {
      if(res.data == null){
        this.wallet_balance = 0;
        this.sending = 0;
        this.receiving = 0;
        this.address = null;
      }else{
        this.decodedData = this._globals.parseJwt(res.data);
        this.wallet_balance = this.decodedData['wallet_balance'];
        this.sending = this.decodedData['sending'];
        this.receiving = this.decodedData['receiving'];
        this.address = this.decodedData['address'];
      }
    })
  }
  refreshDataBank(): void{
    this.isLoading = true;
    this.decodedData = {} ;
    this.ngOnInit();
  }
  resync(){
    let data = {
      user_id : this.userInfo.user_id
    }
    this._btc.postResyncWallet(data).subscribe(res => {
      if(res['code'] == 200){
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          dangerMode: true,
        });
        this.refreshDataBank();
      }else{
        swal({
          title: "Failed",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }
    })
  }

  generateWallet(){
    let data = {
      user_id : this.userInfo.user_id,
      wallet_label : this.userInfo.email
    }
    this._btc.postGenerateBtcWallet(data).subscribe(res => {
    })
  }
  copyData(type: string, codes: string){
    const message = this.alertType().messageType[`${type}`];
    swal({
      title: "Copied",
      text: message,
      icon: "success",
      dangerMode: true,
    });
    this.copyCommand(codes);

  }

  
  copyCommand(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }

  alertType(){
    return {
      messageType: {
        code: 'Address has copied!',
        link: 'Links has copied!'
      },

    }
  }

}
