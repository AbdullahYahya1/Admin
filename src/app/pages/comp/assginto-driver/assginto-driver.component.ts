import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { LookUpDataModel } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assginto-driver',
  standalone: true,
  imports: [NotificationComponent, FormsModule, CommonModule],
  templateUrl: './assginto-driver.component.html',
  styleUrl: './assginto-driver.component.css'
})
export class AssgintoDriverComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>();
  @Output() orderAssigned = new EventEmitter<number>();
  @Input() orderId!: number; 
  message = '';
  isSuccess = true;
  private masterService = inject(MasterService);
  errorMessage = ''; 
  driversLookup: LookUpDataModel<string>[] = []; 
  selectedDriverId: string | null = null; 
  
  ngOnInit() {
    console.log('Order ID:', this.orderId);
    this.masterService.getLookUp<string>('User/DriversUsersLookUp').subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.driversLookup = response.result;
          console.log('Drivers:', this.driversLookup);
        } else {
          this.errorMessage = response.message || 'Failed to load drivers.';
        }
      },
      error: (err: any) => {
        console.error('Error occurred while fetching drivers:', err);
        this.errorMessage = 'Error occurred while fetching drivers.';
      }
    });
    
  }

  submitAssign() {
    this.isSuccess = false;
    if (!this.selectedDriverId) {
      this.message = 'Please select a driver.';
      return;
    }
    this.masterService.AssignDriver(this.selectedDriverId ,this.orderId ).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.isSuccess = true;
          this.close();
        } else {
          this.message = 'Failed to assign driver: ' + response.message;
          this.isSuccess = false;
        }
      },
      error: (err: any) => {
        this.message = 'Error occurred while assigning driver: ' + err;
        this.isSuccess = false;
      }
    });
  }

  close() {
    this.closeForm.emit();
  }
}
