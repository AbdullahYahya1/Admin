import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { LookUpDataModel, PostProductDto } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from "../notification/notification.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, NotificationComponent,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
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
    ProductStatus: 0
  };
  message = '';
  isSuccess = true;

  imagePreviews: string[] = []; 
  brands: LookUpDataModel<number>[] = [];
  Styles: LookUpDataModel<number>[] = [];
  Materials: LookUpDataModel<number>[] = [];
  Categories: LookUpDataModel<number>[] = [];

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
    this.masterService.postProduct(this.productData).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log( 'Product Data:', this.productData);
          this.message = 'Product added successfully!';
          this.isSuccess = true;
        } else {
          this.message = 'Failed to add product: ' + response.message;
          this.isSuccess = false;
        }
      },
      (error) => {
        this.message = 'Error occurred while adding product: ' + error;
        this.isSuccess = false;
      }
    );
  }


  close(): void {
    this.closeForm.emit();
  }
}
