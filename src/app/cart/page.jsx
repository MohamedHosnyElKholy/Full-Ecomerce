"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeProductFlashSeals, clearCart, getuserCart } from "../lib/sliceCart";

import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Link from 'next/link';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-hot-toast";

export default function Page() {
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingRemoveStates, setLoadingRemoveStates] = useState({});
  const dispatch = useDispatch();
  const { products: cartProducts } = useSelector((state) => state.cart);
  const allCart = cartProducts?.data?.data?.products || [];
  console.log(cartProducts);
  useEffect(() => {
    dispatch(getuserCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => dispatch(getuserCart()));
  };

  const handleRemoveCart = async (id) => {
    setLoadingRemoveStates((prev) => ({ ...prev, [id]: true }));

    try {
      await dispatch(removeProductFlashSeals(id));
      await dispatch(getuserCart());
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart.");
    } finally {
      setLoadingRemoveStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleUpdateCart = async (id, count) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(updateCart({ id, count }));
      await dispatch(getuserCart());
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Container sx={{ mt: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" sx={{ mb: { xs: 2, sm: 3 } }}>
        Your Cart
      </Typography>

      {allCart.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty. Please add some products!
          </Typography>
        </Box>
      ) : (
        <>
          {/* Total Price Section */}
          <Box
            sx={{
              mt: 4,
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#333",
                fontSize: { xs: "20px", sm: "24px" },
              }}
            >
              Total Price:
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#DB4444",
                fontSize: { xs: "22px", sm: "28px" },
              }}
            >
              ${cartProducts?.data?.data?.totalCartPrice}
            </Typography>
          </Box>

          {/* Clear Cart Button */}
          <Box
            sx={{
              textAlign: { xs: "center", sm: "right" },
              mb: 2,
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
              }}
            >
              Clear Cart
            </Button>
          </Box>

          {/* Cart Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {allCart.map((product) => (
              <Card
                key={product.product?.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 100 },
                    height: { xs: "auto", sm: 100 },
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: { xs: 2, sm: 0 },
                    mr: { sm: 2 },
                  }}
                  image={product.product?.imageCover}
                  alt={product.product?.title}
                />
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {product.product?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Price: ${product?.price}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      gap: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => handleUpdateCart(product.product?.id, product.count - 1)}
                      disabled={loadingStates[product.product?.id] || product.count <= 1}
                      sx={{
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      sx={{
                        mx: 1,
                        fontSize: { xs: "16px", sm: "18px" },
                      }}
                    >
                      {loadingStates[product.product?.id] ? (
                        <CircularProgress size={24} sx={{ color: "#ccc" }} />
                      ) : (
                        product.count
                      )}
                    </Typography>
                    <IconButton
                      onClick={() => handleUpdateCart(product.product?.id, product.count + 1)}
                      disabled={loadingStates[product.product?.id]}
                      sx={{
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                    justifyContent: { xs: "center", sm: "center" },
                    alignItems: { xs: "center", sm: "flex-end" },
                    ml: { sm: 2 },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveCart(product.product?.id)}
                    sx={{
                      minWidth: { xs: "100px", sm: "auto" },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    {loadingRemoveStates[product.product?.id] ? (
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Check Out Button */}
          <Box
            sx={{
              textAlign: { xs: "center", sm: "right" },
              mt: 4,
              mb: 4,
            }}
          >
            <Link
              href="/cheakOut"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#DB4444",
                  color: "#fff",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#c03939",
                  },
                }}
              >
                Check Out
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
}
