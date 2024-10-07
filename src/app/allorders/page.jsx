"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrder } from "../lib/sliceOrder";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  IconButton,
  Button
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Icon for additional information
import Link from "next/link";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { products: getorder } = useSelector((state) => state.order);
console.log(getorder?.data?.data[0]?._id)
  useEffect(() => {
    dispatch(allOrder());
  }, [dispatch]);

  return (
    <Box sx={{ padding: "20px", bgcolor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: "#333" }}
      >
        All Orders
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                City
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                Total Price
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "#1976d2", color: "#fff" }}
              >
                Created At
              </TableCell>
              <TableCell sx={{ bgcolor: "#1976d2" }}></TableCell>{" "}
              {/* Extra cell for the icon */}
            </TableRow>
          </TableHead>
          <TableBody>
            {getorder?.data?.data.map((order, index) => (
                <>
              <TableRow
                key={order._id}
                sx={{ bgcolor: index % 2 === 0 ? "#ffffff" : "#f9f9f9" }}
              >
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order?.shippingAddress?.phone}</TableCell>
                <TableCell>{order?.shippingAddress?.city}</TableCell>
                <TableCell>{order.totalOrderPrice} EGP</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Order Details: ${order._id}`)}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
                </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
