import { Component, OnInit, HostListener } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ColorTranslations, LookUpDataModel, postDeactivateProduct, Product, ProductStatusTranslations } from '../../interfaces/interfaces';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from "../comp/add-product/add-product.component";
import { AddCategoryComponent } from "../comp/add-category/add-category.component";
import { AddMaterialComponent } from "../comp/add-material/add-material.component";
import { AddBrandComponent } from "../comp/add-brand/add-brand.component";
import { AddStyleComponent } from "../comp/add-style/add-style.component";
import { TemplateBindingParseResult, NONE_TYPE } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule, HttpClientModule,AddProductComponent, AddCategoryComponent, AddMaterialComponent, AddStyleComponent, AddBrandComponent],
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
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.onSearch(term);
    });
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
  searchTerm: string = '';
  items: string[] = ['Apple', 'Banana', 'Orange', 'Grapes']; 
  filteredItems: string[] = [];
  searchSubject: Subject<string> = new Subject<string>();
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
            console.log('f')
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
  
changeStatus(number:number){
  var postDeactivate :postDeactivateProduct={
    productId: number
  }
  this.masterService.DeactivateProduct(postDeactivate).subscribe({
    next: (res) => {
      console.log(res)
      this.products=this.products.filter(p=>p.productId!=res.result.productId)
    },
    error: (error) => {
      console.log('Error: ', error);
    }
  });
}
  
  Selectedproduct: Product | undefined;
  ShowForm:boolean =false;
  onSelect(product:Product){
    this.Selectedproduct = product;
    this.ShowForm = true; 
  }
  close(){
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
}