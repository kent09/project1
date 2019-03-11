import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private _router: Router, private _dialog: MatDialogRef<PopupComponent>) { }

  ngOnInit() {
  }

  yes() {
    this._dialog.close();
    localStorage.setItem('popup_seen', 'yes');
    this._router.navigate(['/membership/pricing']);
  }

  no() {
    this._dialog.close();
    localStorage.setItem('popup_seen', 'yes');
  }

}
