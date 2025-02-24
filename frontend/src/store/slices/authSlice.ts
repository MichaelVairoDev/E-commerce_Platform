import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileData,
  User,
} from "../../types/auth";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const { data } = await axios.post("/api/auth/login", credentials);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials) => {
    const { data } = await axios.post("/api/auth/register", credentials);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
);

export const updateProfile = createAsyncThunk<User, UpdateProfileData>(
  "auth/updateProfile",
  async (updateData) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;
    const { data } = await axios.put("/api/users/profile", updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      ...data,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return { success: true };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al iniciar sesión";
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al registrarse";
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al actualizar el perfil";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
