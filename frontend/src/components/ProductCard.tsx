import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  useTheme,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { AppDispatch } from "../store/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Card
      className="hover-lift hover-shadow smooth-transition"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]}
            alt={product.name}
            sx={{
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Link>
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "primary.main",
            color: "white",
            fontWeight: "medium",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              fontSize: "1.1rem",
              lineHeight: 1.2,
              mb: 1,
              height: "2.4em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </Typography>
        </Link>

        <Box sx={{ mb: 2 }}>
          <Rating
            value={product.rating}
            readOnly
            size="small"
            sx={{ color: theme.palette.warning.main }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              height: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Agregar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
