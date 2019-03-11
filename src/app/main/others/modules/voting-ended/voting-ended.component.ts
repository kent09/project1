import { VotingEndService } from './voting-end.service';
import { AuthService } from './../../../login/auth/auth.service';
import { GlobalsService } from 'app/globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-voting-ended',
  templateUrl: './voting-ended.component.html',
  styleUrls: ['./voting-ended.component.scss']
})
export class VotingEndedComponent implements OnInit {
  poll_list : any;
  dataSource : any;
  searchText : any;

  constructor(
    private _httpClient: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _actv_poll : VotingEndService) {

      let data = {
        status : 'ended'
      }
      this._actv_poll.getVotingPollList(data).subscribe(res2 => {
        if(res2['data'] != null){
          this.poll_list = this._globals.parseJwt(res2['data']);
        }
        this.dataSource = new MatTableDataSource(this.poll_list);
        this.dataSource.paginator = this.paginator;
      })
     }


   displayedColumns: string[] = ['items', 'voters', 'start_date', 'end_date', 'poll_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {

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
