import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { LookUpDataModel } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assginto-driver',
  standalone: true,
  imports: [ FormsModule, CommonModule],
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
  private toastrService = inject(ToastrService);
  ngOnInit() {
    this.masterService.getLookUp<string>('User/DriversUsersLookUp').subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.driversLookup = response.result;
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
    if (!this.selectedDriverId) {
      this.toastrService.warning('Please select a driver.', 'Assign Driver'); 
      return;
    }
    
    this.masterService.AssignDriver(this.selectedDriverId, this.orderId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.toastrService.success('Driver assigned successfully!', 'Assign Driver'); 
          this.closeForm.emit();
        } else {
          const errorMessage = 'Failed to assign driver: ' + response.message;
          this.toastrService.error(errorMessage, 'Assign Driver'); 
        }
      },
      error: (err: any) => {
        const errorMessage = 'Error occurred while assigning driver: ' + err;
        this.toastrService.error(errorMessage, 'Assign Driver'); 
      },
    });
  }


  close() {
    this.closeForm.emit();
  }
}
