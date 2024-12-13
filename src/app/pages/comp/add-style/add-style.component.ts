import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostStyleDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-style',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-style.component.html',
  styleUrl: './add-style.component.css'
})
export class AddStyleComponent {
  @Output() closeForm = new EventEmitter<void>();

  styleData: PostStyleDto = {
    styleNameAr: '',
    styleNameEn: ''
  };

  isSaving = false;
  private masterService = inject(MasterService);
  private toastrService = inject(ToastrService);

  submitStyle(): void {
    if (!this.styleData.styleNameAr.trim() || !this.styleData.styleNameEn.trim()) {
      this.toastrService.error('Both Arabic and English style names are required.', 'Validation Error');
      return;
    }

    this.isSaving = true;

    this.masterService.postStyle(this.styleData).subscribe({
      next: (response: any) => {
        this.isSaving = false;
        if (response.isSuccess) {
          this.toastrService.success('Style added successfully!', 'Add Style');
          this.close(); // Close the form after successful submission
        } else {
          this.toastrService.error('Failed to add style: ' + response.message, 'Add Style');
        }
      },
      error: (error: any) => {
        this.isSaving = false;
        this.toastrService.error('An error occurred while adding the style.', 'Add Style');
        console.error('Error occurred while adding style:', error);
      },
    });
  }

  close(): void {
    this.closeForm.emit();
  }
}
