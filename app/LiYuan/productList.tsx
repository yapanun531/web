'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Paper, LinearProgress, Tab, Grid, ListItemText } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import useProducts from './useProduct';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import '../globals.css';
import { Product } from '../_settings/interfaces';

export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick, restaurants, types, selectedType, handleTypeClick } = useProducts();
    const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
    const [currentType, setCurrentType] = useState<string>('all'); // 新增 currentType 狀態

    useEffect(() => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [selectedType]: prevPages[selectedType] || 1,
        }));
        setCurrentType(selectedType); // 更新 currentType
    }, [selectedType]);

    useEffect(() => {
        const pageSize = 8;
        const startIndex = (currentPage[currentType] - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const filteredProducts = products
            .filter(
                (product) =>
                    product.res_name === selectedRestaurant &&
                    (currentType === 'all' || product.type === currentType)
            );

        setCurrentProducts(filteredProducts.slice(startIndex, endIndex));
        setPageCount(Math.ceil(filteredProducts.length / pageSize));
    }, [currentPage, currentType, selectedRestaurant, products]);

    const handleNextPage = () => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [currentType]: Math.min(prevPages[currentType] + 1, pageCount),
        }));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [currentType]: Math.max(prevPages[currentType] - 1, 1),
        }));
    };

    const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);

    return (
        <div>
            {isLoading ? <LinearProgress /> :
                <div style={{ display: 'flex' }}>
                    <Sidebar style={{ height: '100%', backgroundColor: '#D0D0D0', fontFamily: 'iansui' }}>
                        <Menu>
                            {restaurants.map((restaurant: string) => (
                                <MenuItem key={restaurant} onClick={(event) => handleRestaurantClick(event, restaurant)}>
                                    {restaurant}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Sidebar>

                    <Paper style={{ borderLeft: '2px solid #8E8E8E' }}>
                        <TabContext value={selectedRestaurant}>
                            {restaurants.map((restaurant: string) => (
                                <TabPanel key={restaurant} value={restaurant}>
                                    <TabList onChange={(event, newType) => handleTypeClick(event, newType)} aria-label="type list">
                                        <Tab key="全部" label="全部" value="all" sx={{ border: 1, borderRadius: 2, backgroundColor: currentType === "all" ? "#D0D0D0" : "" }} />
                                        {types.filter((type) => type.restaurant === restaurant).map((type) =>
                                            <Tab key={type.type} label={type.type} value={type.type} sx={{ border: 1, borderRadius: 2, backgroundColor: currentType === type.type ? "#D0D0D0" : "" }} />
                                        )}
                                    </TabList>

                                    {/* 間隔*/}
                                    <div style={{margin: '20px' }}></div>

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
                                    
                                    {/* 間隔*/}
                                    <div style={{margin: '20px' }}></div>
                                    
                                    <div>
                                        <button onClick={handlePrevPage} disabled={currentPage[currentType] === 1}>上一頁</button>
                                        <span>{` 第 ${currentPage[currentType]} 頁 / 共 ${pageCount} 頁 `}</span>
                                        <button onClick={handleNextPage} disabled={currentPage[currentType] === pageCount}>下一頁</button>
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
