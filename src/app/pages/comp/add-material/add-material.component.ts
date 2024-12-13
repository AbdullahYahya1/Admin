import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostMaterialDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageValidationService } from '../../../services/language-validation.service';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [  FormsModule],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.css'
})
export class AddMaterialComponent {
  @Output() closeForm = new EventEmitter<void>();
  MaterialData: PostMaterialDto = {
    materialNameEn: '',
    materialNameAr: ''
  };

  private toastrService = inject(ToastrService);
  private languageValidatorService = inject(LanguageValidationService);
  private masterService = inject(MasterService);

  isSaving = false;

  close(): void {
    this.closeForm.emit();
  }

  submitMaterial(): void {
    // Validation logic
    if (!this.MaterialData.materialNameAr.trim() || !this.MaterialData.materialNameEn.trim()) {
      this.toastrService.error('Both Material names are required.', 'Validation Error');
      return;
    }

    if (!this.languageValidatorService.validateArabic(this.MaterialData.materialNameAr)) {
      this.toastrService.error('Material Arabic Name must be in Arabic.', 'Validation Error');
      return;
    }

    if (!this.languageValidatorService.validateEnglish(this.MaterialData.materialNameEn)) {
      this.toastrService.error('Material English Name must be in English.', 'Validation Error');
      return;
    }

    this.isSaving = true;
    this.masterService.PostMaterial(this.MaterialData).subscribe({
      next: (response: any) => {
        this.isSaving = false;
        if (response.isSuccess) {
          this.toastrService.success('Material added successfully!', 'Add Material');
        } else {
          this.toastrService.error('Failed to add material: ' + response.message, 'Add Material');
        }
      },
      error: () => {
        this.isSaving = false;
        this.toastrService.error('An error occurred while adding the material.', 'Add Material');
      },
    });
  }
}
