import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostCategoryDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LanguageValidationService } from '../../../services/language-validation.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  @Output() closeForm = new EventEmitter<void>();

  CatagoryData: PostCategoryDto = {
    nameAr: '',
    nameEn: '',
    imagesString64: '',
  };

  message = '';
  isSuccess = true;
  imagePreview = '';
  isSaving = false;

  private masterService = inject(MasterService);
  private toastrService = inject(ToastrService);
  private languageValidatorService = inject(LanguageValidationService);

  close(): void {
    this.closeForm.emit();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.CatagoryData.imagesString64 = (reader.result as string).split(',')[1]; // Convert to Base64
        this.imagePreview = reader.result as string; // Set preview image
      };
      reader.readAsDataURL(file);
    }
  }

  submitCategory(): void {
    // Validation logic
    if (!this.CatagoryData.nameAr.trim() || !this.CatagoryData.nameEn.trim()) {
      this.toastrService.error('Both Category names are required.', 'Validation Error');
      return;
    }

    if (!this.languageValidatorService.validateArabic(this.CatagoryData.nameAr)) {
      this.toastrService.error('Category Arabic Name must be in Arabic.', 'Validation Error');
      return;
    }

    if (!this.languageValidatorService.validateEnglish(this.CatagoryData.nameEn)) {
      this.toastrService.error('Category English Name must be in English.', 'Validation Error');
      return;
    }

    if (!this.CatagoryData.imagesString64) {
      this.toastrService.error('Category Image is required.', 'Validation Error');
      return;
    }

    this.isSaving = true;

    // Submit the category
    this.masterService.PostCategory(this.CatagoryData).subscribe({
      next: (response: any) => {
        this.isSaving = false;
        if (response.isSuccess) {
          this.toastrService.success('Category added successfully!', 'Add Category');
        } else {
          this.toastrService.error('Failed to add category: ' + response.message, 'Add Category');
        }
      },
      error: (error: any) => {
        this.isSaving = false;
        this.toastrService.error('An error occurred while adding the category.', 'Add Category');
        console.error('Error occurred while adding category:', error);
      },
    });
  }
}
