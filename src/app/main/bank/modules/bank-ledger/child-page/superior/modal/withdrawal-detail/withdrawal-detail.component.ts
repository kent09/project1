import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-withdrawal-detail',
  templateUrl: './withdrawal-detail.component.html',
  styleUrls: ['./withdrawal-detail.component.scss']
})
export class WithdrawalDetailComponent implements OnInit {
  data : any;
  constructor(public dialogRef: MatDialogRef<WithdrawalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public modaldata: any) {

    }

  ngOnInit() {
    this.data = this.modaldata;
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
