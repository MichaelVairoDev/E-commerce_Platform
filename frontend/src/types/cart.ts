import { Product } from "./Product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface UpdateQuantityPayload {
  productId: string;
  quantity: number;
}
