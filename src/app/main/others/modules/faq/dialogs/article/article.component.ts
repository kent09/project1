import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  /**
     * Constructor
     *
     * @param {MatDialogRef<ArticleComponent>} matDialogRef
     * @param _data
     */

    constructor(public matDialogRef: MatDialogRef<ArticleComponent>,
       @Inject(MAT_DIALOG_DATA) public _data: any)
  {
  }

  ngOnInit()
  {
     
  }

}
