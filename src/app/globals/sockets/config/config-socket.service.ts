import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketConfigService {

  private customConfig: object = {
    path:'/kryptonia',
    forceNew: true,
  };
  
  private sockets : any = io(environment.ws_url, this.customConfig);

  get SOCKET_CONFIG() : any {
    return this.sockets;
  }
}
