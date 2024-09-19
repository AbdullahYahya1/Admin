import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostMaterialDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [FormsModule, NotificationComponent],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.css'
})
export class AddMaterialComponent {
  @Output() closeForm = new EventEmitter<void>();
  MaterialData:PostMaterialDto={
    materialNameEn: '',
    materialNameAr: ''
  }
  message = '';
  isSuccess = true;
  private masterService = inject(MasterService)
  close() {
    this.closeForm.emit();
  }
  submitMaterial() {
    this.masterService.PostMaterial(this.MaterialData).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.message = 'Material added successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to add Material: ' + response.message;
          this.isSuccess = false;
        }
      },
      (error) => {
        this.message = 'Error occurred while adding Material: ' + error;
        this.isSuccess = false;
      }
    );
  }
}
