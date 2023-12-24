'use client';
import * as React from 'react';
import { useState } from 'react';
import { Box, Paper, List, ListItem, ListItemText, LinearProgress, Tab, Grid } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import useProducts from './useProduct';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import '../globals.css';

export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick, restaurants, types, selectedType, handleTypeClick } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);

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

    const pageSize = 8;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = products
        .filter(
            (product) =>
                product.res_name === selectedRestaurant &&
                (selectedType === 'all' || product.type === selectedType)
        )
        .slice(startIndex, endIndex);

    const pageCount = Math.ceil(products.length / pageSize);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            {isLoading ? <LinearProgress /> :
                <div style={flex}>
                    <Sidebar style={bar}>
                        <Menu>
                            {restaurants.map((restaurant: string) => (
                                <MenuItem key={restaurant} onClick={(event) => handleRestaurantClick(event, restaurant)}>
                                    {restaurant}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Sidebar>

                    <Paper style={border}>
                        <TabContext value={selectedRestaurant}>
                            {restaurants.map((restaurant: string) => (
                                <TabPanel key={restaurant} value={restaurant}>
                                    <TabList onChange={handleTypeClick} aria-label="type list">
                                        <Tab key="全部" label="全部" value="all" sx={{ border: 1, borderRadius: 2, backgroundColor: selectedType === "all" ? "#D0D0D0" : "" }} />
                                        {types.filter((type) => type.restaurant === restaurant).map((type) =>
                                            <Tab key={type.type} label={type.type} value={type.type} sx={{ border: 1, borderRadius: 2, backgroundColor: selectedType === type.type ? "#D0D0D0" : "" }} />
                                        )}
                                    </TabList>

                                    <Grid container spacing={2}>
                                        {currentProducts.map((product) => (
                                            <Grid key={product.id} item xs={6}>
                                                <Box sx={{ border: 1, borderRadius: 2, p: 2 }}>
                                                    <Image
                                                        src={product.photo}
                                                        alt="Image"
                                                        priority={true}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <ListItemText
                                                        primary={product.desc}
                                                        secondary={
                                                            <>
                                                                價格: ${product.price}
                                                                <br />
                                                                種類: {product.type}
                                                            </>
                                                        }
                                                    />
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <div>
                                        <button onClick={handlePrevPage} disabled={currentPage === 1}>上一頁</button>
                                        <span>{` 第 ${currentPage} 頁 / 共 ${pageCount} 頁 `}</span>
                                        <button onClick={handleNextPage} disabled={currentPage === pageCount}>下一頁</button>
                                    </div>
                                </TabPanel>
                            ))}
                        </TabContext>
                    </Paper>
                </div>
            }
        </div>
    );
}
