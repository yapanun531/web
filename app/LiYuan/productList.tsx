'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, LinearProgress, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import useProducts from './useProduct';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import '../globals.css';

export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick, restaurants, types, selectedType, handleTypeClick } = useProducts();
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

                    <div style={border}>
                        <TabContext value={selectedRestaurant}>
                            {restaurants.map((restaurant: string) => (
                                <TabPanel key={restaurant} value={restaurant}>
                                    <TabList onChange={handleTypeClick} aria-label="type list">
                                        <Tab key="全部" label="全部" value="all" sx={{ border: 1, borderRadius: 2, backgroundColor: selectedType === "all" ? "#D0D0D0" : "" }} />
                                        {types.filter((type) => type.restaurant === restaurant).map((type) =>
                                            <Tab key={type.type} label={type.type} value={type.type} sx={{ border: 1, borderRadius: 2, backgroundColor: selectedType === type.type ? "#D0D0D0" : "" }} />
                                        )}
                                    </TabList>

                                    {products.filter((product) => product.res_name === restaurant && (selectedType === "all" || product.type === selectedType)).map((product) =>
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
                </div>
            }
        </div>
    );
}