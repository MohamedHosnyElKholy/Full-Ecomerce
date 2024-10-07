import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Avatar,
} from "@mui/material";
import imageone from "../../assets/Qrcode 1.svg";
import imagetwo from "../../assets/download-appstore.svg";
import imagethree from "../../assets/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg";

export default function Footer() {
  return (
    <>
      <Box sx={{ backgroundColor: "#000000", padding: "30px", color: "#fff" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {/* العمود الأول */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                fontWeight={700}
                fontSize={"24px"}
                marginBottom={"15px"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Exclusive
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={"20px"}
                lineHeight={"28px"}
                marginBottom={"15px"}
                display={"flex"}
                color="#FAFAFA"
              >
                Subscribe
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                marginBottom={"20px"}
                display={"flex"}
                color="#FAFAFA"
              >
                Get 10% off your first order
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    color: "#fff",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#fff",
                  },
                }}
              />
            </Grid>

            {/* العمود الثاني */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                fontWeight={500}
                fontSize={"20px"}
                lineHeight={"28px"}
                marginBottom={"15px"}
                display={"flex"}
                color="#FAFAFA"
              >
                Support
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                marginBottom={"15px"}
                display={"flex"}
                color="#FAFAFA"
              >
                111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                marginBottom={"15px"}
                display={"flex"}
                color="#FAFAFA"
              >
                exclusive@gmail.com
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                marginBottom={"15px"}
                display={"flex"}
                color="#FAFAFA"
              >
                +88015-88888-9999
              </Typography>
            </Grid>

            {/* العمود الثالث */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                fontWeight={500}
                fontSize={"20px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"28px"}
                color="#FAFAFA"
              >
                Account
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                My Account
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Login / Register
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Cart
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Wishlist
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Shop
              </Typography>
            </Grid>

            {/* العمود الرابع */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                fontWeight={500}
                fontSize={"20px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"28px"}
                color="#FAFAFA"
              >
                Quick Link
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Privacy Policy
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                marginBottom={"15px"}
                display={"flex"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Terms Of Use
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                FAQ
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={"16px"}
                lineHeight={"24px"}
                color="#FAFAFA"
              >
                Contact
              </Typography>
            </Grid>

            {/* العمود الخامس */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                fontWeight={500}
                fontSize={"20px"}
                marginBottom={"15px"}
                lineHeight={"28px"}
                color="#FAFAFA"
              >
                Download App
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={"12px"}
                display={"flex"}
                lineHeight={"18px"}
                color="#FAFAFA"
              >
                Save $3 with App New User Only
              </Typography>
              <Box sx={{ display: "flex", marginTop: "15px", gap: "5px" }}>
                <Box
                  component="img"
                  src={imageone?.src}
                  alt="Image One"
                  sx={{ borderRadius: 0, width: "100%", height: "100%" }} // يمكنك تعديل الأبعاد حسب احتياجك
                />
                <Box>
                  <Box
                    component="img"
                    alt="App Store"
                    src={imagetwo?.src}
                    sx={{ borderRadius: 0, width: "100%", marginBottom: '10px' }} // يمكنك تعديل الأبعاد حسب احتياجك
                  />
                  <Box
                    component="img"
                    alt="Google Play"
                    src={imagethree?.src}
                    sx={{ borderRadius: 0, width: "100%" }} // يمكنك تعديل الأبعاد حسب احتياجك
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="p"
            sx={{
              fontWeight: 400,
              lineHeight: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Copyright Ecomerve 2024. All right reserved
          </Typography>
        </Container>
      </Box>
    </>
  );
}
