import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiftCoinService } from 'app/main/task/modules/taskdetails/modals/giftcoin/giftcoin.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-giftcoin',
  templateUrl: './giftcoin.component.html',
  styleUrls: ['./giftcoin.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class GiftcoinComponent implements OnInit {

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
    public matDialogRef: MatDialogRef<GiftcoinComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
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

    this.giftInfo = {
      gift_coin: formValues.amount,
      gift_memo: formValues.memo,
      gift_recipient_id : this._data.task.user_id,
    };
    this.isSavingTask = true;
    this._gifCoin.requestPostGiftCoin(this.giftInfo).
      subscribe(response => {
        this.gifCoinMessage(response);
        this.isSavingTask = false;
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


