import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { LookUpDataModel, PostProductDto, Product } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageValidationService } from '../../../services/language-validation.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() productCreated = new EventEmitter<Product>();

  isSaving = false;
  productData: PostProductDto = {
    CategoryId: 0,
    NameAr: '',
    NameEn: '',
    DescriptionAr: '',
    DescriptionEn: '',
    MaterialId: 0,
    StyleId: 0,
    Color: 0,
    Height: 0,
    Width: 0,
    Weight: 0,
    Price: 0,
    BrandId: 0,
    ImagesString64: [],
    ProductStatus: 0,
  };
  message = '';
  isSuccess = true;

  imagePreviews: string[] = [];
  brands: LookUpDataModel<number>[] = [];
  Styles: LookUpDataModel<number>[] = [];
  Materials: LookUpDataModel<number>[] = [];
  Categories: LookUpDataModel<number>[] = [];
  private toastrService = inject(ToastrService);
  private languageValidatorService = inject(LanguageValidationService);
  @Output() closeForm = new EventEmitter<void>();

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadStyles();
    this.loadCategories();
    this.loadMaterials();

  }

  loadBrands(): void {
    this.masterService.getLookUp<number>('Product/GetBrandsLookUp').subscribe(
      (response) => {
        if (response.isSuccess) {
          this.brands = response.result;
          this.productData.BrandId = this.brands[0].value; 
        } else {
          console.error('Failed to load brands:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching brands:', error);
      }
    );
  }

  loadMaterials(): void {
    this.masterService.getLookUp<number>('Product/GetMaterialLookUp').subscribe(
      (response) => {
        if (response.isSuccess) {
          this.Materials = response.result;

          this.productData.MaterialId = this.Materials[0].value;
        } else {
          console.error('Failed to load Materials:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching Materials:', error);
      }
    );
  }

  loadCategories(): void {
    this.masterService.getLookUp<number>('Product/GetCategoryLookUp').subscribe(
      (response) => {
        if (response.isSuccess) {
          this.Categories = response.result;
          this.productData.CategoryId = this.Categories[0].value;

        } else {
          console.error('Failed to load Categories:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching Categories:', error);
      }
    );
  }

  loadStyles(): void {
    this.masterService.getLookUp<number>('Product/GetStyleLookUp').subscribe(
      (response) => {
        if (response.isSuccess) {
          this.Styles = response.result;
          this.productData.StyleId = this.Styles[0].value;

        } else {
          console.error('Failed to load Styles:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching Styles:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    this.imagePreviews = [];
    this.productData.ImagesString64 = [];
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          this.productData.ImagesString64.push(base64String);
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  submitProduct(): void {
    console.log(this.productData);
    if(this.productData.Weight){
      if(this.productData.Weight < 1){
        this.toastrService.error('Weight must be more than 1.', 'Validation Error', {
          positionClass: 'toast-top-center',
          progressBar: true,
        });
        return;
      }
    }
    if(this.productData.Height){
      if(this.productData.Height < 1){
        this.toastrService.error('Height must be more than 1.', 'Validation Error', {
          positionClass: 'toast-top-center',
          progressBar: true,
        });
        return;
      }
    }

    if(this.productData.Width){
      if(this.productData.Width < 1){
        this.toastrService.error('Width must be more than 1.', 'Validation Error', {
          positionClass: 'toast-top-center',
          progressBar: true,
        });
        return;
      }
    }


    if (this.productData.Price <= 0) {
      this.toastrService.error('Price must be greater than 0.', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return; 
    }
    if(this.productData.Price > 1000000){
      this.toastrService.error('Price must be less than 1000000.', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
    if(this.languageValidatorService.validateArabic(this.productData.NameAr) === false){
      this.toastrService.error('Arabic Name must be in Arabic', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
    if(this.languageValidatorService.validateArabic(this.productData.DescriptionAr) === false){
      this.toastrService.error('Arabic Description must be in Arabic', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
    if(this.languageValidatorService.validateEnglish(this.productData.NameEn) === false){
      this.toastrService.error('English Name must be in English', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }
    if(this.languageValidatorService.validateEnglish(this.productData.DescriptionEn) === false){
      this.toastrService.error('English Description must be in English', 'Validation Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
      });
      return;
    }

  
    this.isSaving = true;
    console.log(this.productData);

    this.masterService.postProduct(this.productData).subscribe({

      next: (response: any) => {
        this.isSaving = false;
        if (response.isSuccess) {
          this.productCreated.emit(response.result); 
        } else {
          this.toastrService.error('Failed to add product: ' + response.message, 'Add Product');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while adding the product:', error);
        this.isSaving = false; 
        this.toastrService.error('An error occurred while adding the product.', 'Add Product'); 
      },
    });
  }
  

  close(): void {
    this.closeForm.emit();
  }
}
