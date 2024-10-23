import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Order } from '../../../interfaces/interfaces';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-order-ditails',
  standalone: true,
  imports: [DatePipe,CurrencyPipe,CommonModule],
  templateUrl: './order-ditails.component.html',
  styleUrls: ['./order-ditails.component.css']
})
export class OrderDitailsComponent implements OnInit {
  @Input() order!: Order;
  @Output() closeOrder = new EventEmitter<void>();
  public Url: string = environment.Url;
  constructor() {}

  ngOnInit(): void {
    console.log('Order:', this.order);
  }

  close(): void {
    this.closeOrder.emit();
  }
}
