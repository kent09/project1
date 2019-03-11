import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-payout-history',
  templateUrl: './payout-history.component.html',
  styleUrls: ['./payout-history.component.scss']
})
export class PayoutHistoryComponent implements OnInit {
  history: any;
  constructor( public dialogRef: MatDialogRef<PayoutHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.history = this.data.history;
  }
}
