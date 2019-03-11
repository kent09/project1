import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';



@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.component.html',
  styleUrls: ['./social-history.component.scss'],
  animations: fuseAnimations,
})
export class SocialHistoryComponent implements OnInit {

  displayedColumns: string[] = ['type', 'status', 'date', 'option'];
  dataSource = ELEMENT_DATA;
  selected = 'option';

  constructor() { }

  ngOnInit() {
  }

}

export interface PeriodicElement {
  type: string;
  date: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { type: 'Hydrogen', date: 1.0079, status: 'H'},
  { type: 'Helium', date: 4.0026, status: 'He'},
  { type: 'Lithium', date: 6.941, status: 'Li'},
  { type: 'Beryllium', date: 9.0122, status: 'Be'},
  { type: 'Boron', date: 10.811, status: 'B'},
  { type: 'Carbon', date: 12.0107, status: 'C'},
  { type: 'Nitrogen', date: 14.0067, status: 'N'},
  { type: 'Oxygen', date: 15.9994, status: 'O'},
  { type: 'Fluorine', date: 18.9984, status: 'F'},
  { type: 'Neon', date: 20.1797, status: 'Ne'},
];