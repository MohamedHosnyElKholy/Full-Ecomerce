"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from '@mui/icons-material/Favorite'; // استيراد الأيقونة
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [loadingStates, setLoadingStates] = useState({});

  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products); // تأكد من أنك تصل إلى `products`
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);
  function addwishlistproduct(id) {
    try{
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message)
    }catch(erorr) {
      toast.error(erorr?.data?.message)
    }
  }
  async function addToCartProduct(id) {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));

      await dispatch(addCart(id));
      toast.success(cartProducts?.data?.message);
    } catch (erorr) {
      toast.error(cartProducts?.data?.message);
    } finally {        setLoadingStates((prev) => ({ ...prev, [id]: false }));
  }
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 600, margin: "20px 0" }}>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(allProduct) && allProduct.length > 0 ? ( // تحقق مما إذا كانت `allProduct` مصفوفة
          allProduct.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                  position: 'relative', // لجعل الأيقونة تتداخل بشكل صحيح
                }}
              >
                <Link
                  href={`/DetialsProduct/${product.id}/${product.category.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Avatar
                    src={product.imageCover}
                    sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                  <Typography variant="h6" sx={{ margin: "10px 0" }}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#DB4444", fontWeight: 500 }}
                  >
                    ${product.price} {/* إضافة رمز الدولار */}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ margin: "10px 0", color: "#555" }}
                  >
                    {product.description.slice(0, 50)}... {/* اختصار الوصف */}
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
                    {loadingStates[product.id] ? ( // إذا كان قيد التحميل، عرض مؤشر التحميل
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                {/* زر المفضلة يظهر دائمًا */}
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
          <Typography variant="body1">No products available.</Typography> // رسالة إذا لم يكن هناك منتجات
        )}
      </Grid>
    </Container>
  );
}
