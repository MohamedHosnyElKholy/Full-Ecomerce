"use client";
import React, { useState } from "react";
import img1 from "../../assets/dl.beatsnoop 1.svg";
import {
  Avatar,
  Box,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getWishLits, deleteWishList } from "../lib/sliceWishlist";
import { cheakOut} from "../lib/sliceCart";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only"),
    details: Yup.string()
      .required("Details are required"),
    city: Yup.string()
      .required("City is required"),
  });

  
  const { products:cheakCart } = useSelector((state) => state.cart); // تأكد من اسم الـ slice


const didpatch = useDispatch();

const sessions = cheakCart?.data?.session?.url;

async function handleReg({ cartId, url, values }) {
  try{
    setLoading(true)
    await didpatch(cheakOut({ cartId, url, formdData: values })); // استخدم await في حالة أن العملية تأخذ وقت
    if(sessions){
      route.push(sessions);
    }else{
      console.log("no found")
    }
  }
  catch{
  }
  finally{
    setLoading(false)
  }
}

const formik = useFormik({
  initialValues: {
    phone: "",
    details: "",
    city: "",
  },
  onSubmit: (values) => handleReg({ cartId: '6701d5baf9d4967782a1ead7', url: 'http://localhost:3000', values }),
  validationSchema,
});









  return (
    <Box sx={{ padding: "20px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Grid item xs={12} sm={12} md={7}>
          <Avatar
            src={img1?.src}
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5} padding={"70px"}>
          <Typography
            variant="h1"
            fontWeight={500}
            fontSize={"36px"}
            marginBottom={"20px"}
            color={"#000"}
          >
             Complete Your Purchase
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            fontSize={"16px"}
            marginBottom={"30px"}
            color={"#555"}
          >
            Enter your details below
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="phone-input">Phone Number</InputLabel>
              <Input
                id="phone-input"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.phone && formik.touched.phone && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.phone}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="details-input">Details</InputLabel>
              <Input
                id="details-input"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.details && formik.touched.details && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.details}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="city-input">City</InputLabel>
              <Input
                id="city-input"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.city && formik.touched.city && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.city}
                </Typography>
              )}
            </FormControl>

           <Button
  type="submit"
  variant="contained"
  sx={{
    backgroundColor: "#DB4444",
    fontWeight: 500,
    marginBottom: "20px",
    color: "#fff",
    borderRadius: "4px",
    width: "100%",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#c03939",
    },
  }}
>
  {loading ? <CircularProgress /> : "Proceed to Checkout"}
</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
