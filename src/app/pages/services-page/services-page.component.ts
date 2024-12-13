import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse, dictionaries, GetServiceDto, RequestType, ServiceRequestStatus } from '../../interfaces/interfaces';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  masterService = inject(MasterService);
  serviceRequests: GetServiceDto[] = [];
  Vdictionaries: any = dictionaries;
  filterStatus: string = '';
  filterRequestType: string = '';
  signalRService = inject(SignalrService); 
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadServiceRequests();
    this.signalRService.message$.subscribe((message) => {
      if (message === 'Service') {
        console.log('Service message received');
        this.loadServiceRequests();
      }
    });
  }
  loadServiceRequests(): void {
    this.masterService.getCurrentUserServices().subscribe({
      next: (response: ApiResponse<GetServiceDto[]>) => {
        if (response.isSuccess) {
          this.serviceRequests = response.result.reverse();
        } else {
          console.error('Error:', response.message);
        }
      },
      error: (err: any) => {
        console.error('Error fetching service requests:', err);
      }
    });
  }
  filteredServiceRequests(): GetServiceDto[] {
    return this.serviceRequests.filter(request => {
      const matchesStatus = this.filterStatus === '' || request.serviceRequestStatus === +this.filterStatus;
      const matchesType = this.filterRequestType === '' || request.requestType === +this.filterRequestType;
      return matchesStatus && matchesType;
    });
  }
  getRequestTypeLabel(type: RequestType): string {
    return this.Vdictionaries.RequestType[type]?.en || 'Unknown';
  }
  getStatusLabel(status: ServiceRequestStatus): string {
    return this.Vdictionaries.ServiceRequestStatus[status]?.en || 'Unknown';
  }
}
