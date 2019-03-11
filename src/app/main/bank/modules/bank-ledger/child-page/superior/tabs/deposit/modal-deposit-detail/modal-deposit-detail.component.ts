import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-deposit-detail',
  templateUrl: './modal-deposit-detail.component.html',
  styleUrls: ['./modal-deposit-detail.component.scss']
})
export class ModalDepositDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDepositDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
