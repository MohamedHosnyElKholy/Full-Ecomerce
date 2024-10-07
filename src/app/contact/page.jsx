"use client";
import React from "react";
import Container from "@mui/material/Container";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";

export default function Contact() {
  return (
    <Container
      sx={{
        minHeight: "100vh", // لضمان أن المحتوى يأخذ على الأقل ارتفاع الشاشة بالكامل
        display: "flex",
        alignItems: "center", // المحاذاة الرأسية
        justifyContent: "center", // المحاذاة الأفقية
        padding: { xs: "20px 0", sm: "40px 0" }, // تعديل الـ padding بشكل متجاوب
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* معلومات الاتصال */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            borderRight: { md: "2px solid #e0e0e0" },
            paddingRight: { md: "20px" },
            marginBottom: { xs: "30px", md: "0" },
          }}
        >
          <Box sx={{ marginBottom: { xs: "20px", sm: "30px" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "8px", sm: "10px" },
                flexDirection: { xs: "column", sm: "row" }, // تغيير الاتجاه للشاشات الصغيرة
              }}
            >
              <PhoneIcon
                sx={{
                  backgroundColor: "#DB4444",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: { xs: "15px", sm: "20px" }, // تعديل الـ padding بشكل متجاوب
                  fontSize: { xs: "40px", sm: "50px" }, // زيادة حجم الأيقونة بشكل متجاوب
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, textAlign: { xs: "center", sm: "left" } }}>
                Call To Us
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                color: "#555",
                marginTop: "10px",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              We are available 24/7, 7 days a week.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 500,
                marginTop: "10px",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Phone: +8801611112222
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "8px", sm: "10px" },
                flexDirection: { xs: "column", sm: "row" }, // تغيير الاتجاه للشاشات الصغيرة
              }}
            >
              <MessageIcon
                sx={{
                  backgroundColor: "#DB4444",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: { xs: "15px", sm: "20px" }, // تعديل الـ padding بشكل متجاوب
                  fontSize: { xs: "40px", sm: "50px" }, // زيادة حجم الأيقونة بشكل متجاوب
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, textAlign: { xs: "center", sm: "left" } }}>
                Write To Us
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                color: "#555",
                marginTop: "10px",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Fill out our form and we will contact you within 24 hours.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 500,
                marginTop: "10px",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Emails: customer@exclusive.com
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 500,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              support@exclusive.com
            </Typography>
          </Box>
        </Grid>

        {/* النموذج */}
        <Grid item xs={12} sm={6} md={9}>
          <Box
            component="form"
            sx={{
              backgroundColor: "#f9f9f9",
              padding: { xs: "20px", sm: "30px" }, // تعديل الـ padding بشكل متجاوب
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container spacing={3}>
              {/* حقل الاسم */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#555" } }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />
              </Grid>
              {/* حقل البريد الإلكتروني */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#555" } }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />
              </Grid>
              {/* حقل الهاتف */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#555" } }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />
              </Grid>

              {/* حقل الرسالة */}
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#555" } }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />
              </Grid>

              {/* زر إرسال الرسالة */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#DB4444",
                    padding: { xs: "10px 20px", sm: "12px 24px" }, // تعديل الـ padding بشكل متجاوب
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#c73c3c",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
