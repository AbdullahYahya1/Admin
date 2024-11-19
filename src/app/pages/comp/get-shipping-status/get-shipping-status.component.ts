import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { GetShippingStatusDto } from '../../../interfaces/interfaces';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-get-shipping-status',
  templateUrl: './get-shipping-status.component.html',
  styleUrl: './get-shipping-status.component.css',
  standalone: true,

})
export class GetShippingStatusComponent implements OnInit {
  masterService = inject(MasterService);
  data: GetShippingStatusDto[] = [];
  chart: any;  // To store the CanvasJS chart instance
  ngOnInit(): void {
    this.masterService.GetShippingStatus().subscribe((response) => {
      if (response.isSuccess) {
        const chartDataPoints = response.result.map(item => ({
          y: item.count,
          label: item.shippingStatus
        }));
        this.renderChart(chartDataPoints);
      } else {
        console.error('Failed to get Get Shipping Status: ' + response.message);
      }
    });
  }
  renderChart(dataPoints: any): void {
    this.chart = new CanvasJS.Chart("chartContainer22", {
      animationEnabled: true,
      title: {
        text: "Shipping Status"
      },
      theme:"dark1",

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
