import React from 'react';
import { Container, Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import imageone from "../../assets/Frame 560.png";

export default function Page() {
    const arrayAll = [
        "Woman’s Fashion",
        "Men’s Fashion",
        "Electronics",
        "Home & Lifestyle",
        "Medicine",
        "Sports & Outdoor",
        "Baby’s & Toys",
        "Groceries & Pets",
        "Health & Beauty"
    ];

    return (
        <Container>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} sm={4}>
                    <Box>
                        <List>
                            {arrayAll.map((el, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={el} sx={{ fontWeight: 400 }} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box>
                        <Avatar
                            src={imageone.src}
                            variant="square"
                            sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
