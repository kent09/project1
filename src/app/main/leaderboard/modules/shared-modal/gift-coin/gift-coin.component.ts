import { GlobalsService } from './../../../../../globals/globals.service';
import { GiftCoinService } from './../../../../task/modules/taskdetails/modals/giftcoin/giftcoin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import swal from 'sweetalert';
@Component({
  selector: 'app-gift-coin',
  templateUrl: './gift-coin.component.html',
  styleUrls: ['./gift-coin.component.scss']
})
export class GiftCoinComponent implements OnInit {
  amount : any;
  memo : any;

  constructor(public dialogRef: MatDialogRef<GiftCoinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _gift : GiftCoinService,
    public _globals : GlobalsService) { }

  ngOnInit() {
  }

  submit(): void {
    let data = {
      gift_coin : this.amount,
      gift_memo : this.memo,
      gift_recipient_id : this.data.user
    }
    this._gift.requestPostGiftCoin(data).subscribe(res =>{
      if(res['code'] == 200){
        swal({
          title: "Success",
          text: res.message,
          icon: "success",
          dangerMode: true,
        });
      }else{
        swal({
          title: "Error",
          text: res.message,
          icon: "error",
          dangerMode: true,
        });
      }
    })
  }

}
