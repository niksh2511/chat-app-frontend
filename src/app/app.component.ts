import { Component } from '@angular/core';
import { ChatService } from './service/chat.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  protected toUser: string | null = null;

  constructor(
    protected chatService: ChatService,
    protected appService: AppService) { }


  protected handleSend = () => {


    if(this.appService.chatGroup.valid) {

      this.appService.sendMessage({...this.appService.chatGroup.value,  from: this.chatService.username, to: this.toUser}).subscribe(res => {

        console.log("Send method called", res);
      });
    }
  }


  protected updateToUser = (toUser: string) => this.toUser = toUser;
}
