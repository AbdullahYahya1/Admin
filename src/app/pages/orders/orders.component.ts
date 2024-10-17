import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { dictionaries, Order } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [JsonPipe, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';
  orderId: number = 0;
  isOrderDetailsVisible: boolean = false;
  activeDropdown: number | null = null; // Track the active dropdown
  dictionaries: any = dictionaries;

  constructor(private masterService: MasterService) {}

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
    this.closeDropdown(); // Close dropdown after action
  }

  // Hide order details
  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false;
  }

  // Cancel an order
  cancelOrder(orderId: number): void {
    // Implement cancel logic here, e.g., call a service to cancel the order
    console.log(`Canceling order ${orderId}`);
    this.closeDropdown(); // Close dropdown after action
  }

  // Mark an order as complete
  completeOrder(orderId: number): void {
    // Implement complete logic here, e.g., call a service to mark as complete
    console.log(`Completing order ${orderId}`);
    this.closeDropdown(); // Close dropdown after action
  }

  // Toggle dropdown visibility
  toggleDropdown(orderId: number): void {
    this.activeDropdown = this.activeDropdown === orderId ? null : orderId;
  }

  // Close dropdown
  closeDropdown(): void {
    this.activeDropdown = null;
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
