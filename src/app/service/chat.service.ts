import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { faker } from '@faker-js/faker';

import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseServerUrl: string = environment.baseServerUrl;
  private relativeChatHubUrl: string = environment.relativeChatHub;
  
  public username: string = faker.person.firstName();
  public connectionId!: string; 
  public connection: signalR.HubConnection;
  public onlineUserList: string[] = []; 
  public chatHistory: any[] = [];

  constructor(private hc: HttpClient) { 

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseServerUrl + this.relativeChatHubUrl)
      .build()

    this.connection.on("onConnected", (res: string) => {
      console.log("onConnected: ", res)

      if(this.connection.connectionId) {
        this.hc.post(this.baseServerUrl + 'api/userOnline', {usernmae: this.username, connectionId: this.connection.connectionId}).subscribe(res => {
  
          console.log("Post request runned");
          this.refreshTheUserList()
        })
      }
    })

    

    this.connection.on('sendMessage', (res: any) => {
      console.log("Recievied >> " ,res)
      this.chatHistory.push(res);
    })

    this.connection.on("onDisconnected", (res: any) => {
      console.log("onDisconnected: ", res)
      this.refreshTheUserList();
    })
    
    this.connection.start()


    
    
  }


  public stopConnection = () => {
    this.connection.stop();
  }


  public refreshTheUserList = () => {

    this.hc.get(this.baseServerUrl + 'api/userOnline').subscribe((res: any) => {
      if(res.data) {
        console.log("hit")
        this.onlineUserList = res.data
      }
    })
  }
}
