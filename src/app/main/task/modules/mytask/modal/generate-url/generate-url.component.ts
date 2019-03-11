import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-generate-url',
  templateUrl: './generate-url.component.html',
  styleUrls: ['./generate-url.component.scss']
})
export class GenerateUrlComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GenerateUrlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyData(type: string, codes: string) {
    const message = this.alertType().messageType[`${type}`];
    swal({
      title: "Copied",
      text: message,
      icon: "success",
      dangerMode: true,
    });
    
    this.copyCommand(codes);

  }

  copyCommand(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }
  alertType() {
    return {
      messageType: {
        code: 'Code has copied!',
        link: 'Links has copied!'
      },

    }
  }

}
