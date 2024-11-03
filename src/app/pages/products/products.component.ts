import { Component, OnInit, HostListener } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ColorTranslations, LookUpDataModel, PostProductDto, Product, ProductStatus, ProductStatusTranslations } from '../../interfaces/interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { AddProductComponent } from "../comp/add-product/add-product.component";
import { AddCategoryComponent } from "../comp/add-category/add-category.component";
import { AddMaterialComponent } from "../comp/add-material/add-material.component";
import { AddBrandComponent } from "../comp/add-brand/add-brand.component";
import { AddStyleComponent } from "../comp/add-style/add-style.component";
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AddProductComponent, 
    AddCategoryComponent, 
    AddMaterialComponent, 
    AddBrandComponent, 
    AddStyleComponent,
    JsonPipe, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Selectedproduct: Product = {
    productId: 0,
    category: {
      categoryId: 0,
      nameAr: '',
      nameEn: ''
    },
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    material: {
      materialId: 0,
      materialNameEn: '',
      materialNameAr: ''
    },
    style: {
      styleId: 0,
      styleNameAr: '',
      styleNameEn: ''
    },
    color:0,
    height: 0,
    width: 0,
    weight: 0,
    price: 0,
    brand: {
      brandId: 0,
      brandName: '',
      reputationScore: 0,
      establishmentYear: 0,
      countryOfOrigin: '',
      contactInfo: ''
    },
    images: [],
    productStatus: ProductStatus.Active,
    statusNameAr: '',
    statusNameEn: '',
    colorNameEn: '',
    colorNameAr: ''
  };
  brands: LookUpDataModel<number>[] = [];
  categories: LookUpDataModel<number>[] = [];
  materials: LookUpDataModel<number>[] = [];
  styles: LookUpDataModel<number>[] = [];

  public Url: string = environment.Url;
  products: Product[] = [];
  errorMessage: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  loading: boolean = false;
  allProductsLoaded: boolean = false;

  showAddProduct = false;
  showAddCategory = false;
  showAddMaterial = false;
  showAddBrand = false;
  showAddStyle = false;
  showConfirmDialog= false;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  ShowForm: boolean = false;
  newImages: File[] = [];
