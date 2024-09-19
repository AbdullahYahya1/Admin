import { Component, OnInit, HostListener } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ColorTranslations, LookUpDataModel, Product, ProductStatusTranslations } from '../../interfaces/interfaces';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from "../comp/add-product/add-product.component";
import { AddCategoryComponent } from "../comp/add-category/add-category.component";
import { AddMaterialComponent } from "../comp/add-material/add-material.component";
import { AddBrandComponent } from "../comp/add-brand/add-brand.component";
import { AddStyleComponent } from "../comp/add-style/add-style.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule,AddProductComponent, AddCategoryComponent, AddMaterialComponent, AddStyleComponent, AddBrandComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
  constructor(private masterService: MasterService) {}
  ngOnInit(): void {
    this.loadProducts();

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

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const threshold = 300; 
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position + threshold >= height && !this.loading) {
      this.loadProducts();
    }
  }
}
