import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostCategoryDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { NotificationComponent } from "../notification/notification.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ NotificationComponent,FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  @Output() closeForm = new EventEmitter<void>();
  CatagoryData:PostCategoryDto={
    nameAr: '',
    nameEn: '',
    imagesString64: ''
  }
  message = '';
  isSuccess = true;
  imagePreview = '';
  private masterService = inject(MasterService)

  close() {
    this.closeForm.emit();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0]; // Only handle the first file if multiple are selected

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.CatagoryData.imagesString64 = (reader.result as string).split(',')[1]; // Convert to Base64
        this.imagePreview = reader.result as string; // Set preview image
      };
      reader.readAsDataURL(file);
    }
  }

  submitCatagory() {
    console.log('Category Data:', this.CatagoryData);
    this.masterService.PostCategory(this.CatagoryData).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.message = 'Category added successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to add Category: ' + response.message;
          this.isSuccess = false;
        }
      },
      (error) => {
        this.message = 'Error occurred while adding Category: ' + error;
        this.isSuccess = false;
      }
    );
  }

}
