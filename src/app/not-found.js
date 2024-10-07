'use client'
import React from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import imageerr from "../assets/404-error.svg";
export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f3f4f6",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar
          src={imageerr?.src} // ضع صورة مناسبة في هذا المسار
          alt="404 Not Found"
          sx={{width: '100%', height: '100%', borderRadius: 0}}
        />
      </motion.div>

      {/* Text */}
      <Typography variant="h1" fontWeight={700} sx={{ marginBottom: "20px" }}>
        Oops!
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#555" }}>
        We can't seem to find the page you're looking for.
      </Typography>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </motion.div>
    </Box>
  );
}
