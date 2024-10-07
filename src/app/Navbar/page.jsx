"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

const pages = ["Home", "Contact", "About", "SignUp", "Address"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const { products: cartProducts } = useSelector((state) => state.cart);
  const router = useRouter();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("countdownEndDate");
    router.push('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none", borderBottom: "1px solid #ccc" }}>
      <Container maxWidth="xl" sx={{ width: "90%", padding: "15px 0" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              color: "#000000",
              textDecoration: "none",
              mr: 2,
              display: { xs: "flex", md: "flex" },
            }}
          >
            Exclusive
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}>
            <IconButton size="large" aria-label="فتح قائمة التنقل" onClick={(e) => setAnchorElNav(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                sx={{ fontWeight: 400, color: "#000", textTransform: "capitalize", mx: 1 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="What are you looking for?"
              sx={{
                backgroundColor: "#f5f5f5",
                mr: 1,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <IconButton component={Link} href="/wishlist" sx={{ mr: 1 }}>
              <FavoriteIcon />
            </IconButton>
            <Link href="/cart" passHref>
              <IconButton sx={{ position: "relative" }}>
                <ShoppingCartIcon />
                {cartProducts?.data?.numOfCartItems > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      bgcolor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    {cartProducts.data.numOfCartItems}
                  </Box>
                )}
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
