import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sign-up-reward',
  templateUrl: './sign-up-reward.component.html',
  styleUrls: ['./sign-up-reward.component.scss']
})
export class SignUpRewardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpRewardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
