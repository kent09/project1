import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-mem-details',
  templateUrl: './mem-details.component.html',
  styleUrls: ['./mem-details.component.scss']
})
export class MemDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
