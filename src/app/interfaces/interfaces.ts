
// Define the required interfaces based on the API response

export interface Category {
    nameAr: string;
    nameEn: string;
  }
  
  export interface Material {
    materialNameEn: string;
    materialNameAr: string;
  }
  
  export interface Style {
    styleNameAr: string;
    styleNameEn: string;
  }
  
  export interface Brand {
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
    statusNameAr:string;
    statusNameEn:string;
    colorNameEn:string;
    colorNameAr:string;
  }
  
  // For pagination
  export interface PaginatedProducts {
    result: Product[];
    isSuccess: boolean;
    message: string | null;
  }
  
  export interface postDeactivateProduct{
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
    status: number;
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
  }
  
  export interface PostMaterialDto {
    materialNameEn: string;
    materialNameAr: string;
  }
  
  export interface PostOrderDto {
    ShippingAddressId: number;
  }
  
  export interface PostProductDto {
    categoryId: number;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    materialId: number;
    styleId: number;
    color: Color;
    height: number;
    width: number;
    weight: number;
    price: number;
    brandId: number;
    imagesString64: string[];
    productStatus: ProductStatus;
  }
  
  export interface PostStyleDto {
    styleNameAr: string;
    styleNameEn: string;
  }
  
  // Enums and Additional Types
  
  export enum ProductStatus {
    Active = 0,
    Inactive = 1,
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


export interface LookUpDataModel<T> {
    value: T;
    nameAr: string;
    nameEn: string;
  }
  export interface ApiResponse<T> {
    result: T;
    isSuccess: boolean;
    message: string | null;
  }
  export type LookUpDataModelInt = LookUpDataModel<number>;
  