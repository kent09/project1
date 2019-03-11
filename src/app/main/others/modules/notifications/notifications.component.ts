import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GlobalsService } from 'app/globals/globals.service';
import { AuthService } from 'app/main/login/auth/auth.service';
import { NotificationService, BANK_API } from './notifications.service';
import swal from 'sweetalert';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NotificationComponent implements OnInit, OnDestroy {

  displayedColumns = ['sender_id', 'sender_name', 'title', 'description', 'created_at', 'actions'];
  exampleDatabase: NotificationService | null;
  data: BANK_API[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
    private _globals: GlobalsService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _notifications: NotificationService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.populateNotifications();
      this.countNotifications();
    }, 1500);
  }

  countNotifications() {
    this._notifications.requestPostCountNotifications({ user_id: this._auth.userInfo.user_id })
      .subscribe((response) => {
        if (response.code === 201 || response.code === 200) {
          const notifications = this._notifications.decodeJwt(response.data);
          this.resultsLength = notifications;
        }
      });
  }


  populateNotifications() {
    this.exampleDatabase = new NotificationService(this.http, this._globals, this._auth);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getNotificationsDatas(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          const decodedData = this._globals.parseJwt(data.data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          return decodedData;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => { this.data = data; });
  }
  /**
 * On destroy
 */
  ngOnDestroy(): void {

  }

  isHTML(str) {
    var a = document.createElement('div');
    a.innerHTML = str;
    for (var c = a.childNodes, i = c.length; i--;) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  }

  deleteNotifications(data: any): void {
    swal({
      title: `Are you sure you want to delete this notification?`,
      text: `${data.title} From:  ${data.sender_name}`,
      icon: `warning`,
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true,
    }).then(willUnhide => {
      if (!willUnhide) throw null;
      if (willUnhide) {
        return this._notifications.requestDeleteNotification({
          notif_id: data.notif_id
        });
      }
    }).then(results => {
      return results.subscribe(response => {
        const { code, message, data } = response;
        if (code == 200 || code == 201) {
          const newData = this.data.filter(el => el.notif_id !== data.notif_id) || [];
          this.data = newData;
          swal("Yes!", message, "success");
        } else {
          const isDataMessage = data && data.length ? data.join('') : '';
          swal("Oh noes!", `${message} ${isDataMessage}`, "error");
        }
      });
    }).catch(err => {
      if (err || err == '' || err == null) {
        swal({
          title: "Cancelled!",
          text: "cancelled deletion",
          timer: 1000
        });
      } else {
        swal.stopLoading();
        swal.close('true');
      }
    });

  }

  geAvatarUser(userId) {
    return this._globals.avatarImagePath(userId);
  }

  viewDetail(details) {
    const dialogRef = this._dialog.open(ModalDetailComponent, {
      data: details
    });
  }

}





