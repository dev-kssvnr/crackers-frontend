export interface Product {
  id: number;
  name: string;
  tamil_name: string;
  product_code: string;
  category: string;
  brand: string | null;
  unit: string | null;
  sales_rate: string;
  current_stock: number;
  gst_rate: string;
  discount: string;
  description: string;
  original_price: string;
  price: string;
  status: string;
  image: string | null;
  youtube?: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address1: string;
  address2: string;
  landmark: string;
  mobile: string;
  whatsapp: string;
  city: string;
  pincode: string;
  state: string;
  email?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  rate: string;
  originalPrice: string;
  discount: string;
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  total: number;
  discount: number;
  netAmount: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'paid' | 'delivered';
}

export type TimePeriod = 'Morning' | 'Afternoon' | 'Night';
export type ProductCategory = 
  | 'Rockets'
  | 'Ground Spinners'
  | 'Fountains'
  | 'Crackers'
  | 'Sparklers'
  | 'Roman Candles'
  | 'Wheels'
  | 'Bombs'
  | 'Chakras'
  | 'Flower Pots'
  | 'Smoke Bombs'
  | 'Other'; 