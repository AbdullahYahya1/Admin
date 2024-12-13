import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private messageSubject = new Subject<string>(); // Emits "Order" or "Service"
  message$ = this.messageSubject.asObservable();
  url = environment.Url;
  toastr= inject(ToastrService);
  
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.url + 'Admin')
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connected to BroadcastHub'))
      .catch((err) => console.error('Error connecting to BroadcastHub:', err));
  }

  public listenForMessages(): void {
    this.hubConnection.on('ReceiveBroadcastMessage', (message: string) => {
      let audio = new Audio();
      audio.src = '../assets/notification.mp3';
      audio.load();
      audio.play();
      if(message==='Order'){
        this.toastr.info('New Order Received');
      }
      else if(message==='Service'){
        this.toastr.info('New Service Request Received');
      }
      if (message === 'Order' || message === 'Service') {
        this.messageSubject.next(message); 
      }
    });
  }
}
