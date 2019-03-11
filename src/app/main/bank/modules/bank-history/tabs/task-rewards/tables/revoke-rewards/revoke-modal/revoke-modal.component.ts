import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-revoke-modal',
  templateUrl: './revoke-modal.component.html',
  styleUrls: ['./revoke-modal.component.scss']
})
export class RevokeModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RevokeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
