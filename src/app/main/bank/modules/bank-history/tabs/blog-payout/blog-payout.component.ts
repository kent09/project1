import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { BLOGPAYOUT_API , BlogPayoutService } from 'app/main/bank/modules/bank-history/tabs/blog-payout/blog-payout.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-blog-payout',
  templateUrl: './blog-payout.component.html',
  styleUrls: ['./blog-payout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BlogPayoutComponent implements OnInit {

  displayedColumns = ['blogger', 'blog_title', 'sup', 'claimed_date', 'option'];
  exampleDatabase: BlogPayoutService | null;
  data: BLOGPAYOUT_API[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  no_record = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _dialog: MatDialog,
    private _auth: AuthService) { }

  ngOnInit() {

    this.exampleDatabase = new BlogPayoutService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getBlogPayout(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          if(data.code == 200){
            const decodedData = this._globals.parseJwt(data.data);
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = decodedData.count;
            return ('list' in decodedData ) ? decodedData.list : decodedData;
          }else{
            this.no_record = "No records found!";
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
          }
         
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data});
  }

  navigatetoBlogArticle(blog_tag,metadata,username){
    const url = "//kblog.io/article/"+blog_tag+"/@"+username+"/"+metadata;
    window.open(url, "_blank");
  }

  navigatetoBloggerProfile(username){
    const url = "//kblog.io/@"+username+"/profile/content/timeline";
    window.open(url, "_blank");
  }

  openDialog(detail): void {
    const dialogRef = this._dialog.open(ModalComponent, {
      data: detail
    });

  }
}



