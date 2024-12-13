import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../../services/signalr.service';

@Component({
  selector: 'app-notifiaction',
  standalone: true,
  imports: [],
  templateUrl: './notifiaction.component.html',
  styleUrl: './notifiaction.component.css'
})
export class NotifiactionComponent implements OnInit {
  constructor(private signalRService: SignalrService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.listenForMessages();
  }
}
