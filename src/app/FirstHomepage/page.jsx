import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { AccessAlarm, ShoppingCart, Star } from '@mui/icons-material'; // أيقونات من Material Icons

export default function Page() {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            {/* Site Introduction */}
            <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 }, textAlign: 'center', borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Welcome to Our Online Store!</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Discover a unique shopping experience that combines quality and convenience.
                </Typography>
                
                {/* Attractive Icons */}
                <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: 'center', padding: 2 }}>
                            <AccessAlarm sx={{ fontSize: 50, color: '#3f51b5' }} />
                            <Typography variant="h6">Fast Delivery</Typography>
                            <Typography variant="body2">Get your orders delivered quickly and efficiently.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: 'center', padding: 2 }}>
                            <ShoppingCart sx={{ fontSize: 50, color: '#3f51b5' }} />
                            <Typography variant="h6">Easy Shopping</Typography>
                            <Typography variant="body2">Shop your favorite items with just a few clicks.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: 'center', padding: 2 }}>
                            <Star sx={{ fontSize: 50, color: '#3f51b5' }} />
                            <Typography variant="h6">Top Quality</Typography>
                            <Typography variant="body2">We offer only the best products for our customers.</Typography>
                        </Box>
                    </Grid>
                </Grid>
                
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Join us today and discover exclusive deals!
                </Typography>
            </Paper>
        </Container>
    );
}
