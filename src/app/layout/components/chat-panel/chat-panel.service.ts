import { Injectable } from '@angular/core';
import { GlobalsService } from 'app/globals/globals.service';
import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ChatPanelService { 
    _listeners = new Subject<any>();

    constructor(private _globals: GlobalsService, private _socket: Socket) { }

    listen(): Observable<any> {
        return this._listeners.asObservable();
    }

    event($method: string, $data: any): void {
        this._listeners.next({
            method: $method,
            data: $data,
        });
    }

    async _emit($channel: string, $data: any): Promise<void> {
        await this._socket.emit($channel, $data);
    }

    get socket(): any {
        return this._socket;
    }

    public register($user_id: number): void {
        this._emit('register', { user_id: $user_id });
    }

    public contacts($user_id: number, $type: string = 'recent'): any {
        const data = {
            user_id: $user_id,
            type: $type,
        };
        return this._globals.chatPostMethod('/contact/list', data);
    }

    public conversation($user_id: number, $other_user_id: number): any {
        const data = {
            user_id: $user_id,
            other_user_id: $other_user_id,
        };
        return this._globals.chatPostMethod('/message/conversation', data);
    }

    async send($data: MessageParamInterface): Promise<void> {
        const packet = {
            channel: 'chat',
            data: $data,
        };
        await this._emit('transmit', packet);
    }
    
}

export interface MessageParamInterface {
    from: number;
    to: number;
    message: string;
    is_private: number;
}
