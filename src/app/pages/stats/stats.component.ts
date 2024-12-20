import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ApiResponse, Order, Stats } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { OrdersByStatusComponent } from "../comp/orders-by-status/orders-by-status.component";
import { GetSalesOverTimeComponent } from "../comp/get-sales-over-time/get-sales-over-time.component";
import { GetSalesByCategoryComponent } from '../comp/get-sales-by-category/get-sales-by-category.component';
import { AssgintoDriverComponent } from "../comp/assginto-driver/assginto-driver.component";
import { NewUsersOverTimeComponent } from '../comp/new-users-over-time/new-users-over-time.component';
import { GetShippingStatusComponent } from '../comp/get-shipping-status/get-shipping-status.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [ CommonModule, OrdersByStatusComponent, GetSalesOverTimeComponent, GetSalesByCategoryComponent,NewUsersOverTimeComponent , GetShippingStatusComponent ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements AfterViewInit , OnInit {
  constructor(private masterService: MasterService) {}
  stats = {
    newOrdersCountToday: 0,
    newUsersCountToday: 0,
    totalOrders: 0,
    totalSales: 0,
    pendingServiceRequests: 0,
    completedOrdersToday: 0,
    productsInStock: 0,
    totalClients : 0,
    cancelledOrders: 0,
    totalRevenueThisMonth: 0
  };
  
  ngOnInit(): void {
    this.masterService.GetStats().subscribe(
      {
        next: (response: ApiResponse<Stats>) => {
          if (response) {
            this.stats = response.result;
             this.stats.newOrdersCountToday = this.stats.newOrdersCountToday || 0;
          } else {
            console.error('Error:', response);
          }
        },
        error: (err: any) => {
          console.error('Error fetching stats:', err);
      }
    })
  }
  ngAfterViewInit(): void {
    setInterval(() => {
      const canvasJsCreditLinks = document.querySelectorAll('.canvasjs-chart-credit');
      canvasJsCreditLinks.forEach((link) => {
        link.remove(); 
      });
    }, 500); 
  }
}
