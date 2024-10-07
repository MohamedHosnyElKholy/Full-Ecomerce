"use client";
import React, { useState } from "react";
import { addAddress } from "../lib/sliceAdress"; // تأكد من تحديث المسار الصحيح
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function AddAddressPage() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();
  const { products: addressProducts } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = { name, details, phone, city };
    dispatch(addAddress(addressData))
      .then(() => {
        toast.success("Address added successfully!");
        setName("");
        setDetails("");
        setPhone("");
        setCity("");
        router.push('/loggedUser');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" marginBottom="20px">
        Add New Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <Input
                id="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="details-input">Details</InputLabel>
              <Input
                id="details-input"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="phone-input">Phone</InputLabel>
              <Input
                id="phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="city-input">City</InputLabel>
              <Input
                id="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
