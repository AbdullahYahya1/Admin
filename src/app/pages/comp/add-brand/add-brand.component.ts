import { Brand } from './../../../interfaces/interfaces';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PostBrandDto } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../services/master.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent implements OnInit{
  @Output() closeForm = new EventEmitter<void>();
  BrandData: PostBrandDto = {
    brandName: '',
    reputationScore: 0,
    establishmentYear: 0,
    countryOfOrigin: '',
    contactInfo: '',
    
  };
  otherCountry=''; 
  reputationScores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
  countries: string[] = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Italy', 'Japan', 'China', 'India', 'Australia', 
    'Brazil', 'Russia', 'Mexico', 'South Korea', 'Netherlands', 
    'Spain', 'Switzerland', 'Sweden', 'Singapore', 'Saudi Arabia',
    'Argentina', 'Belgium', 'Norway', 'Denmark', 'South Africa',
    'United Arab Emirates', 'Austria', 'Finland', 'Poland', 'Ireland',
    'Other' 
  ];
  establishmentYears: number[] = this.generateYears();
  message = '';
  isSuccess = true;

  ngOnInit(): void {}
  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  close() {
    this.closeForm.emit();
  }
  private masterService = inject(MasterService)

  submitBrand() {
    if (this.BrandData.countryOfOrigin === 'Other') {
      this.BrandData.countryOfOrigin = this.otherCountry;
    }
  
    this.masterService.postBrand(this.BrandData).pipe(
      tap(response => {
        if (response.isSuccess) {
          this.message = 'Brand added successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to add Brand: ' + response.message;
          this.isSuccess = false;
        }
      }),
      catchError(error => {
        this.message = 'Error occurred while adding Brand: ' + error;
        this.isSuccess = false;
        return EMPTY;      })
    ).subscribe(); 
  }
  
  showModal() {
    const overlay = document.querySelector('.modal-overlay');
    const container = document.querySelector('.add-brand-container');

    overlay?.classList.add('show');
    container?.classList.add('show');
  }

  hideModal() {
    const overlay = document.querySelector('.modal-overlay');
    const container = document.querySelector('.add-brand-container');

    overlay?.classList.remove('show');
    container?.classList.remove('show');

    
  }}
