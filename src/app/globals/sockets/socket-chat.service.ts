import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { AuthService } from 'app/main/login/auth/auth.service';
import {  SocketConfigService } from 'app/globals/sockets/config/config-socket.service';


@Injectable({
    providedIn: 'root'
})

export class SocketService {

  private socket;

  constructor(private _auth: AuthService, 
            private _sockets: SocketConfigService) { 
  }

  connect(): Rx.Subject<MessageEvent> {

    this.socket = this._sockets.SOCKET_CONFIG;
    this.socket.emit('register', { user_id: this._auth.userInfo.user_id });
   
    let observable = new Observable(observer => {
        this.socket.on('chat', (data) => {
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    let observer = {
        next: (chatData: any) => {
            this.socket.emit('transmit', chatData);
        },
    };

    return Rx.Subject.create(observer, observable);
  }


}