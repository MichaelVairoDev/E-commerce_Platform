import { PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { User, Product, Order, CartItem, Review } from "./index";

// Auth Types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Product Types
export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
}

// Cart Types
export interface CartState {
  items: CartItem[];
}

// Order Types
export interface OrderState {
  order: Order | null;
  orders: Order[];
  loading: boolean;
  error: string | null;
  paymentIntent: string | null;
}

// Theme Types
export interface ThemeState {
  mode: "light" | "dark";
}

// Action Types
export type ThemePayload = PayloadAction<Theme>;
export type SelectPayload = SelectChangeEvent;
export type ProductPayload = PayloadAction<Product>;
export type CartItemPayload = PayloadAction<CartItem>;
export type OrderPayload = PayloadAction<Order>;
export type UserPayload = PayloadAction<User>;
export type ErrorPayload = PayloadAction<string>;
export type LoadingPayload = PayloadAction<boolean>;
export type ReviewPayload = PayloadAction<Review>;