dropdownOpen: any;
  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadCategories();
    this.loadMaterials();
    this.loadStyles();
  
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.onSearch(term);
    });
  }

  toggleAddProduct() {
    this.showAddProduct = !this.showAddProduct;
  }

  toggleAddCategory() {
    this.showAddCategory = !this.showAddCategory;
  }

  toggleAddMaterial() {
    this.showAddMaterial = !this.showAddMaterial;
  }

  toggleAddBrand() {
    this.showAddBrand = !this.showAddBrand;
  }

  toggleAddStyle() {
    this.showAddStyle = !this.showAddStyle;
  }

  loadProducts(): void {
    if (this.allProductsLoaded || this.loading) return;
    this.loading = true;

    this.masterService.getProducts(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.loading = false;
        if (response.isSuccess && response.result.length > 0) {
          const loadedProducts = response.result.map((product) => ({
            ...product,
            colorNameEn: ColorTranslations.en[product.color],
            colorNameAr: ColorTranslations.ar[product.color],
            statusNameEn: ProductStatusTranslations.en[product.productStatus],
            statusNameAr: ProductStatusTranslations.ar[product.productStatus],
          }));
          this.products = [...this.products, ...loadedProducts];
          this.pageNumber++;
        } else if (response.result.length === 0) {
          this.allProductsLoaded = true;
        } else {
          this.errorMessage = response.message || 'Error fetching products';
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'An error occurred while fetching products';
        console.error(error);
      }
    );
  }
  edit(){
    
  }
  onInputChange(term: string): void {
    this.searchSubject.next(term);
  }

  onSearch(term: string): void {
    this.products = [];
    this.pageNumber = 1;
    if (!term) {
      this.loadProducts();
    } else {
      this.masterService.searchProducts(term, this.pageNumber, this.pageSize).subscribe(
        (response) => {
          if (response.isSuccess) {

            this.products = response.result.map((product) => ({
              ...product,
              colorNameEn: ColorTranslations.en[product.color],
              colorNameAr: ColorTranslations.ar[product.color],
              statusNameEn: ProductStatusTranslations.en[product.productStatus],
              statusNameAr: ProductStatusTranslations.ar[product.productStatus],
            }));
          } else {
            this.errorMessage = 'No products found';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred while searching for products';
          console.error(error);
        }
      );
    }
  }

  changeStatus(productId: number): void {
      this.masterService.DeactivateProduct(productId).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.products = this.products.filter((product) => product.productId !== productId);
          }
        },
        error: (error) => {
          console.log('Error:', error);
        }
      });
  }
  conformDelete(product: Product): void {
    this.Selectedproduct = product;
    this.showConfirmDialog = true;
  }
  deleteProduct(){
    this.changeStatus(this.Selectedproduct!.productId);
  }
  cancelDelete(){
    this.showConfirmDialog = false;
  }

  onSelect(product: Product): void {
    this.Selectedproduct = {...product};
    this.ShowForm = true;
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        this.newImages.push(file); 
      });
    }
  }
  removeImage(imageToRemove: { imageUrl: string }): void {
    if (this.Selectedproduct) {
      this.Selectedproduct.images = this.Selectedproduct.images.filter(img => img.imageUrl !== imageToRemove.imageUrl);
    }
  }
  
  saveProduct(): void {
    if (this.Selectedproduct) {
      const updatedProductDto: PostProductDto = {
        CategoryId: this.Selectedproduct.category.categoryId,
        NameAr: this.Selectedproduct.nameAr,
        NameEn: this.Selectedproduct.nameEn,
        DescriptionAr: this.Selectedproduct.descriptionAr,
        DescriptionEn: this.Selectedproduct.descriptionEn,
        MaterialId: this.Selectedproduct.material.materialId,
        StyleId: this.Selectedproduct.style.styleId,
        Color: this.Selectedproduct.color,
        Height: this.Selectedproduct.height,
        Width: this.Selectedproduct.width,
        Weight: this.Selectedproduct.weight,
        Price: this.Selectedproduct.price,
        BrandId: this.Selectedproduct.brand.brandId,
        ImagesString64: this.Selectedproduct.images.map(img => img.imageUrl), 
        ProductStatus: this.Selectedproduct.productStatus,
      };
      if (this.newImages.length > 0) {
        this.uploadNewImagesAndSave(updatedProductDto);
      } else {
        this.updateProduct(updatedProductDto);
      }
    }
  }
  uploadNewImagesAndSave(updatedProductDto: PostProductDto): void {
    const uploadedImages: string[] = [];
    this.newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        uploadedImages.push(base64String);
        if (uploadedImages.length === this.newImages.length) {
          updatedProductDto.ImagesString64 = [...updatedProductDto.ImagesString64, ...uploadedImages];
          this.updateProduct(updatedProductDto);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  updateProduct(updatedProductDto: PostProductDto): void {
    this.masterService.UpdateProduct(this.Selectedproduct.productId, updatedProductDto).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log('Product updated successfully!');
          this.close();
        } else {
          console.error('Failed to update product:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while updating product:', error);
      }
    );
  }
  toggleDropdownMenu() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  close(): void {
    this.ShowForm = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position + threshold >= height && !this.loading) {
      this.loadProducts();
    }
  }



// Fetch brands
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

// Fetch categories
loadCategories(): void {
  this.masterService.getLookUp<number>('Product/GetCategoryLookUp').subscribe(
    (response) => {
      if (response.isSuccess) {
        this.categories = response.result;
      } else {
        console.error('Failed to load categories:', response.message);
      }
    },
    (error) => {
      console.error('Error occurred while fetching categories:', error);
    }
  );
}

// Fetch materials
loadMaterials(): void {
  this.masterService.getLookUp<number>('Product/GetMaterialLookUp').subscribe(
    (response) => {
      if (response.isSuccess) {
        this.materials = response.result;
      } else {
        console.error('Failed to load materials:', response.message);
      }
    },
    (error) => {
      console.error('Error occurred while fetching materials:', error);
    }
  );
}

// Fetch styles
loadStyles(): void {
  this.masterService.getLookUp<number>('Product/GetStyleLookUp').subscribe(
    (response) => {
      if (response.isSuccess) {
        this.styles = response.result;
      } else {
        console.error('Failed to load styles:', response.message);
      }
    },
    (error) => {
      console.error('Error occurred while fetching styles:', error);
    }
  );
}
}
