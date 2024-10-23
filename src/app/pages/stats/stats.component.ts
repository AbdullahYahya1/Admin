import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Order } from '../../interfaces/interfaces';
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
  imports: [JsonPipe, CommonModule, OrdersByStatusComponent, GetSalesOverTimeComponent, GetSalesByCategoryComponent, AssgintoDriverComponent,NewUsersOverTimeComponent , GetShippingStatusComponent ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements AfterViewInit  {
  constructor(private masterService: MasterService) {}
  ngAfterViewInit(): void {
    setInterval(() => {
      const canvasJsCreditLinks = document.querySelectorAll('.canvasjs-chart-credit');
      canvasJsCreditLinks.forEach((link) => {
        link.remove(); 
      });
    }, 500); 
  }
}
