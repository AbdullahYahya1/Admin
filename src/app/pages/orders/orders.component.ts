import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { dictionaries, Order } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [JsonPipe, CommonModule,],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

  // Fetch orders on component initialization
  export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    errorMessage: string = '';
    orderId: number = 0;
    isOrderDetailsVisible: boolean = false;
    dictionaries: any = dictionaries;
  
    constructor(private masterService: MasterService) {}
  
    // Method to check if there are any orders with a specific status
    hasOrdersWithStatus(status: number): boolean {
      return this.orders.some(order => order.status === status);
    }
  
    // Method to assign a CSS class based on order status
    getStatusClass(status: number): string {
      switch (status) {
        case 0: return 'case-info';      // Processing
        case 1: return 'case-success';   // Complete
        case 2: return 'case-danger';    // Cancelled
        case 3: return 'case-warning';   // Returned
        default: return '';
      }
    }
  
    // Show order details
    displayOrderDetails(orderId: number): void {
      this.orderId = orderId;
      this.isOrderDetailsVisible = true;
    }
  
    // Hide order details
    closeOrderDetails(): void {
      this.isOrderDetailsVisible = false;
    }
  
    // Cancel an order
    cancelOrder(orderId: number): void {
      // Implement cancel logic here, e.g., call a service to cancel the order
      console.log(`Canceling order ${orderId}`);
    }
  
    // Mark an order as complete
    completeOrder(orderId: number): void {
      // Implement complete logic here, e.g., call a service to mark as complete
      console.log(`Completing order ${orderId}`);
    }
  
    ngOnInit(): void {
      this.masterService.getOrders().subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.orders = response.result;
            console.log('Orders:', this.orders);
          } else {
            this.errorMessage = response.message || 'Failed to fetch orders.';
          }
        },
        error: (err: any) => {
          console.error('Error fetching orders:', err);
          this.errorMessage = 'Error fetching orders.';
        }
      });
    }
  }
  
  