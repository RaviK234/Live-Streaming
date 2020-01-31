import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message = [];
  currentDocument = this.socket.fromEvent('write');
  constructor(private socket: Socket) { }

  setRead(id: string) {
    this.socket.emit('read', id);
  }

  getRead() {
    this.message = [];
    // let message;
    this.socket.on('write', (msg: any) => {
      // console.log('Client Socket: ', msg);
      this.message.push(msg);
    });
  }

  getMessages() {
    return this.message;
  }
}
