"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import Tooltip from "@mui/material/Tooltip";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";

export default function Page() {
  const [loadingStates, setLoadingStates] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);
  const dispdash = useDispatch();

  useEffect(() => {
    dispdash(getProductFlashSeals());
  }, [dispdash]);

  function addwishlistproduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return; // Stop executing if there's no token
    }
    try {
      dispdash(addWishList(id));
      toast.success(wishlistProducts?.data?.message);
    } catch (error) {
      toast.error(wishlistProducts?.data?.message);
    }
  }

  async function addToCartProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your cart.");
      return; // Stop executing if there's no token
    }
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispdash(addCart(id));
      toast.success(cartProducts?.data?.message);
    } catch (error) {
      toast.error(cartProducts?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <Container>
      <Box sx={{ fontWeight: 600, color: "#DB4444", marginBottom: "20px" }}>
        This Month
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: { xs: "24px", sm: "30px", md: "36px" }, color: "#000" }}>
          Best Selling Products
        </Typography>
        <Link
          href="/allProduct"
          style={{
            background: "#DB4444",
            padding: "12px 24px",
            borderRadius: "4px",
            color: "#fff",
            textDecoration: "none",
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          View All
        </Link>
      </Box>

      <Grid container spacing={4}>
        {Array.isArray(allProduct) && allProduct.slice(0, 4).map((el) => (
          <Grid item xs={12} sm={6} md={4} key={el.id}>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Link href={`/DetialsProduct/${el.id}/${el.category.name}`} style={{ textDecoration: "none" }}>
                <Avatar
                  src={el.imageCover}
                  variant="square"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <Box sx={{ textAlign: "left", marginTop: "15px" }}>
                  <Typography sx={{ fontWeight: "bold", color: "#000", marginBottom: "5px" }}>
                    {el.title}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography component="span" variant="body1" sx={{ fontWeight: 500, color: "#DB4444", marginRight: "10px" }}>
                      ${el.price}
                    </Typography>
                    <Typography component="span" variant="body1" sx={{ fontWeight: 600, color: "#000", fontSize: "14px" }}>
                      {el.ratingsAverage}
                    </Typography>
                  </Box>
                </Box>
              </Link>

              <Box
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Tooltip title="Add to Wishlist" arrow>
                  <FavoriteIcon 
                    onClick={(e) => {
                      e.stopPropagation(); // منع حدث النقر من الانتقال إلى العنصر الأب
                      addwishlistproduct(el._id);
                    }} 
                    sx={{ cursor: "pointer", color: "#000", fontSize: "20px" }} 
                  />
                </Tooltip>
              </Box>

              <Button
                onClick={() => addToCartProduct(el.id)}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "4px",
                  width: "100%",
                  "&:hover": { backgroundColor: "#c62828" },
                }}
              >
                {loadingStates[el.id] ? ( // إذا كان قيد التحميل، عرض مؤشر التحميل
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
