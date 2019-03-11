import { VotingActiveService } from './voting-active.service';
import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { PollChoicesComponent } from './poll-choices/poll-choices.component';

@Component({
  selector: 'app-voting-active',
  templateUrl: './voting-active.component.html',
  styleUrls: ['./voting-active.component.scss']
})

export class VotingActiveComponent implements OnInit {
  poll_list : any;
  dataSource : any;
  searchText : any;
  constructor(
    private _httpClient: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _actv_poll : VotingActiveService,
    private dialog : MatDialog) {

      let data = {
        status : 'active'
      }
      this._actv_poll.getVotingPollList(data).subscribe(res2 => {
        if(res2['data'] != null){
          this.poll_list = this._globals.parseJwt(res2['data']);
        
        }
        this.dataSource = new MatTableDataSource(this.poll_list);
        this.dataSource.paginator = this.paginator;
      })
      
  }


   displayedColumns: string[] = ['items', 'voters', 'start_date', 'end_date', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {

  }
  
  openModal(poll){
    this.dialog.open(PollChoicesComponent,{data : poll.options})
  }

  search(key){
    let data = {
      status : 'ended',
      search_key : key
    }
    this._actv_poll.getVotingPollList(data).subscribe(res2 => {
      if(res2['data'] != null){
        this.poll_list = this._globals.parseJwt(res2['data']);
      }
      this.dataSource = new MatTableDataSource(this.poll_list);
      this.dataSource.paginator = this.paginator;
    })
  }

}


export interface filterRange {
  value: string;
  viewValue: string;
}

export class SelectOverviewExample {
  range: filterRange[] = [
    {value: 'Weekly Top 10', viewValue: 'Weekly Top 10'},
    {value: 'Monthly 20', viewValue: 'Monthly 20'},
    {value: 'All Time 100', viewValue: 'All Time 100'}
  ];
}