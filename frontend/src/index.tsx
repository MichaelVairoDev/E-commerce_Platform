import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import store from "./store";

// Configurar la URL base para las peticiones de axios
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

// Configurar interceptores de axios para el token
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configurar interceptores de axios para errores
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      throw new Error(error.response.data.message || "Error en la petición");
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error("No se pudo conectar con el servidor");
    } else {
      // Algo sucedió en la configuración de la petición
      throw new Error("Error al realizar la petición");
    }
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
