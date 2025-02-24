// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Product types
export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
  specifications?: Specification;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
}

// Order types
export interface Order {
  _id: string;
  user: User;
  items: {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    product: string;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentDetails: {
    id: string;
    status: string;
    paymentMethod: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  page: number;
  pages: number;
}

// State types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
}

export interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
  paymentIntent: string | null;
}

export interface Specification {
  [key: string]: string;
}
