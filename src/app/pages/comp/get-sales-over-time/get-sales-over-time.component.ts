import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { SalesOverTimeDTO } from '../../../interfaces/interfaces';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-get-sales-over-time',
  templateUrl: './get-sales-over-time.component.html',
  styleUrls: ['./get-sales-over-time.component.css'],
  standalone: true,
})
export class GetSalesOverTimeComponent implements OnInit {
  chart: any;  // To store the CanvasJS chart instance

  constructor(private masterService: MasterService) {}  // Inject MasterService
  
  ngOnInit(): void {
    this.masterService.getSalesOverTime().subscribe(response => {
      if (response.isSuccess && response.result) {
        // Map the API response to data points for CanvasJS
        const dataPoints = response.result.map((data: SalesOverTimeDTO) => ({
          x: new Date(data.date),
          y: data.totalSales,
        }));
        this.renderChart(dataPoints);
    
      } else {
        console.error('Failed to fetch sales data:', response.message);
      }
    });
  }

  // Function to render the chart with dynamic data
  renderChart(dataPoints: any): void {
    this.chart = new CanvasJS.Chart("salesChartContainer", {
      theme:"dark2",
      animationEnabled: true,
      zoomEnabled: true,
      title: { text: "Sales Over Time" },
      axisY: {
        labelFormatter: (e: any) => {
          const suffixes = ["", "K", "M", "B", "T"];
          let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
          if (order > suffixes.length - 1) order = suffixes.length - 1;
          return "$" + (e.value / Math.pow(1000, order)) + suffixes[order];
        },
      },
      data: [{
        type: "line",
        xValueFormatString: "YYYY",
        yValueFormatString: "$#,###.##",
        dataPoints: dataPoints
      }]
    });
    this.chart.render();  // Render the chart with the new data
    const canvasJsCreditLink = document.querySelector('.canvasjs-chart-credit') as HTMLElement;

  }
}
