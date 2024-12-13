import { Brand } from './../../../interfaces/interfaces';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PostBrandDto } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../../services/master.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>();

  BrandData: PostBrandDto = {
    brandName: '',
    reputationScore: 0,
    establishmentYear: 0,
    countryOfOrigin: '',
    contactInfo: '',
  };

  otherCountry = '';
  reputationScores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();
  countries: string[] = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Italy', 'Japan', 'China', 'India', 'Australia',
    'Brazil', 'Russia', 'Mexico', 'South Korea', 'Netherlands',
    'Spain', 'Switzerland', 'Sweden', 'Singapore', 'Saudi Arabia',
    'Argentina', 'Belgium', 'Norway', 'Denmark', 'South Africa',
    'United Arab Emirates', 'Austria', 'Finland', 'Poland', 'Ireland',
    'Other'
  ].sort();
  establishmentYears: number[] = this.generateYears();
  isSaving = false;

  private toastrService = inject(ToastrService);
  private masterService = inject(MasterService);

  ngOnInit(): void {
    this.BrandData.establishmentYear = this.establishmentYears[0];
    this.BrandData.reputationScore = this.reputationScores[0];
    this.BrandData.countryOfOrigin = this.countries[0];
  }

  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  close(): void {
    this.closeForm.emit();
  }

  submitBrand(): void {
    if (this.BrandData.countryOfOrigin === 'Other') {
      this.BrandData.countryOfOrigin = this.otherCountry;
    }

    if (!this.BrandData.brandName.trim() || !this.BrandData.contactInfo.trim()) {
      this.toastrService.error('Brand name and contact info are required.', 'Validation Error');
      return;
    }

    this.isSaving = true;

    this.masterService.postBrand(this.BrandData).subscribe({
      next: (response: any) => {
        this.isSaving = false;
        if (response.isSuccess) {
          this.toastrService.success('Brand added successfully!', 'Add Brand');
          this.close(); // Close the form after successful submission
        } else {
          this.toastrService.error('Failed to add brand: ' + response.message, 'Add Brand');
        }
      },
      error: (error: any) => {
        this.isSaving = false;
        this.toastrService.error('An error occurred while adding the brand.', 'Add Brand');
        console.error('Error occurred while adding brand:', error);
      },
    });
  }
}
