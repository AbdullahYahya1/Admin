import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { dictionaries, DictionariesEnum, Order } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssgintoDriverComponent } from "../comp/assginto-driver/assginto-driver.component";
import { OrderDitailsComponent } from "../comp/order-ditails/order-ditails.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [JsonPipe, CommonModule, FormsModule, AssgintoDriverComponent, OrderDitailsComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null; 
  errorMessage: string = '';
  orderId: number = 0;
  isOrderDetailsVisible: boolean = false;
  assgintoDriver: boolean = false;
  activeDropdown: number | null = null;
  dictionaries: any = dictionaries;
  DictionariesEnum: any = DictionariesEnum;

  constructor(private masterService: MasterService) {}
  cd = inject(ChangeDetectorRef);
  handleDriverAssigned(orderId: number): void {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.shippingStatus = DictionariesEnum.ShippingStatus.InTransit;
      this.cd.detectChanges();
    }
  }

  displayOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.isOrderDetailsVisible = true;
    this.closeDropdown();
  }

  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false;
    this.selectedOrder = null;
  }

  assinToDriver(orderId: number): void {
    this.assgintoDriver = true;
    this.orderId = orderId;
    this.closeDropdown();
  }

  toggleAssgintoDriverProduct(): void {
    this.assgintoDriver = !this.assgintoDriver;
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'case-info';       // Processing
      case 1: return 'case-success';    // Complete
      case 2: return 'case-danger';     // Cancelled
      case 3: return 'case-warning';    // Returned
      default: return '';
    }
  }

  toggleDropdown(orderId: number): void {
    this.activeDropdown = this.activeDropdown === orderId ? null : orderId;
  }

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
        this.errorMessage = 'Error fetching orders.';
      }
    });
  }
}
 