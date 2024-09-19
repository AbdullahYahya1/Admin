import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostCategoryDto } from '../../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, NotificationComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  @Output() closeForm = new EventEmitter<void>();
  CatagoryData:PostCategoryDto={
    nameAr: '',
    nameEn: ''
  }
  message = '';
  isSuccess = true;

  private masterService = inject(MasterService)

  close() {
    this.closeForm.emit();
  }
  submitCatagory() {

    console.log('Brand Data:', this.CatagoryData);
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
