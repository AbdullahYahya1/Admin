// Define the required interfaces based on the API response

export interface Category {
  categoryId: number;
  nameAr: string;
  nameEn: string;
}

export interface Material {
  materialId: number;
  materialNameEn: string;
  materialNameAr: string;
}

export interface Style {
  styleId: number;
  styleNameAr: string;
  styleNameEn: string;
}

export interface Brand {
  brandId: number;
  brandName: string;
  reputationScore: number;
  establishmentYear: number;
  countryOfOrigin: string;
  contactInfo: string;
}

export interface Product {
  productId: number;
  category: Category;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  material: Material;
  style: Style;
  color: Color;  
  height: number;
  width: number;
  weight: number;
  price: number;
  brand: Brand;
  images: { imageUrl: string }[]; 
  productStatus: ProductStatus;
  statusNameAr: string;
  statusNameEn: string;
  colorNameEn: string;
  colorNameAr: string;
}

// For pagination
export interface PaginatedProducts {
  result: Product[];
  isSuccess: boolean;
  message: string | null;
}

export interface postDeactivateProduct {
  productId: number;
}

export interface Address {
  addressId: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Material {
  materialNameEn: string;
  materialNameAr: string;
}

export interface Style {
  styleNameEn: string;
  styleNameAr: string;
}

export interface Brand {
  brandName: string;
  reputationScore: number;
  establishmentYear: number;
  countryOfOrigin: string;
  contactInfo: string;
}

export interface OrderItem {
  product: Product;
}

export interface Transaction {
  transactionDate: string;
  totalPrice: number;
  transactionStatus: number;
  provider: number;
  cardholderName: string;
}

export interface Order {
  orderId: number;
  createdAt: string;
  status: DictionariesEnum.OrderStatus;
  shippingAddressId: number;
  shippingAddress: Address;
  transaction: Transaction | null;
  shippingStatus: number;
  shippingDate: string | null;
  totalPrice: number;
  orderItems: OrderItem[];
}

export interface ApiResponse<T> {
  result: T;
  isSuccess: boolean;
  message: string | null;
}

// New Interfaces for GetServiceDto and GetUserDto
export interface GetServiceDto {
  requestId: number;
  createdBy: GetUserDto;
  requestType: RequestType;
  productDetails: string;
  requestedPrice?: number;
  purchasePrice?: number;
  serviceRequestStatus: ServiceRequestStatus;
  submissionDate: string;
  userPhone: string;
  responseDate?: string;
  responseDetails?: string;
  images: ImageDto[];
}

export interface GetUserDto {
  userId: string;
  email: string;
  userType: DictionariesEnum.UserType;
  userName: string;
  fullName: string;
  userImageURL: string;
  dateOfBirth: string;
  isActive: boolean;
  mobileNumber: string;
}

export interface ImageDto {
  imageUrl: string;
}
export interface LookUpDataModel<T> {
  value: T;
  nameAr: string;
  nameEn: string;
}
// TypeScript Interfaces

export interface PostBrandDto {
  brandName: string;
  reputationScore: number;
  establishmentYear: number;
  countryOfOrigin: string;
  contactInfo: string;
}

export interface PostCategoryDto {
  nameAr: string;
  nameEn: string;
  imagesString64: string;
}

export interface PostMaterialDto {
  materialNameEn: string;
  materialNameAr: string;
}

export interface PostOrderDto {
  ShippingAddressId: number;
}

export interface PostProductDto {
  CategoryId: number;
  NameAr: string;
  NameEn: string;
  DescriptionAr: string;
  DescriptionEn: string;
  MaterialId: number;
  StyleId: number;
  Color: Color;
  Height: number;
  Width: number;
  Weight: number;
  Price: number;
  BrandId: number;
  ImagesString64: string[];
  ProductStatus: ProductStatus;
}

export interface SalesOverTimeDTO {
  date: string;        
  totalSales: number;  
}
export interface OrderByStatusDto {
  status: string;        
  totalOrders: number;  
}
export interface SalesByCategoryDto {
  category: string;        
  totalSales: number;  
}

export interface PostStyleDto {
  styleNameAr: string;
  styleNameEn: string;
}

export interface NewUsersOverTimeDTO
{
  date:string;
  newUserCount:number; 
}
export interface GetShippingStatusDto{
  shippingStatus:string; 
  count:number;
}
export interface Stats{
  newOrdersCountToday:number;
  newUsersCountToday:number;
  totalOrders:number;
  totalSales:number;
  pendingServiceRequests:number;
  completedOrdersToday:number;
  productsInStock:number;
  cancelledOrders:number;
  totalWishlistItems:number;
  totalRevenueThisMonth:number;
}

export enum ProductStatus {
  Active = 0,
  Inactive = 1,
}

export interface PostupdateDto{
  responseDetails: string;
  serviceRequestStatus: ServiceRequestStatus;
}


// English and Arabic translations
export const ProductStatusTranslations = {
  en: {
      [ProductStatus.Active]: 'Active',
      [ProductStatus.Inactive]: 'Inactive',
  },
  ar: {
      [ProductStatus.Active]: 'نشط',
      [ProductStatus.Inactive]: 'غير نشط',
  }
};

export enum Color {
  Black = 0,
  White = 1,
  Red = 2,
  Green = 3,
  Blue = 4,
  Yellow = 5,
  Orange = 6,
  Purple = 7,
  Pink = 8,
  Gray = 9,
  Brown = 10,
  Cyan = 11,
  Magenta = 12
}

// English and Arabic translations
export const ColorTranslations = {
  en: {
      [Color.Black]: 'Black',
      [Color.White]: 'White',
      [Color.Red]: 'Red',
      [Color.Green]: 'Green',
      [Color.Blue]: 'Blue',
      [Color.Yellow]: 'Yellow',
      [Color.Orange]: 'Orange',
      [Color.Purple]: 'Purple',
      [Color.Pink]: 'Pink',
      [Color.Gray]: 'Gray',
      [Color.Brown]: 'Brown',
      [Color.Cyan]: 'Cyan',
      [Color.Magenta]: 'Magenta'
  },
  ar: {
      [Color.Black]: 'أسود',
      [Color.White]: 'أبيض',
      [Color.Red]: 'أحمر',
      [Color.Green]: 'أخضر',
      [Color.Blue]: 'أزرق',
      [Color.Yellow]: 'أصفر',
      [Color.Orange]: 'برتقالي',
      [Color.Purple]: 'أرجواني',
      [Color.Pink]: 'وردي',
      [Color.Gray]: 'رمادي',
      [Color.Brown]: 'بني',
      [Color.Cyan]: 'سماوي',
      [Color.Magenta]: 'أرجواني فاتح'
  }
};

// New Enums for GetServiceDto
export enum RequestType {
  Repair = 0,
  Return = 1,
  Sell = 2,
  Buy = 3,
}

export enum ServiceRequestStatus {
  New = 0,
  InProgress = 1,
  Resolved = 2,
  Rejected = 3,
}

// Dictionaries for translations
export const dictionaries = {
  TransactionStatus: {
      0: { en: "Payed", ar: "مدفوع" },
      1: { en: "Failed", ar: "فشل" },
  },
  PaymentProvider: {
      0: { en: "Visa", ar: "فيزا" },
      1: { en: "MasterCard", ar: "ماستر كارد" },
      2: { en: "Mada", ar: "مدى" },
  },
  ServiceRequestStatus: {
      0: { en: "New", ar: "جديد" },
      1: { en: "In Progress", ar: "قيد التنفيذ" },
      2: { en: "Resolved", ar: "تم الحل" },
      3: { en: "Rejected", ar: "مرفوض" },
  },
  RequestType: {
      0: { en: "Repair", ar: "إصلاح" },
      1: { en: "Return", ar: "إرجاع" },
      2: { en: "Sell", ar: "بيع" },
      3: { en: "Buy", ar: "شراء" },
  },
  ProductStatus: {
      0: { en: "Active", ar: "نشط" },
      1: { en: "Inactive", ar: "غير نشط" },
  },
  Color: {
      0: { en: "Black", ar: "أسود" },
      1: { en: "White", ar: "أبيض" },
      2: { en: "Red", ar: "أحمر" },
      3: { en: "Green", ar: "أخضر" },
      4: { en: "Blue", ar: "أزرق" },
      5: { en: "Yellow", ar: "أصفر" },
      6: { en: "Orange", ar: "برتقالي" },
      7: { en: "Purple", ar: "أرجواني" },
      8: { en: "Pink", ar: "وردي" },
      9: { en: "Gray", ar: "رمادي" },
      10: { en: "Brown", ar: "بني" },
      11: { en: "Cyan", ar: "سماوي" },
      12: { en: "Magenta", ar: "أرجواني" },
  },
  OrderStatus: {
      0: { en: "Processing", ar: "قيد المعالجة" },
      1: { en: "Complete", ar: "مكتمل" },
      2: { en: "Cancelled", ar: "ملغي" },
      3: { en: "Returned", ar: "مرتجع" },
  },
  ShippingStatus: {
      0: { en: "Not Shipped", ar: "لم يتم الشحن" },
      1: { en: "In Transit", ar: "في الطريق" },
      2: { en: "Out For Delivery", ar: "في الطريق للتوصيل" },
      3: { en: "Delivered", ar: "تم التوصيل" },
      4: { en: "Failed Delivery", ar: "فشل في التوصيل" },
  },
  UserType: {
      0: { en: "Client", ar: "عميل" },
      1: { en: "Manager", ar: "مدير" },
      2: { en: "Support", ar: "الدعم" },
      3: { en: "Delivery Representative", ar: "مندوب توصيل" },
  }
};

export namespace DictionariesEnum {
  export enum TransactionStatus {
      Payed = 0,
      Failed = 1,
  }

  export enum PaymentProvider {
      Visa = 0,
      MasterCard = 1,
      Mada = 2,
  }

  export enum ServiceRequestStatus {
      New = 0,
      InProgress = 1,
      Resolved = 2,
      Closed = 3,
      Rejected = 4,
  }

  export enum RequestType {
      Repair = 0,
      Return = 1,
      Sell = 2,
      Dontate = 3,
  }

  export enum ProductStatus {
      Active = 0,
      Inactive = 1,
  }

  export enum Color {
      Black = 0,
      White = 1,
      Red = 2,
      Green = 3,
      Blue = 4,
      Yellow = 5,
      Orange = 6,
      Purple = 7,
      Pink = 8,
      Gray = 9,
      Brown = 10,
      Cyan = 11,
      Magenta = 12,
  }

  export enum OrderStatus {
      Processing = 0,
      Complete = 1,
      Cancelled = 2,
      Returned = 3,
  }

  export enum ShippingStatus {
      NotShipped = 0,
      InTransit = 1,
      OutForDelivery = 2,
      Delivered = 3,
      FailedDelivery = 4,
  }

  export enum UserType {
      Client = 0,
      Manager = 1,
      Support = 2,
      DeliveryRepresentative = 3,
  }
}
