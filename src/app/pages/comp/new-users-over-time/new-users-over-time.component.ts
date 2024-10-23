import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { NewUsersOverTimeDTO } from '../../../interfaces/interfaces';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-new-users-over-time',
  templateUrl: './new-users-over-time.component.html',
  styleUrls: ['./new-users-over-time.component.css'],
  standalone: true
})
export class NewUsersOverTimeComponent implements OnInit {
  chart: any;

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.masterService.GetNewUsersOverTime().subscribe({
      next: (response) => {
        if (response.isSuccess && response.result) {
          const chartDataPoints = response.result.map((data: NewUsersOverTimeDTO) => ({
            x: new Date(data.date), 
            y: data.newUserCount
          }));
          this.renderChart(chartDataPoints);

    
        } else {
          console.error('Failed to fetch New Users Over Time:', response.message);
        }
      },
      error: (error) => {
        console.error('Error occurred while fetching NewUsersOverTime:', error);
      }
    });
  }

  renderChart(dataPoints: any): void {
    this.chart = new CanvasJS.Chart("usersChartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "New Users Over Time"
      },
      axisY: {
        title: "New Users",
        valueFormatString: "#,###"
      },
      data: [{
        type: "spline",
        xValueFormatString: "YYYY-MM-DD",
        yValueFormatString: "#,###",
        dataPoints: dataPoints 
      }]
    });
    this.chart.render();

  }
}
