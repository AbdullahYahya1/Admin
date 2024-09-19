import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Order } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [JsonPipe ,CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.masterService.getOrders().subscribe({
      next: (response:any) => {
        if (response.isSuccess) {
          this.orders = response.result;
        } else {
          this.errorMessage = response.message || 'Failed to fetch orders.';
        }
      },
      error: (err:any) => {
        console.error('Error fetching orders:', err);
        this.errorMessage = 'Error fetching orders.';
      }
    });
  }


}
