declare module "react";
declare module "react-dom/client";
declare module "react-redux";
declare module "@mui/material";
declare module "react-router-dom";
declare module "@mui/icons-material";
declare module "axios";
declare module "web-vitals";
declare module "@reduxjs/toolkit";

import { ThemeOptions } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { PayloadAction } from "@reduxjs/toolkit";
import { SelectChangeEvent } from "@mui/material/Select";
import { ReportHandler } from "web-vitals";

declare module "@mui/material/styles" {
  interface Palette {
    primary: Palette["primary"];
    secondary: Palette["secondary"];
    error: Palette["error"];
    warning: Palette["warning"];
    info: Palette["info"];
    success: Palette["success"];
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    grey: {
      [key: number]: string;
    };
    divider: string;
  }

  interface Theme {
    palette: Palette;
  }
}

declare module "@mui/material" {
  interface Color {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
}
