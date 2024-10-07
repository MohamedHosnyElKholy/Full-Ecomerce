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
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d+$/, "Reset code must be numeric"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      // هنا يمكنك إرسال كود إعادة التعيين إلى الخادم للتحقق
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      toast.success('Sucsess');
      // إذا تم التحقق بنجاح، يمكنك توجيه المستخدم إلى صفحة إعادة تعيين كلمة المرور
      route.push('/newpassword');
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
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
            Verify Reset Code
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            fontSize={"16px"}
            marginBottom={"30px"}
            color={"#555"}
          >
            Enter the reset code sent to your email
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
              <InputLabel htmlFor="reset-code-input">Reset Code</InputLabel>
              <Input
                id="reset-code-input"
                name="resetCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px", fontWeight: 400 }}
                >
                  {formik.errors.resetCode}
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
