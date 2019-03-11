import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigatetoBlogArticle(blog_tag,metadata,username){
    const url = "//kblog.io/article/"+blog_tag+"/"+username+"/"+metadata;
    window.open(url, "_blank");
  }

  navigatetoBloggerProfile(username){
    const url = "//kblog.io/"+username+"/profile/content/timeline";
    window.open(url, "_blank");
  }

}
