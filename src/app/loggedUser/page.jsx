"use client";
import React, { useEffect } from "react";
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
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdress, deleteUserAdress } from "../lib/sliceAdress"; // تأكد من أن المسار صحيح
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerData = () => {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector((state) => state.address);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getUserAdress());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteUserAdress(id));
    dispatch(getUserAdress()); // تحديث قائمة العناوين
  };

  return (
    <Box sx={{ padding: { xs: "10px", sm: "20px" } }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: { xs: 2, sm: 3 },
          fontSize: { xs: "24px", sm: "32px" },
        }}
      >
        Customer Data
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table
            sx={{
              minWidth: 650,
              [`& .${'MuiTableCell-head'}`]: {
                backgroundColor: theme.palette.grey[200],
              },
              [`& .${'MuiTableCell-body'}`]: {
                fontSize: { xs: "14px", sm: "16px" },
              },
            }}
            aria-label="customer data table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                {!isSmallScreen && <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>}
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.length > 0 ? (
                addresses.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.name}</TableCell>
                    {!isSmallScreen && <TableCell>{customer.details || 'N/A'}</TableCell>}
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => handleDelete(customer._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isSmallScreen ? 4 : 5} align="center">
                    No data available to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomerData;
