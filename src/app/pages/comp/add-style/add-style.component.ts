import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PostStyleDto } from '../../../interfaces/interfaces';
import { MasterService } from '../../../services/master.service';
import { NotificationComponent } from "../notification/notification.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-style',
  standalone: true,
  imports: [NotificationComponent,FormsModule],
  templateUrl: './add-style.component.html',
  styleUrl: './add-style.component.css'
})
export class AddStyleComponent {
  @Output() closeForm = new EventEmitter<void>();
  styleData:PostStyleDto={
    styleNameAr: '',
    styleNameEn: ''
  }
  message = '';
  isSuccess = true;
  private masterService = inject(MasterService)

  submitStyle() {
    this.masterService.postStyle(this.styleData).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.message = 'Style added successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to add Style: ' + response.message;
          this.isSuccess = false;
        }
      },
      (error) => {
        this.message = 'Error occurred while adding Style: ' + error;
        this.isSuccess = false;
      }
    );
  }
  close() {
    this.closeForm.emit();
  }
}
