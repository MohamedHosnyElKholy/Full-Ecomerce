import React from 'react';
import Container from '@mui/material/Container';
import { Box, Grid, Typography, Avatar } from "@mui/material";
import imageone from "../../assets/one (1).png";
import imagetwo from "../../assets/one (2).png";
import imagethree from "../../assets/one (3).png";
import imagefour from "../../assets/one (4).png";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetIcon from '@mui/icons-material/Headset';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Page() {
  return (
    <Container>
      <Box className="custom-box" sx={{ fontWeight: 600, color: "#DB4444", mb: 2 }}>
        Featured
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: { xs: "column", sm: "row" }, // Responsive direction
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "36px", color: "#000" }}>
          New Arrival
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <Avatar src={imagetwo?.src} sx={{ width: '100%', height: '100%', borderRadius: 0 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Avatar src={imageone?.src} sx={{ width: '100%', height: '50%', borderRadius: 0 }} />

          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={6}>
              <Avatar src={imagethree?.src} sx={{ width: '100%', height: '100%', borderRadius: 0 }} />
            </Grid>

            <Grid item xs={6}>
              <Avatar src={imagefour?.src} sx={{ width: '100%', height: '100%', borderRadius: 0 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Grid for icons */}
      <Grid container spacing={2} sx={{ marginTop: '30px', textAlign: 'center' }}>
        {[
          {
            icon: <LocalShippingIcon sx={{ fontSize: '40px', color: '#fff' }} />,
            title: "FREE AND FAST DELIVERY",
            subtitle: "Free delivery for all orders over $140",
          },
          {
            icon: <HeadsetIcon sx={{ fontSize: '40px', color: '#fff' }} />,
            title: "24/7 CUSTOMER SERVICE",
            subtitle: "Friendly 24/7 customer support",
          },
          {
            icon: <CheckBoxIcon sx={{ fontSize: '40px', color: '#fff' }} />,
            title: "MONEY BACK GUARANTEE",
            subtitle: "We return money within 30 days",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#000',
                border: '2px solid #ccc',
                borderRadius: '8px',
                maxWidth: '250px',
                margin: '0 auto',
              }}
            >
              <Box
                sx={{
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#DB4444',
                  borderRadius: '50%',
                }}
              >
                {item.icon}
              </Box>
              <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>{item.title}</Typography>
              <Typography sx={{ color: '#fff' }}>{item.subtitle}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
