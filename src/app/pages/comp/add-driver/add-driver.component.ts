import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../../services/master.service';
import { PostDriver } from '../../../interfaces/interfaces';
import { ApiResponse, GetUserDto } from '../../../interfaces/interfaces'; // Assuming ApiResponse and GetUserDto are defined in interfaces
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent {
  @Output() closeForm = new EventEmitter<void>();
  @Output() driverAdded = new EventEmitter<GetUserDto | null>();

  isSaving = false;
  message = '';
  isSuccess = true;

  driverData: PostDriver = {
    email: '',
    userName: '',
    password: '',
    mobileNumber: '',
  };

  constructor(private masterService: MasterService) {}
  private toastrService = inject(ToastrService);

  submitDriver(): void {
    if (!this.driverData.email || !this.validateEmail(this.driverData.email)) {
      this.toastrService.error('Invalid email format.', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
  
    if (!this.driverData.userName || this.driverData.userName.length < 3) {
      this.toastrService.error('Username must be at least 3 characters long.', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!this.driverData.password || !passwordRegex.test(this.driverData.password)) {
      this.toastrService.error(
        'Password must be at least 8 characters long and include at least one letter and one number.',
        'Validation Error',
        {
          positionClass: 'toast-top-center',
          progressBar: true,
        }
      );
      return;
    }
  
    const mobileNumberRegex = /^5[0-9]{8}$/;
    if (!this.driverData.mobileNumber || !mobileNumberRegex.test(this.driverData.mobileNumber)) {
      this.toastrService.error(
        'Mobile number must start with "5" and be exactly 9 digits long.',
        'Validation Error',
        {
          positionClass: 'toast-top-center',
          progressBar: true,
        }
      );
      return;
    }

    // Proceed to submit the driver data
    this.isSaving = true;
    this.masterService.AddDriver(this.driverData).subscribe({
      next: (response: any) => {
        this.isSaving = false;
  
        if (response.isSuccess) {
          this.toastrService.success('Driver added successfully!', 'Add Driver');
          this.driverAdded.emit(response.result);
        } else {
          this.toastrService.error(`Failed to add driver: ${response.message}`, 'Add Driver');
          this.driverAdded.emit(null); 
        }
      },
      error: (error: any) => {
        this.isSaving = false;
        this.toastrService.error('An error occurred while adding the driver.', 'Add Driver');
        console.error('Error occurred while adding driver:', error);
        this.driverAdded.emit(null);
      },
    });
  }
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  close(): void {
    this.closeForm.emit();
  }
}
