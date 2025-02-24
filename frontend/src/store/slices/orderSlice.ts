import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "../../types";
import { OrderState } from "../../types/redux";

const initialState: OrderState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
  paymentIntent: null,
};

export const createOrder = createAsyncThunk<Order, Partial<Order>>(
  "orders/createOrder",
  async (orderData) => {
    const { data } = await axios.post<Order>("/api/orders", orderData);
    return data;
  }
);

export const getOrderDetails = createAsyncThunk<Order, string>(
  "orders/getOrderDetails",
  async (id) => {
    const { data } = await axios.get<Order>(`/api/orders/${id}`);
    return data;
  }
);

export const getMyOrders = createAsyncThunk<Order[]>(
  "orders/getMyOrders",
  async () => {
    const { data } = await axios.get<Order[]>("/api/orders/myorders");
    return data;
  }
);

interface PaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = createAsyncThunk<string, number>(
  "orders/createPaymentIntent",
  async (amount) => {
    const { data } = await axios.post<PaymentIntentResponse>(
      "/api/orders/create-payment-intent",
      { amount }
    );
    return data.clientSecret;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
    clearPaymentIntent: (state) => {
      state.paymentIntent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear la orden";
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrderDetails.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al obtener detalles de la orden";
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMyOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener órdenes";
      })
      // Create Payment Intent
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPaymentIntent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.paymentIntent = action.payload;
        }
      )
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al crear intención de pago";
      });
  },
});

export const { clearOrder, clearPaymentIntent } = orderSlice.actions;
export default orderSlice.reducer;
