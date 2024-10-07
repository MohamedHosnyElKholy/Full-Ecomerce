"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Avatar, Grid, Typography, Box, Button } from "@mui/material";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetilas } from "../../../lib/sliceDetialsProduct";
import { getProductFlashSeals } from "../../../lib/sliceProduct";
import Link from 'next/link';

export default function Page() {
  const { id } = useParams(); // استخدم id فقط
  const dispatch = useDispatch();

  const detialsProduct = useSelector((state) => state.getProductDetilasSlice.product);
  const products = useSelector((state) => state.getProductFlashSealsSlice.products);

  useEffect(() => {
    dispatch(getProductDetilas(id));
    dispatch(getProductFlashSeals());
  }, [id, dispatch]);

  const {
    title,
    price,
    sold,
    ratingsAverage,
    reviews = [],
    imageCover,
    images = [],
    brand = {},
    category: x = {},
    description,
  } = detialsProduct || {};

  const [activeImage, setActiveImage] = useState(imageCover);
  useEffect(() => {
    setActiveImage(imageCover);
  }, [imageCover]);

  // فلترة المنتجات ذات الصلة
  const relatedProducts = products.filter((el) => 
    el.category._id === x._id && el._id !== id // تأكد من أن المنتج ليس هو المنتج الحالي
  );

  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: "30px" }}>
        {/* صور المنتج المصغرة */}
        <Grid item xs={12} sm={6} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: { xs: "10px", md: "20px" },
              overflowX: { xs: "auto", md: "visible" },
            }}
          >
            {images.map((img, index) => (
              <Avatar
                key={index}
                src={img}
                variant="square"
                sx={{
                  width: { xs: "60px", md: "90px" },
                  height: { xs: "60px", md: "90px" },
                  borderRadius: "12px", // حواف أكثر نعومة
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // إضافة ظل خفيف
                  cursor: "pointer",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out", // تأثير تكبير خفيف عند التمرير
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  flexShrink: 0,
                }}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </Box>
        </Grid>
        
        {/* الصورة الرئيسية */}
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Avatar
              src={activeImage || imageCover}
              variant="square"
              sx={{
                width: "100%",
                height: { xs: "300px", md: "100%" },
                borderRadius: "16px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // ظل أعمق للصورة الرئيسية
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        
        {/* تفاصيل المنتج */}
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              padding: { xs: "20px", sm: "25px" },
              border: "1px solid #e0e0e0",
              borderRadius: "16px", // حواف دائرية بشكل أكبر
              backgroundColor: "#fafafa", // لون خلفية خفيف
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // ظل خفيف
              display: "flex",
              flexDirection: "column",
              gap: { xs: "15px", sm: "20px" },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700, // زيادة وزن الخط
                fontSize: { xs: "22px", md: "26px" }, // خط أكبر قليلاً
                fontFamily: "Inter",
                color: "#333", // لون غامق لراحة العين
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: "12px", sm: "25px" },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#555" }}>Sold: {sold}</Typography>
              <Typography sx={{ color: "#555" }}>
                Rating: {ratingsAverage} ({Array.isArray(reviews) ? reviews.length : 0} Reviews)
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "22px", md: "24px" },
                color: "#1976d2", // لون مميز للسعر
              }}
            >
              ${price}
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: { xs: "16px", md: "18px" },
                color: "#555",
              }}
            >
              {description}
            </Typography>
            <Typography sx={{ marginTop: "15px", fontWeight: 600, color: "#444" }}>
              Category: {x.name}
            </Typography>
            <Typography sx={{ marginTop: "5px", fontWeight: 600, color: "#444" }}>
              Brand: {brand.name}
            </Typography>
          </Box>
        </Grid>
      </Grid>


<Box sx={{ marginTop: "50px" }}>
  <Typography variant="h5" sx={{ marginBottom: "25px", fontWeight: 600 }}>
    Related Products
  </Typography>
  
  <Grid container spacing={4}>
    {relatedProducts.map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product._id}>
        <Link href={`/DetialsProduct/${product.id}/${product.category.name}`} passHref>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#fff", // خلفية بيضاء للمربع
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer",
              textDecoration: "none", // إزالة الخط تحت النص
            }}
          >
            <Avatar
              src={product.imageCover}
              variant="square"
              sx={{
                width: "100%",
                height: "200px",
                borderRadius: "12px",
                marginBottom: "10px",
                objectFit: "cover",
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "18px",
                color: "#333", // لون غامق
                marginBottom: "5px", // هوامش إضافية بين النصوص
              }}
            >
              {product.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#1976d2", // لون للسعر
                fontWeight: 500, // وزن خط أقل
                marginBottom: "0", // إزالة الهوامش السفلية
              }}
            >
              ${product.price}
            </Typography>
          </Box>
        </Link>
      </Grid>
    ))}
  </Grid>
</Box>

    </Container>
  );
}
