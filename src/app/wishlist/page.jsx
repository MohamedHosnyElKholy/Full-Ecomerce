'use client';

import React, { useEffect } from "react";
import { Container, Box, Typography, Button, Grid, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { getWishLits, deleteWishList } from "../lib/sliceWishlist";
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Wishlist() {
  const { products: getwishlistProducts } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishLits());
  }, [dispatch]);

  async function deleteProductWish(id) {
    try {
      await dispatch(deleteWishList(id)).unwrap(); // استخدام unwrap للحصول على نتيجة مباشرة
      toast.success("Product removed from wishlist");
      await dispatch(getWishLits()).unwrap(); // تحديث قائمة المفضلة بعد الحذف
    } catch (error) {
      toast.error("Failed to remove product: " + error.message);
    }
  }

  console.log(getwishlistProducts); // تحقق من هيكل البيانات

  return (
    <Container sx={{ margin: '30px auto' }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      {getwishlistProducts?.data?.data?.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
          Your wishlist is currently empty. Add items to your wishlist to save them for later!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(getwishlistProducts?.data?.data) && getwishlistProducts.data.data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Box
                border={1}
                borderRadius={4}
                padding={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                height="100%"
              >
                <Image
                src={item.imageCover} // رابط الصورة
                alt={item.name} // وصف الصورة
                width={200} // استبدل بالقيمة المناسبة
                height={200} // استبدل بالقيمة المناسبة
                style={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    objectFit: 'cover', // للحفاظ على تناسق الصورة
                }}
            />
                <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ${item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {item.ratingsAverage} ({item.ratingsQuantity} reviews)
                </Typography>
                <Button 
                  onClick={() => deleteProductWish(item._id)} 
                  variant="outlined" 
                  color="secondary" 
                  sx={{ margin: '15px 0' }} 
                  startIcon={<DeleteIcon />} 
                  fullWidth
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
