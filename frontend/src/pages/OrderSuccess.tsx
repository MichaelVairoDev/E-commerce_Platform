import React from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          ¡Pedido Realizado con Éxito!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un
          correo con los detalles.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/orders")}
          >
            Ver Mis Pedidos
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Volver a la Tienda
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
