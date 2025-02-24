import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, Review } from "../../types";
import { ProductState } from "../../types/redux";

interface ProductsResponse {
  products: Product[];
  page: number;
  pages: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  { page?: number; keyword?: string }
>("products/fetchProducts", async ({ page = 1, keyword = "" }) => {
  const { data } = await axios.get<ProductsResponse>(
    `/api/products?page=${page}&keyword=${keyword}`
  );
  return data;
});

export const fetchProductDetails = createAsyncThunk<Product, string>(
  "products/fetchProductDetails",
  async (id) => {
    const { data } = await axios.get<Product>(`/api/products/${id}`);
    return data;
  }
);

export const createReview = createAsyncThunk<
  void,
  { productId: string; review: Partial<Review> }
>("products/createReview", async ({ productId, review }) => {
  const { data } = await axios.post(
    `/api/products/${productId}/reviews`,
    review
  );
  return data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductsResponse>) => {
          state.loading = false;
          state.products = action.payload.products;
          state.page = action.payload.page;
          state.pages = action.payload.pages;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener productos";
      })
      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al obtener detalles del producto";
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear reseña";
      });
  },
});

export const { clearProductDetails, clearError } = productSlice.actions;
export default productSlice.reducer;
