'use client';
import * as React from 'react';
import { Box, LinearProgress, Typography, Grid } from "@mui/material";
import useProducts from './useProduct';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import '../globals.css';

export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick } = useProducts();
    const flex = {
        display: 'flex',

    }
    const bar = {
        height: '100%',
        backgroundColor: '#D0D0D0',
        fontFamily: 'iansui'
    }
    const border = {
        borderLeft: '2px solid #8E8E8E'
    }
    const restaurantNameMapping: { [key: string]: string } = {
        "ChengYuan": "誠園",
        "XinYuan": "心園",
        "LiYuan": "理園",
        "FuYuan": "輔園",
    };
    return (
        <div>
            {isLoading ? <LinearProgress /> :
                <div style={flex}>
                    <Sidebar style={bar}>
                        <Menu>
                            {["ChengYuan", "XinYuan", "LiYuan", "FuYuan"].map((yuan) => (
                                <MenuItem key={yuan} onClick={(event) => handleRestaurantClick(event, yuan)}>
                                    {restaurantNameMapping[yuan]}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Sidebar>
                    <Grid container style={border}>
                        {selectedRestaurant.map((restaurant: string) => (
                            <React.Fragment key={restaurant}>
                                <Grid item xs={3}>
                                    <Box sx={{
                                        border: 1,
                                        borderRadius: 2,
                                        width: 200,
                                        height: 200,
                                        position: 'auto',
                                        alignItems: 'flex-start',
                                        marginTop: 10,
                                        marginLeft: 5,
                                        backgroundColor: 'wheat'
                                    }}>
                                        <Typography variant="h5" component="div" align="center" sx={{ marginTop: 10 }}>
                                            {restaurant} Top 5
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Box sx={{
                                        display: 'flex',
                                        height: 200,
                                        width: 870,
                                        marginTop: 10
                                    }}>

                                        {products.filter((product) => product.res_name === restaurant).sort((a, b) => b.hearts - a.hearts).slice(0, 5).map((product) => (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    border: 1,
                                                    borderRadius: 2,
                                                    width: 150,
                                                    height: 200,
                                                    position: 'relative',
                                                    margin: 'auto'
                                                }}
                                                key={product.id}
                                            >
                                                <Typography variant="body1" component="div" align="center" sx={{ marginTop: 10 }}>
                                                    {product.desc}
                                                </Typography>
                                                <FavoriteIcon sx={{ position: 'absolute', bottom: 0, left: 0, color: 'red' }} />
                                                <Typography variant="body1" component="div" align="center">
                                                    {product.hearts}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </div>
            }
        </div>
    );
}