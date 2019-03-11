import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';
import { MainSearchService } from 'app/main/others/modules/main-search/main-search.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GlobalsService } from '../../../../globals/globals.service';
import { PageEvent,MatPaginator } from '@angular/material';


@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit, OnDestroy
{   
    @ViewChild(MatPaginator) paginator: MatPaginator

    data : any = {
        count : 0,
        data : []
    };
    searchkey = null;
    pageSize = 15;
    pageEvent : PageEvent;

    offset : number = 0;
    limit : number = 15;

    classic: any;
    loading : boolean = false;
    navigationSubscription : any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MainSearchService} _searchService
     */
    constructor(
        private _searchService: MainSearchService,
        private actvRoute : ActivatedRoute,
        private _globals : GlobalsService,
        private router : Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
              this.offset =0;
              
              if(this.paginator)
                this.paginator._pageIndex = 0;

              this.loadSearchResult(this.offset, this.limit);
            }
          });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       
        this._searchService.classicOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(classic => {
                this.classic = classic;
            });
       

    }

    loadSearchResult(offset, limit){
        this.actvRoute.params.subscribe((res:any) => {
            if(res.search_key){
               
                this.searchkey = res.search_key;
                
                let params = {
                    search_key : decodeURI(res.search_key),
                    offset : offset,
                    limit : limit
                }
                this.loading = true;
                this._searchService.requestSearchMemberResponse(params).subscribe((res2:any) => {
                    this.loading = false;
                    if(res2.code == 201){
                       
                            this.data = this._globals.parseJwt(res2.data)
                       
                    }
                    else {
                        this.data = {
                            count : 0,
                            data : []
                        };
                    }
                },(err) => {
                    this.loading = false;
                })
                
            }
        })
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onPaginateChange(ev){
        this.offset += this.limit;
        this.loadSearchResult(this.offset, this.limit)
    }
}
