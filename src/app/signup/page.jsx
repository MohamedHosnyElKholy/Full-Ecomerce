"use client";
import React, { useState } from "react";
import img1 from "../../assets/dl.beatsnoop 1.svg";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Avatar,
  Box,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux"; // استيراد useDispatch
import FormControl from "@mui/material/FormControl";
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    rePassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long"),
  });
  async function handleReg(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(response);
      localStorage.setItem('token', response.data.token);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // تأكد من تعيينها إلى false هنا
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => handleReg(values),
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
            Create an account
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
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <Input
                id="name-input"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.name && formik.touched.name && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.name}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="email-input">Email or Phone Number</InputLabel>
              <Input
                id="email-input"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <Input
                id="password-input"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.password && formik.touched.password && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.password}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="rePassword-input">Confirm Password</InputLabel>
              <Input
                id="rePassword-input"
                type="password"
                name="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.rePassword}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="phone-input">Phone Number</InputLabel>
              <Input
                id="phone-input"
                type="tel"
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
              {loading ? <CircularProgress/> : "Create Account"}
            </Button>
            <Typography sx={{ fontWeight: 400, textAlign: "center" }}>
              Already have an account?
              <Link
                href="/login"
                style={{
                  textDecoration: "underline",
                  color: "#DB4444",
                  fontWeight: 500,
                  marginLeft: "5px",
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
