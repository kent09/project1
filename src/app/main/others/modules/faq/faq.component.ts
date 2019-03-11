import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FaqService } from "app/main/others/modules/faq/faq.service";
import { ArticleComponent } from './dialogs/article/article.component';
import { GlobalsService } from '../../../../globals/globals.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit, OnDestroy {

  knowledgeBase: any;
  decodedData : any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {KnowledgeBaseService} _knowledgeBaseService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _knowledgeBaseService: FaqService,
      private _matDialog: MatDialog,
      private _global : GlobalsService
  )
  {
      // Set the private defaults
    //   this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit()
  {

    let data = {
        limit: 5
    }
    this._knowledgeBaseService.requestFaq(data).subscribe(res => {
        this.decodedData = this._global.parseJwt(res.data)
        this.decodedData = this.decodedData.list

    })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Read article
   *
   * @param article
   */
  readArticle(article): void
  {
      this._matDialog.open(ArticleComponent, {
          panelClass: 'knowledgebase-article-dialog',
          data      : {article: article}
      });
  }
}
