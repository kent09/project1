import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-completion-modal',
  templateUrl: './completion-modal.component.html',
  styleUrls: ['./completion-modal.component.scss']
})
export class CompletionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompletionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }

}
