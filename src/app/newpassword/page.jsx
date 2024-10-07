"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values, {token}
      );
      console.log(response);
      
      toast.success("Password reset successfully!");
      localStorage.setItem("Newtoken", response.data.token);
      route.push("/login"); // Redirect after success
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }finally{
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
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
        <Grid item xs={12} sm={6} md={5} padding={"70px"}>
          <Typography
            variant="h1"
            fontWeight={500}
            fontSize={"36px"}
            marginBottom={"20px"}
            color={"#000"}
          >
            Reset Password
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <Input
                id="email-input"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography variant="body2" color="error" sx={{ marginTop: "8px" }}>
                  {formik.errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="new-password-input">New Password</InputLabel>
              <Input
                id="new-password-input"
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <Typography variant="body2" color="error" sx={{ marginTop: "8px" }}>
                  {formik.errors.newPassword}
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
              {loading ? <CircularProgress/> : "Rest Passowrd"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
