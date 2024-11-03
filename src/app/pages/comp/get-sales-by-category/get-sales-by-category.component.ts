import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { Color, SalesByCategoryDto } from '../../../interfaces/interfaces';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-get-sales-by-category',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './get-sales-by-category.component.html',
  styleUrl: './get-sales-by-category.component.css'
})
export class GetSalesByCategoryComponent implements OnInit {
  chart: any; 
  constructor(private masterService: MasterService) {}
  ngOnInit(): void {
    this.masterService.GetSalesByCategory().subscribe((response) => {
      if (response.isSuccess && response.result) {
        const chartDataPoints = response.result.map((data: SalesByCategoryDto) => ({
          label: data.category,
          y: data.totalSales
        }));
        this.renderChart(chartDataPoints);
      } else {
        console.error('Failed to get sales by category: ' + response.message);
      }
    });
  }
  renderChart(dataPoints: any): void {
    this.chart = new CanvasJS.Chart("categoryChartContainer", {
      animationEnabled: true,
      theme:"dark2",
      title: {
        text: "Total Sales by Category"
      },
      axisY: {
        includeZero: true,
        title: "Sales",
        suffix: " SAR"
      },
      data: [{
        type: "bar",
        indexLabel: "{y}",
        yValueFormatString: "#,### SAR",
        dataPoints: dataPoints  
      }]
    });
    this.chart.render();
  }
}
