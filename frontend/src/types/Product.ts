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

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Specification {
  [key: string]: string;
}
