"use client";
import React, { useRef } from "react";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import './cat.css';

export default function Page() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // العرض الافتراضي
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // للحجم الكبير
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768, // للحجم المتوسط
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480, // للحجم الصغير
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  
  const sliderRef = useRef(null);

  return (
    <Container>
      <Box className="custom-box" sx={{ fontWeight: 600, color: "#DB4444", margin: "25px 0" }}>
        Categories
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: { xs: "24px", sm: "30px", md: "36px" }, color: "#000" }}>
          Browse By Category
        </Typography>
        <Box></Box>
      </Box>
      <Box sx={{ marginTop: "20px", position: "relative" }}>
        <Slider ref={sliderRef} {...settings}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                flexDirection: "column",
                gap: "10px",
                margin: "10px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                width: "180px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#DB4444",
                  color: "#fff",
                  borderColor: "#DB4444",
                }
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 40 }} />
              <Typography sx={{ fontWeight: 400 }}>Smart Watch</Typography>
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            display: "flex",
            gap: "10px",
            zIndex: 1,
            transform: "translateY(-50%)"
          }}
        >
          <ArrowBackIcon
            onClick={() => sliderRef.current.slickPrev()}
            sx={{ cursor: "pointer", fontSize: "30px" }}
          />
          <ArrowForwardIcon
            onClick={() => sliderRef.current.slickNext()}
            sx={{ cursor: "pointer", fontSize: "30px" }}
          />
        </Box>
      </Box>
    </Container>
  );
}
