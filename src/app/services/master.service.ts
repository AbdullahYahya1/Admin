import { PostCategoryDto, postDeactivateProduct, PostMaterialDto } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, Brand, LookUpDataModel, Order, PostBrandDto, PostProductDto, PostStyleDto, Product } from '../interfaces/interfaces';
import { style } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiUrl: string = environment.apiUrl; // Use the centralized API URL

  constructor(private http: HttpClient) {}

  getOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${this.apiUrl}Order/GetOrders`);
  }
  getProducts(pageNumber: number = 1, pageSize: number = 10): Observable<ApiResponse<Product[]>> {
    const url = `${this.apiUrl}Product/SearchProducts?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<Product[]>>(url);
  }
  getLookUp<T>(lookupUrl: string): Observable<ApiResponse<LookUpDataModel<T>[]>> {
    return this.http.get<ApiResponse<LookUpDataModel<T>[]>>(`${this.apiUrl}${lookupUrl}`);
  }
  postProduct(product: PostProductDto): Observable<ApiResponse<Product>> {
    const url = `${this.apiUrl}Product/AddProduct`;
    return this.http.post<ApiResponse<Product>>(url, product);
  }

  postBrand(Brand: PostBrandDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Product/AddBrand`;
    return this.http.post<ApiResponse<boolean>>(url, Brand);
  }
  postStyle(Style: PostStyleDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Product/AddStyle`;
    return this.http.post<ApiResponse<boolean>>(url, Style);
  }
  PostMaterial(MaterialDto: PostMaterialDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Product/AddMaterial`;
    return this.http.post<ApiResponse<boolean>>(url, MaterialDto);
  }
  PostCategory(CategoryDto: PostCategoryDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Product/AddCategory`;
    return this.http.post<ApiResponse<boolean>>(url, CategoryDto);
  }
  searchProducts(searchTerm: string,pageNumber: number = 1, pageSize: number = 10): Observable<ApiResponse<Product[]>> {
    const url =  `${this.apiUrl}Product/SearchProducts?Name=${searchTerm}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.http.get<ApiResponse<Product[]>>(url);
  }
  DeactivateProduct(postDeactivateProductdto: postDeactivateProduct): Observable<ApiResponse<Product>> {
    const url = `${this.apiUrl}Product/DeactivateProduct`;
    return this.http.post<ApiResponse<Product>>(url, postDeactivateProductdto ); 
  }
}
