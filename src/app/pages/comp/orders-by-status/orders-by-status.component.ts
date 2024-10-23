import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { OrderByStatusDto } from '../../../interfaces/interfaces';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-orders-by-status',
  templateUrl: './orders-by-status.component.html',
  styleUrl: './orders-by-status.component.css',
  standalone: true,

})
export class OrdersByStatusComponent implements OnInit {
  masterService = inject(MasterService);
  data: OrderByStatusDto[] = [];
  chart: any;  // To store the CanvasJS chart instance

  ngOnInit(): void {
    this.masterService.getOrdersByStatus().subscribe((response) => {
      if (response.isSuccess) {
        // Map the response to the data points format
        const chartDataPoints = response.result.map(item => ({
          y: item.totalOrders,
          label: item.status
        }));
        console.log('Orders by Status:', chartDataPoints);
        this.renderChart(chartDataPoints);
      } else {
        console.error('Failed to get Orders by Status: ' + response.message);
      }
    });
  }

  // Function to render the chart after getting data
  renderChart(dataPoints: any): void {
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Orders by Status"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: dataPoints
      }]
    });
    this.chart.render();  
  }
}
