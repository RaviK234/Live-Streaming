import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { RequestService } from 'src/app/services/request.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-streamn-io',
  templateUrl: './streamn-io.component.html',
  styleUrls: ['./streamn-io.component.scss']
})
export class StreamnIOComponent implements OnInit {
  url: string;
  link: string;
  keyword: string;
  search: string
  message = [];
  constructor(
    private socket: Socket,
    private request: RequestService,
    private utility: UtilitiesService
  ) { }

  ngOnInit() {
    this.socket.on('write', (msg: any) => {
      console.log('Client Socket: ', msg);
      this.message.push(msg);
      this.message = [...this.message];
    });
  }
  searchByKeyword() {
    const trimValue = this.search.replace(/\s/g, "");
    console.log('Inside Function: ', trimValue);
    if (/^\w+(,\w+)*$/.test(trimValue)) {
      const values = trimValue.split(',');
      console.log('searchKeyword', values);
      const userInfo = this.utility.getUserInfo();
      this.request.searchByKeyword(values, userInfo.userId).subscribe((details) => {
        console.log('Youtube Details: ', details);
      });
    }
  }
  viewLiveStream() {
    this.link = this.url.split('v=')[1];
    this.message = [];
    let values = [];
    if (this.keyword) {
      const trimValue = this.keyword.replace(/\s/g, "");
      console.log('Inside Function: ', trimValue);
      if (/^\w+(,\w+)*$/.test(trimValue)) {
        values = trimValue.split(',');
        console.log('Keyword', values);
        console.log('Live Stream ID: ', this.link);
        const object = {
          keyword: values,
          chatId: 'Cg0KC1VjeERWdTRfbUZBKicKGFVDNWhxc2U4bUo3bXBfOEoxNVc4Q3I2QRILVWN4RFZ1NF9tRkE', 
          token: this.utility.getToken()
        }
        this.socket.emit('read', object);
        console.log('Message: ', this.message);
      }
    } else {
      const object = {
        keyword: [],
        chatId: 'Cg0KC3lWUFNvUlJTTkNRKicKGFVDNWhxc2U4bUo3bXBfOEoxNVc4Q3I2QRILeVZQU29SUlNOQ1E', 
        token: this.utility.getToken()
      }
      this.socket.emit('read', object);
    }
    const userInfo = this.utility.getUserInfo();
    let details = {
      userId: userInfo.userId,
      name: userInfo.name,
      email: userInfo.email,
      link: this.link,
      keyword: values
    };
    // Service hit
    this.request.getYoutubeDetails(details).subscribe((details) => {
      console.log('Youtube Details: ', details);
    });
  }
}
