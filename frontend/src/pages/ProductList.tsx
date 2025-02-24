import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { Product } from "../types/Product";
import SearchIcon from "@mui/icons-material/Search";

const categories = [
  "Todos",
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
  "other",
];

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error, pages } = useSelector(
    (state: RootState) => state.product
  );

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("keyword") || ""
  );
  const [category, setCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    const page = parseInt(searchParams.get("page") || "1");
    dispatch(fetchProducts({ keyword, page }));
  }, [dispatch, searchParams]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("keyword", searchTerm.trim());
    }
    params.set("page", "1");
    setCurrentPage(1);
    setSearchParams(params);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    setSearchParams(params);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const getSortedProducts = () => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "priceAsc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "ratingDesc":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return sortedProducts;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const sortedProducts = getSortedProducts();

  const filteredProducts =
    category === "Todos"
      ? sortedProducts
      : sortedProducts.filter(
          (product: Product) => product.category === category.toLowerCase()
        );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Productos
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
          <TextField
            fullWidth
            label="Buscar productos"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ minWidth: "auto", px: 3 }}
          >
            <SearchIcon />
          </Button>
        </Box>

        <TextField
          select
          label="Categoría"
          value={category}
          onChange={handleCategoryChange}
          sx={{ minWidth: 200 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Ordenar por</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy}
            label="Ordenar por"
            onChange={handleSortChange}
          >
            <MenuItem value="newest">Más recientes</MenuItem>
            <MenuItem value="priceAsc">Precio: Menor a Mayor</MenuItem>
            <MenuItem value="priceDesc">Precio: Mayor a Menor</MenuItem>
            <MenuItem value="ratingDesc">Mejor valorados</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron productos
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product: Product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {pages > 1 && (
        <Box display="flex" justifyContent="center" my={4}>
          <Pagination
            count={pages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
