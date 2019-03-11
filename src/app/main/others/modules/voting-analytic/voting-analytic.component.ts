import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from 'app/main/others/modules/voting-analytic/voting-analytic.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';



@Component({
  selector: 'app-voting-analytic',
  templateUrl: './voting-analytic.component.html',
  styleUrls: ['./voting-analytic.component.scss']
})
export class VotingAnalyticComponent implements OnInit {

  displayedColumns: string[] = ['voters', 'votingvalue'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    widgets: any;
    poll_data : any = null;
    pollChart : any = {
        datasets : null
    };
    dataSet : any;
    chartType : any;
    option_desc : any;
    option_votes : any;
    temp :  any[] = [];
    temp1 :  any[] = [];
    dataSource : any;
    counterPage: number = 0;
    pageIndex: number = 0;
  /**
   * Constructor
   *
   * @param {AnalyticsService} _analyticsService
   */
  constructor(
      private _analyticsService: AnalyticsService,
      private _httpClient: HttpClient,
      private _globals: GlobalsService,
      private _auth: AuthService,
      private actvRoute :ActivatedRoute

  )
  {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit()
  {
    
    let getUrl = this.actvRoute['_routerState']['snapshot']['url'].split("/")
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    let data = {
      poll_id : getUrl[3],
      limit : getUrl[4]
    }
    let popo = 0;
    this._analyticsService.getVotingPollDetails(data).subscribe(res2 => {

      if(res2['data'] != null){
        this.poll_data = this._globals.parseJwt(res2['data']);
       
        let list = this.poll_data['voter_list']
       
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.paginator = this.paginator;
        this.dataSet = this.poll_data['voting_data']
        let poll = 0;
       this.dataSet.forEach(element => {
         this.option_desc = element['option_desc']
         this.option_votes = element['option_votes']
         this.temp.push(this.option_desc);
         this.temp1.push(this.option_votes)
            
       });
       
        this.chartType = 'bar';

        this.pollChart = {
  
            chartType : 'bar',
            datasets  : [
                {
                    data : this.temp1
                }
            ],
            labels    : this.temp,
            colors    : [
                {
                    borderColor    : '#42a5f5',
                    backgroundColor: '#42a5f5'
                }
            ],
            options   : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                layout             : {
                    padding: {
                        top   : 24,
                        left  : 16,
                        right : 16,
                        bottom: 16
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            display: false,
                            ticks  : {
                                min: 1
                            }
                        }
                    ]
                }
            }
        }

      }
    })
  }

 
}

