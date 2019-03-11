import { Injectable } from '@angular/core';
import { SocketService } from 'app/globals/sockets/socket-chat.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private wsService: SocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe((response: any): any => {
        return response;
      })
   }
  
  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
  
}
