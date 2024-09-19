import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}" class="notification">
      {{ message }}
    </div>
  `,  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = true;
}
