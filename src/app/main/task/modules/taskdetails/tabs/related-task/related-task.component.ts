import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TaskServiceDetails } from '../../services/taskdetails.services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-related-task',
  templateUrl: './related-task.component.html',
  styleUrls: ['./related-task.component.scss'],
  animations : fuseAnimations
})
export class RelatedTaskComponent implements OnInit, OnDestroy {

  isLoadingResults : boolean = false;
  isRateLimitReached : boolean = false;

  displayedColumns: string[] = ['title', 'reward'];
  taskDetails: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _unsubscribeAll: Subject<any>;
  
  constructor(private _taskDetailsService: TaskServiceDetails) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._taskDetailsService.taskDetailsOnChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(taskDetails => {
          this.taskDetails = new MatTableDataSource(taskDetails.other_task);
        });

        this.taskDetails.paginator = this.paginator;
        this.taskDetails.sort = this.sort;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
