"use client";
import React, { useRef, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Countdown from "react-countdown";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Wishlist icon
import "./flash.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";
import Image from 'next/image';

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
  const allProduct = useSelector(
    (state) => state.getProductFlashSealsSlice.products
  );
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);

  const dispdash = useDispatch();
  useEffect(() => {
    dispdash(getProductFlashSeals());
  }, [dispdash]);

  function addWishlistProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return; // Stop executing if there's no token
    }
    try {
      dispdash(addWishList(id));
      toast.success(wishlistProducts?.data?.message || "Added to wishlist!");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding.");
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
      toast.success(cartProducts?.data?.message || "Added to cart!");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides shown
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // Very large screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Medium-sized screens (like desktops)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const sliderRef = useRef(null);
  const totalSeconds = 60 * 60 * 24 * 200;

  const Completionist = () => <span>You are good to go!</span>;

  const [countdownDate, setCountdownDate] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEndDate = localStorage.getItem("countdownEndDate");
      if (storedEndDate) {
        setCountdownDate(Number(storedEndDate));
      } else {
        const newEndDate = Date.now() + totalSeconds * 1000;
        setCountdownDate(newEndDate);
        localStorage.setItem("countdownEndDate", newEndDate);
      }
    }
  }, []);

  if (countdownDate === null) {
    // You can show a loading indicator here if you want
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: { xs: "10px", md: "25px" } }}>
      <Box className="custom-box" sx={{ fontWeight: 600, color: "#DB4444" }}>
        Today’s
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Change direction for small screens
          gap: { xs: "20px", md: "100px" },
          alignItems: { xs: "flex-start", md: "center" },
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "24px", md: "36px" },
            color: "#000",
          }}
        >
          Flash Sales
        </Typography>
        <Box>
          <Countdown
            date={countdownDate}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <Completionist />;
              } else {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px", // Make the gap smaller for small screens
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        days
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "24px", md: "32px" },
                          color: "#000",
                        }}
                      >
                        {days} :
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        hours
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "24px", md: "32px" },
                          color: "#000",
                        }}
                      >
                        {hours} :
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        minutes
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "24px", md: "32px" },
                          color: "#000",
                        }}
                      >
                        {minutes} :
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        seconds
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "24px", md: "32px" },
                          color: "#000",
                        }}
                      >
                        {seconds}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ marginTop: "20px", position: "relative" }}>
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(allProduct) &&
            allProduct.slice(0, 20).map((el) => (
              <Card
                key={el.id}
                sx={{
                  maxWidth: { xs: "100%", md: 345 }, // Make the width flexible
                  margin: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
                }}
              >
                <Link
                  href={`/DetialsProduct/${el.id}/${el.category.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Image
                src={el.imageCover} // رابط الصورة
                alt={el.name} // وصف الصورة
                width={200} // استبدل بالقيمة المناسبة
                height={200} // استبدل بالقيمة المناسبة
                style={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    objectFit: 'cover', // للحفاظ على تناسق الصورة
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
                      <FavoriteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          addWishlistProduct(el.id);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            ))}
        </Slider>

        <Box
          sx={{
            position: "absolute",
            top: "-20px",
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
