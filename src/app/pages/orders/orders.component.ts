import { ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { SignalrService } from '../../services/signalr.service';
import { dictionaries, DictionariesEnum, Order } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssgintoDriverComponent } from "../comp/assginto-driver/assginto-driver.component";
import { OrderDitailsComponent } from "../comp/order-ditails/order-ditails.component";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, AssgintoDriverComponent, OrderDitailsComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  selectedOrder: Order | null = null; 
  errorMessage: string = '';
  orderId: number = 0;
  isOrderDetailsVisible: boolean = false;
  assgintoDriver: boolean = false;
  activeDropdown: number | null = null;
  dictionaries: any = dictionaries;
  DictionariesEnum: any = DictionariesEnum;
  private readonly destroy$ = new Subject<void>(); // For managing subscriptions

  signalRService = inject(SignalrService);
  masterService = inject(MasterService);
  cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadOrders();
    this.signalRService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        if (message === 'Order') {
          this.loadOrders();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Signal all subscriptions to complete
    this.destroy$.complete(); // Clean up the Subject
  }

  private loadOrders(): void {
    this.masterService.getOrders()
      .pipe(takeUntil(this.destroy$)) // Ensures the subscription is cleaned up
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.orders = response.result;
            this.sortOrders();
            this.cd.detectChanges(); // Refresh the view
          } else {
            this.handleError(response.message || 'Failed to fetch orders.');
          }
        },
        error: (err) => this.handleError('Error fetching orders: ' + err)
      });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    console.error(message);
  }

  handleDriverAssigned(orderId: number): void {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.shippingStatus = DictionariesEnum.ShippingStatus.InTransit;
      this.cd.detectChanges();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropdown();
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
      case 0: return 'case-info';      
      case 1: return 'case-success';   
      case 2: return 'case-danger';     
      case 3: return 'case-warning';    
      default: return '';
    }
  }

  toggleDropdown(orderId: number): void {
    this.activeDropdown = this.activeDropdown === orderId ? null : orderId;
  }

  closeDropdown(): void {
    this.activeDropdown = null;
  }

  private sortOrders(): void {
    this.orders.sort((a, b) => {
      // Priority 1: NotShipped and has a transaction
      const aPriority1 = a.shippingStatus === 0 && a.transaction !== null;
      const bPriority1 = b.shippingStatus === 0 && b.transaction !== null;
      if (aPriority1 && !bPriority1) return -1;
      if (!aPriority1 && bPriority1) return 1;

      // Priority 2: Based on shipping status importance
      const shippingPriority = [0, 1, 2, 3, 4];
      const aShippingIndex = shippingPriority.indexOf(a.shippingStatus);
      const bShippingIndex = shippingPriority.indexOf(b.shippingStatus);
      if (aShippingIndex !== bShippingIndex) return aShippingIndex - bShippingIndex;

      // Priority 3: Complete orders last
      if (a.status === 1 && b.status !== 1) return 1;
      if (a.status !== 1 && b.status === 1) return -1;

      return 0; // Equal priority
    });
  }
}
