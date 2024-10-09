"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Image from 'next/image';
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // حالة لمصطلح البحث
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  function addwishlistproduct(id) {
    try {
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  async function addToCartProduct(id) {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(addCart(id));
      toast.success(cartProducts?.data?.message);
    } catch (error) {
      toast.error(cartProducts?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  // تحديث مصطلح البحث
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  // فلترة المنتجات بناءً على مصطلح البحث والفئة
  const filteredProducts = allProduct?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 600, margin: "20px 0" }}>
        All Products
      </Typography>

      {/* حقل البحث */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* خيارات الفلترة */}
      <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
      </FormControl>

      <Grid container spacing={3}>
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  position: 'relative',
                }}
              >
                <Link
                  href={`/DetialsProduct/${product.id}/${product.category.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Image
                    src={product.imageCover}
                    width={200}
                    height={200}
                    sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                  <Typography variant="h6" sx={{ margin: "10px 0" }}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#DB4444", fontWeight: 500 }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ margin: "10px 0", color: "#555" }}
                  >
                    {product.description.slice(0, 50)}...
                  </Typography>
                </Link>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartProduct(product.id);
                  }}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "4px",
                    "&:hover": { backgroundColor: "#c62828" },
                  }}
                >
                  {loadingStates[product.id] ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
                <Tooltip title="Add to Wishlist" arrow>
                  <IconButton aria-label="add to wishlist">
                    <FavoriteIcon onClick={(e) => {
                      e.stopPropagation();
                      addwishlistproduct(product.id);
                    }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No products available.</Typography>
        )}
      </Grid>
    </Container>
  );
}
