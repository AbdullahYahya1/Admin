import { GetServiceDto, GetShippingStatusDto, NewUsersOverTimeDTO, OrderByStatusDto, PostCategoryDto, postDeactivateProduct, PostMaterialDto, PostupdateDto, SalesByCategoryDto, SalesOverTimeDTO } from './../interfaces/interfaces';
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
  DeactivateProduct(productId:number): Observable<ApiResponse<Product>> {
    const url = `${this.apiUrl}Product/DeactivateProduct/${productId}`;
    return this.http.post<ApiResponse<Product>>(url, {}); 
  }
  AssignDriver(Userid:string ,OrderId:number): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Order/AssignDriver/${Userid}/Order/${OrderId}`;
    return this.http.post<ApiResponse<boolean>>(url, {}); 
  }
  getCurrentUserServices(): Observable<ApiResponse<GetServiceDto[]>> {
    const url = `${this.apiUrl}ServiceRequest/GetCurrentUserServices`;
    return this.http.get<ApiResponse<GetServiceDto[]>>(url);
  }
  getCurrentUserService(id:number): Observable<ApiResponse<GetServiceDto>> {
    const url = `${this.apiUrl}ServiceRequest/GetCurrentUserService/${id}`;
    return this.http.get<ApiResponse<GetServiceDto>>(url);
  }
  ResponseToRequest(id:number,postUpdate:PostupdateDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}ServiceRequest/ResponseToRequest/${id}`;
    return this.http.put<ApiResponse<boolean>>(url, postUpdate);
  }
  UpdateProduct(ProductId:number, updateProductDto:PostProductDto): Observable<ApiResponse<boolean>> {
    const url = `${this.apiUrl}Product/UpdateProduct/${ProductId}`;
    return this.http.put<ApiResponse<boolean>>(url, updateProductDto);
  }
  getSalesOverTime(): Observable<ApiResponse<SalesOverTimeDTO[]>> {
    const url = `${this.apiUrl}Stats/SalesOverTime`;
    return this.http.get<ApiResponse<SalesOverTimeDTO[]>>(url);
  }
  getOrdersByStatus(): Observable<ApiResponse<OrderByStatusDto[]>> {
    const url = `${this.apiUrl}Stats/OrdersByStatus`;
    return this.http.get<ApiResponse<OrderByStatusDto[]>>(url);
  }
  GetSalesByCategory(): Observable<ApiResponse<SalesByCategoryDto[]>> {
    const url = `${this.apiUrl}Stats/SalesByCategory`;
    return this.http.get<ApiResponse<SalesByCategoryDto[]>>(url);
  }
  GetNewUsersOverTime(): Observable<ApiResponse<NewUsersOverTimeDTO[]>> {
    const url = `${this.apiUrl}Stats/NewUsersOverTime`;
    return this.http.get<ApiResponse<NewUsersOverTimeDTO[]>>(url);
  }
  GetShippingStatus(): Observable<ApiResponse<GetShippingStatusDto[]>> {
    const url = `${this.apiUrl}Stats/ShippingStatus`;
    return this.http.get<ApiResponse<GetShippingStatusDto[]>>(url);
  }
}
