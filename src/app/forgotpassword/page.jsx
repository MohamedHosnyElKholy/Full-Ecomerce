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

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(response);
      toast.success(response.data.message);
      route.push('/restCode');
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => handleSubmit(values),
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
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            fontSize={"16px"}
            marginBottom={"30px"}
            color={"#555"}
          >
            Enter your email to receive a reset link
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="email-input">Email</InputLabel>
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
              {loading ? <CircularProgress/> : "Verity"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
