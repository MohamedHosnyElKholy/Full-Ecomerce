"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Button, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import Tooltip from "@mui/material/Tooltip";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const [loadingStates, setLoadingStates] = useState({});

  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  function addwishlistproduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return; // Stop executing if there's no token
    }
    try {
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  async function addToCartProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your cart.");
      return; // Stop executing if there's no token
    }
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  return (
    <Container>
      <Box className="custom-box" sx={{ fontWeight: 600, color: "#000", textAlign: "center", marginBottom: "20px", fontSize: { xs: '24px', md: '36px' } }}>
        Explore Products
      </Box>
      <Box sx={{ marginTop: "20px", position: "relative" }}>
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(allProduct) &&
            allProduct.slice(0, 20).map((el) => (
              <Card
                key={el.id}
                sx={{
                  maxWidth: { xs: '100%', sm: 345 }, // يحدد العرض الأقصى بناءً على حجم الشاشة
                  margin: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
                }}
              >
                <Link
                  href={`/DetialsProduct/${el.id}/${el.category.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    height="300px"
                    width="100%"
                    image={el.imageCover}
                    alt={el.name}
                    sx={{
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 600, color: "#333", mb: 1 }}
                    >
                      {el.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {el.description.length > 50
                        ? `${el.description.slice(0, 50)}...`
                        : el.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      <span>${el.price}</span>
                    </Typography>
                  </CardContent>
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <Button
                    onClick={() => addToCartProduct(el.id)}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "4px",
                      "&:hover": { backgroundColor: "#c62828" },
                    }}
                  >
                    {loadingStates[el.id] ? (
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                  <Tooltip title="Add to Wishlist" arrow>
                    <IconButton aria-label="add to wishlist">
                      <FavoriteIcon onClick={(e) => { 
                        e.stopPropagation(); 
                        addwishlistproduct(el.id); 
                      }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            ))}
        </Slider>
        <Box
          sx={{
            position: "absolute",
            top: "10px", // يمكن تعديل هذا الموقع حسب الحاجة
            right: "10px",
            display: "flex",
            gap: "10px",
            zIndex: 1,
          }}
        >
          <ArrowBackIcon
            onClick={() => sliderRef.current.slickPrev()}
            sx={{ cursor: "pointer" }}
          />
          <ArrowForwardIcon
            onClick={() => sliderRef.current.slickNext()}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Link
            href="/allProduct"
            style={{
              background: "#DB4444",
              padding: "16px 48px",
              borderRadius: "4px",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            View All
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
