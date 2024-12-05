import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { dictionaries, DictionariesEnum, PostupdateDto, RequestType } from '../../interfaces/interfaces';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, CommonModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent {
  serviceId: string | null = null;
  service: any;
  responseDetails: string = '';
  serviceStatus: number | null = null;
  dictionaries: any = dictionaries;
  public Url: string = environment.Url;
  Vdictionaries: any = dictionaries;

  serviceStatusList = Object.entries(dictionaries.ServiceRequestStatus).map(([key, value]) => ({
    id: Number(key),
    label: value.en
  }));
  masterService = inject(MasterService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.fetchServiceData();
  }
  close(){
    this.router.navigate(['/services']);
  }
  fetchServiceData() {
    this.masterService.getCurrentUserService(Number(this.serviceId)).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.service = response.result;
          console.log('Service:', this.service);
          this.serviceStatus = this.service.serviceRequestStatus;
        } else {
          console.error('Error:', response.message);
        }
      },
      error: (err: any) => {
        console.error('Error fetching service:', err);
      }
    });
  }
  getRequestTypeLabel(type: RequestType): string {
    return this.Vdictionaries.RequestType[type]?.en || 'Unknown';
  }
  submitResponse() {
    const requestData:PostupdateDto = {
      responseDetails: this.responseDetails,
      serviceRequestStatus: this.serviceStatus ?? 0 
    };
    
    this.masterService.ResponseToRequest(Number(this.serviceId), requestData).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log('Response submitted successfully!');
          this.router.navigate(['/services']);

        } else {
          console.error('Failed to submit response:', response.message);
        }

      },
      error: (err: any) => {
        console.error('Error submitting response:', err);
      }

    })
  }
}
