'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, LinearProgress, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import useProducts from './useProduct';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import '../globals.css';
export default function ProductList() {
    const { products, isLoading, selectedRestaurant, handleRestaurantClick, restaurants } = useProducts();
    const flex={
        display:'flex',
        
    }
    const bar={
        height: '100%',
        backgroundColor:'#D0D0D0',
        fontFamily:'iansui'
    }

    const border={
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
                        {/* <TabList onChange={handleRestaurantClick} aria-label="restaurant list">
                                    {restaurants.map((restaurant: string) => (
                                        <Tab label={restaurant} value={restaurant} />
                                    ))}
                                </TabList> */}
                                
                            {restaurants.map((restaurant: string) => (
                                <TabPanel key={restaurant} value={restaurant}>
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
                </div>
            }
        </div>
    );
}