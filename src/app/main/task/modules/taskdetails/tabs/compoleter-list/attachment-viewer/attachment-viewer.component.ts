import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrls: ['./attachment-viewer.component.scss']
})
export class AttachmentViewerComponent implements OnInit {
  url : string = null;
  constructor( @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<AttachmentViewerComponent>) {
    this.url = data;
  }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close()
  }
}
