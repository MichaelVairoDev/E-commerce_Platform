import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import {
  PayPalButtons,
  PayPalScriptProvider,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { clearCart } from "../store/slices/cartSlice";
import axios from "axios";

const steps = ["Información de Envío", "Método de Pago", "Confirmar Orden"];

type ShippingData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
};

const initialPayPalOptions = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || "test",
  currency: "USD",
  intent: "capture",
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validar campos del formulario de envío
      const requiredFields: (keyof ShippingData)[] = [
        "firstName",
        "lastName",
        "address",
        "city",
        "state",
        "zipCode",
        "phone",
      ];
      const isValid = requiredFields.every(
        (field) => shippingData[field].trim() !== ""
      );

      if (!isValid) {
        setPaymentError("Por favor completa todos los campos requeridos");
        return;
      }
    }
    setPaymentError("");
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setPaymentError("");
  };

  const createOrder = async (paypalOrderId: string, paymentDetails: any) => {
    try {
      const orderData = {
        items: cart.items,
        shippingAddress: shippingData,
        totalAmount: calculateTotal(),
        paymentDetails: {
          id: paypalOrderId,
          status: paymentDetails.status,
          paymentMethod: "PayPal",
        },
      };

      const response = await axios.post("/api/orders", orderData);

      if (response.data) {
        dispatch(clearCart());
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setPaymentError(
        "Error al procesar la orden. Por favor intenta nuevamente."
      );
    }
  };

  const renderPayPalButtons = () => (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <Box sx={{ maxWidth: 400, mx: "auto", my: 2 }}>
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          style={{
            layout: "vertical",
            shape: "rect",
            color: "blue",
            label: "pay",
            height: 45,
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: calculateTotal().toString(),
                  },
                  description: `Compra en E-commerce - Total: $${calculateTotal().toFixed(
                    2
                  )} USD`,
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              setLoading(true);
              if (actions.order) {
                const details = await actions.order.capture();
                await createOrder(data.orderID, details);
                setLoading(false);
              }
            } catch (error) {
              setLoading(false);
              setPaymentError(
                "Error al procesar el pago. Por favor intenta nuevamente."
              );
              console.error("PayPal Error:", error);
            }
          }}
          onError={(err) => {
            setPaymentError("Error en el pago. Por favor intenta nuevamente.");
            console.error("PayPal Error:", err);
          }}
          onCancel={() => {
            setPaymentError("Pago cancelado. Por favor intenta nuevamente.");
          }}
        />
      </Box>
    </PayPalScriptProvider>
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nombre"
                name="firstName"
                value={shippingData.firstName}
                onChange={handleInputChange}
                error={
                  paymentError !== "" && shippingData.firstName.trim() === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Apellido"
                name="lastName"
                value={shippingData.lastName}
                onChange={handleInputChange}
                error={
                  paymentError !== "" && shippingData.lastName.trim() === ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Dirección"
                name="address"
                value={shippingData.address}
                onChange={handleInputChange}
                error={
                  paymentError !== "" && shippingData.address.trim() === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Ciudad"
                name="city"
                value={shippingData.city}
                onChange={handleInputChange}
                error={paymentError !== "" && shippingData.city.trim() === ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Estado/Provincia"
                name="state"
                value={shippingData.state}
                onChange={handleInputChange}
                error={paymentError !== "" && shippingData.state.trim() === ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Código Postal"
                name="zipCode"
                value={shippingData.zipCode}
                onChange={handleInputChange}
                error={
                  paymentError !== "" && shippingData.zipCode.trim() === ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Teléfono"
                name="phone"
                value={shippingData.phone}
                onChange={handleInputChange}
                error={paymentError !== "" && shippingData.phone.trim() === ""}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Pagar con PayPal
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Total a pagar: ${calculateTotal().toFixed(2)} USD
            </Typography>
            {renderPayPalButtons()}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Resumen de la Orden
            </Typography>
            <List>
              {cart.items.map((item) => (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Cantidad: ${item.quantity}`}
                  />
                  <Typography variant="body1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{ mt: 2 }}
        >
          Continuar Comprando
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {paymentError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {paymentError}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {renderStepContent(activeStep)}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" gutterBottom>
                Resumen de Compra
              </Typography>
              <List>
                {cart.items.map((item) => (
                  <ListItem key={item._id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Cantidad: ${item.quantity}`}
                    />
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
          >
            Atrás
          </Button>
          {activeStep !== 1 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : activeStep === steps.length - 1 ? (
                "Confirmar Orden"
              ) : (
                "Siguiente"
              )}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
