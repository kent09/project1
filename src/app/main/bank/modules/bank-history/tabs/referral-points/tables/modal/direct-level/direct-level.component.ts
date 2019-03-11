import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-direct-level',
  templateUrl: './direct-level.component.html',
  styleUrls: ['./direct-level.component.scss']
})
export class DirectLevelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DirectLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
