import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-referral-social',
  templateUrl: './referral-social.component.html',
  styleUrls: ['./referral-social.component.scss']
})
export class ReferralSocialComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReferralSocialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
