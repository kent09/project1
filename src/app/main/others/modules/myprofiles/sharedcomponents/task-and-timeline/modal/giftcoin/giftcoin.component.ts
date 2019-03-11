import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCoinService } from 'app/main/others/modules/myprofiles/sharedcomponents/task-and-timeline/modal/giftcoin/giftcoin.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-giftcoin',
  templateUrl: './giftcoin.component.html',
  styleUrls: ['./giftcoin.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class GiftcoinProfileComponent implements OnInit {
  issending : boolean = false;
  createTaskForm: FormGroup;
  giftInfo: any;
  isSavingTask: boolean = false;

  /**
      * Constructor
      *
      * @param {MatDialogRef<GiftcoinComponent>} matDialogRef
      * @param _data
      * @param {FormBuilder} _formBuilder
      */
  constructor(
    public matDialogRef: MatDialogRef<GiftcoinProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _gifCoin: GiftCoinService
  ) {
    
  }

  ngOnInit(): void {
    this.createTaskForm = this._formBuilder.group({
      amount: ['', Validators.required],
      memo: [''],
    });
  }
  sendGiftCoin() {
    const formValues = this.createTaskForm.value;
    if(!formValues.amount){
      swal('Oops...', 'Amount (SUP Coin) is required!', 'error');
      return;
    }

    let uid = this._data.task === undefined ? this._data.user_id : this._data.task.user_id;

    this.giftInfo = {
      gift_coin: formValues.amount,
      gift_memo: formValues.memo,
      gift_recipient_id : uid,
    };
    this.isSavingTask = true;
    this.issending = true;
    this._gifCoin.requestPostGiftCoin(this.giftInfo).
      subscribe(response => {
        this.gifCoinMessage(response);
        this.isSavingTask = false;
        this.issending = false;
      },(err) => {
        this.issending = false;
      });
  }

  gifCoinMessage(statusType) {
    if (statusType.status === 'error' || statusType.code ===  400) {
      swal('Oops...', statusType.message, 'error');
    }else {
      swal(statusType.status, statusType.message, 'success');
      // this.setTimer();
    } 
    this.matDialogRef.close(true);

  }

}


