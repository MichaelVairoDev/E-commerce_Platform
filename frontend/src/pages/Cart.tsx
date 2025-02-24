import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Button,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { AppDispatch, RootState } from "../store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { CartItem } from "../types/cart";

const Cart: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find((item) => item._id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1 && newQuantity <= item.stock) {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = (): number => {
    return items.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }} className="fade-in">
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <CartIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            ¡Agrega algunos productos para comenzar!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIcon />}
            sx={{ borderRadius: 2 }}
          >
            Continuar Comprando
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="fade-in">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Carrito de Compras
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            {items.map((item: CartItem) => (
              <Box key={item._id}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="img"
                      src={item.images[0]}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 1,
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Categoría: {item.category}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            px: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item._id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            sx={{
                              mx: 2,
                              minWidth: "40px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item._id, 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Seguir Comprando
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
                startIcon={<DeleteIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Vaciar Carrito
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              position: "sticky",
              top: 24,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Resumen del Pedido
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1">Envío</Typography>
                <Typography variant="body1" color="success.main">
                  Gratis
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Proceder al Pago
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
