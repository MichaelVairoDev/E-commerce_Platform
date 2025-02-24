import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Paper,
  Box,
  Chip,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Loop as ReturnIcon,
} from "@mui/icons-material";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProductDetails } from "../store/slices/productSlice";
import { AppDispatch, RootState } from "../store/store";
import { Product, Review } from "../types/Product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || "Producto no encontrado"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="fade-in">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: 2,
              position: "relative",
              mb: 2,
            }}
            className="hover-shadow"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.3s ease-in-out",
              }}
              className="hover-lift"
            />
            <Chip
              label={product.category}
              color="primary"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
              }}
            />
          </Paper>
          {product.images.length > 1 && (
            <Grid container spacing={1}>
              {product.images.slice(1).map((image: string, index: number) => (
                <Grid item xs={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      overflow: "hidden",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 2}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 4 } }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews.length} reseñas)
              </Typography>
              <Chip
                label={product.stock > 0 ? "En Stock" : "Agotado"}
                color={product.stock > 0 ? "success" : "error"}
                size="small"
                sx={{ ml: 2 }}
              />
            </Box>

            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 3, fontWeight: "bold" }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Paper
              elevation={0}
              sx={{ bgcolor: "grey.50", p: 2, mb: 3, borderRadius: 2 }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontWeight: "medium" }}>
                Descripción:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
            </Paper>

            {product.specifications && (
              <Paper
                elevation={0}
                sx={{ bgcolor: "grey.50", p: 2, mb: 3, borderRadius: 2 }}
              >
                <Typography
                  variant="body1"
                  sx={{ mb: 2, fontWeight: "medium" }}
                >
                  Especificaciones:
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Typography variant="body2" color="text.secondary">
                          {`${key}: ${value}`}
                        </Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              </Paper>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Cantidad:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  size="small"
                  sx={{ bgcolor: "action.hover" }}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantity}
                  type="number"
                  InputProps={{ readOnly: true }}
                  size="small"
                  sx={{ width: "80px" }}
                />
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  size="small"
                  sx={{ bgcolor: "action.hover" }}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {product.stock} disponibles
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              fullWidth
              disabled={product.stock === 0}
              sx={{
                py: 1.5,
                mb: 3,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              {product.stock === 0 ? "Producto Agotado" : "Agregar al Carrito"}
            </Button>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <ShippingIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2">Envío Gratis</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <SecurityIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2">Pago Seguro</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <ReturnIcon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="body2">Devolución Fácil</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {product.reviews && product.reviews.length > 0 && (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{ p: 3, mt: 4, bgcolor: "grey.50", borderRadius: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Reseñas de Clientes
              </Typography>
              <Grid container spacing={3}>
                {product.reviews.map((review: Review, index: number) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {review.userName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 2 }}
                        >
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1">{review.comment}</Typography>
                    </Box>
                    {index < product.reviews.length - 1 && <Divider />}
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProductDetail;
