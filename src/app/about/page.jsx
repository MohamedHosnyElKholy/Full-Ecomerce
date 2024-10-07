import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import imageOne from "../../assets/istockphoto-1214561965-612x612.jpg";
import imageTwo from "../../assets/bussinesOne.png";
import imageThree from "../../assets/bussinesTwo.png";
import imageFour from "../../assets/bussinesThree.png";

export default function About() {
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: "25px" }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: { xs: "32px", sm: "40px", md: "54px" } }}>
            Our Story
          </Typography>
          <Typography sx={{ fontWeight: 400, marginBottom: "25px", fontSize: { xs: "14px", md: "16px" } }}>
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </Typography>
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer goods.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Avatar
            src={imageOne?.src}
            sx={{ width: "100%", height: { xs: "auto", md: "100%" }, borderRadius: 0 }}
          />
        </Grid>
        {/* Statistics Section */}
        {[
          { Icon: PeopleIcon, value: "10.5k", label: "Sellers active on our site" },
          { Icon: AttachMoneyIcon, value: "33k", label: "Monthly Product Sale" },
          { Icon: GroupIcon, value: "45.5k", label: "Customers active on our site" },
          { Icon: ShowChartIcon, value: "25k", label: "Annual gross sale on our site" },
        ].map(({ Icon, value, label }, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ marginY: "15px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                backgroundColor: "#000",
                border: "2px solid #ccc",
                borderRadius: "8px",
                maxWidth: "250px",
                margin: "0 auto",
              }}
            >
              <Icon
                sx={{
                  fontSize: "40px",
                  color: "#fff",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#DB4444",
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff" }}>{value}</Typography>
              <Typography sx={{ color: "#fff" }}>{label}</Typography>
            </Box>
          </Grid>
        ))}

        {/* Team Section */}
        {[
          { image: imageTwo, name: "Tom Cruise", title: "Founder & Chairman" },
          { image: imageThree, name: "Emma Watson", title: "Managing Director" },
          { image: imageFour, name: "Will Smith", title: "Product Designer" },
        ].map(({ image, name, title }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ marginY: "15px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                maxWidth: "250px",
                margin: "0 auto",
              }}
            >
              <Avatar src={image?.src} sx={{ width: "100%", height: { xs: "auto", md: "300px" }, borderRadius: 0 }} />
              <Typography>{name}</Typography>
              <Typography>{title}</Typography>
            </Box>
          </Grid>
        ))}

        {/* Additional Information Section */}
        {[
          {
            icon: <PeopleIcon sx={{ fontSize: "40px", color: "#fff", marginBottom: "15px", padding: "10px", backgroundColor: "#DB4444", borderRadius: "50%" }} />,
            title: "FREE AND FAST DELIVERY",
            description: "Free delivery for all orders over $140",
          },
          {
            icon: <GroupIcon sx={{ fontSize: "40px", color: "#fff", marginBottom: "15px", padding: "10px", backgroundColor: "#DB4444", borderRadius: "50%" }} />,
            title: "24/7 CUSTOMER SERVICE",
            description: "Friendly 24/7 customer support",
          },
          {
            icon: <ShowChartIcon sx={{ fontSize: "40px", color: "#fff", marginBottom: "15px", padding: "10px", backgroundColor: "#DB4444", borderRadius: "50%" }} />,
            title: "MONEY BACK GUARANTEE",
            description: "We return money within 30 days",
          },
        ].map(({ icon, title, description }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ marginY: "15px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
                backgroundColor: "#000",
                border: "2px solid #ccc",
                borderRadius: "8px",
                maxWidth: "250px",
                margin: "0 auto",
              }}
            >
              {icon}
              <Typography sx={{ color: "#fff", fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>{title}</Typography>
              <Typography sx={{ color: "#fff", fontSize: '14px', fontWeight: 400, textAlign: 'center' }}>
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
