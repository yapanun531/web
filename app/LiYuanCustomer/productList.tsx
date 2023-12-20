'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, LinearProgress, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import useProducts from './useProduct';

export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick, restaurants } = useProducts();

    return (
        <Box sx={{
            width: '90vw',
            height: '54vh',
            overflow: 'auto',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }}>
            <div>
                {isLoading ? <LinearProgress /> :
                    <div>
                        <TabContext value={selectedRestaurant}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleRestaurantClick} aria-label="restaurant list">
                                    {restaurants.map((restaurant: string) => (
                                        <Tab label={restaurant} value={restaurant} />
                                    ))}
                                </TabList>
                            </Box>
                            {restaurants.map((restaurant: string) => (
                                <TabPanel value={restaurant}>
                                    {products.filter((product) => product.res_name === restaurant).map((product) =>
                                        <List key={product.id}>
                                            <ListItem key={product.id} divider>
                                                <Image src={product.photo} alt='Image' priority={true} width={50} height={50}></Image>
                                                <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />
                                            </ListItem>
                                        </List>
                                    )}
                                </TabPanel>
                            ))}
                        </TabContext>
                    </div>
                }
            </div>

        </Box >
    );
}
