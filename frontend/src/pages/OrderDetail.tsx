import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { getOrderDetails } from "../store/slices/orderSlice";
import { RootState, AppDispatch } from "../store";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { order, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/orders")}
          sx={{ mb: 2 }}
        >
          Volver a Mis Pedidos
        </Button>
        <Typography variant="h4" gutterBottom>
          Detalles del Pedido
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          ID del Pedido: {order._id}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Productos
            </Typography>
            <List>
              {order.items.map((item) => (
                <ListItem
                  key={item._id}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`Cantidad: ${item.quantity}`}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="h6">
                Total: ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información de Envío
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Nombre: {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </Typography>
                <Typography variant="body1">
                  Teléfono: {order.shippingAddress.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Dirección: {order.shippingAddress.address}
                </Typography>
                <Typography variant="body1">
                  Ciudad: {order.shippingAddress.city}
                </Typography>
                <Typography variant="body1">
                  Estado: {order.shippingAddress.state}
                </Typography>
                <Typography variant="body1">
                  Código Postal: {order.shippingAddress.zipCode}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Estado del Pedido:
              </Typography>
              <Chip
                label={order.status.toUpperCase()}
                color={getStatusColor(order.status) as any}
                sx={{ fontWeight: "bold" }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" gutterBottom>
              Fecha del Pedido:
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" gutterBottom>
              Método de Pago:
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {order.paymentDetails.paymentMethod}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID de Pago: {order.paymentDetails.id}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetail;
