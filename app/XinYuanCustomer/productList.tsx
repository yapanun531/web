'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent, IconButton, Fab, LinearProgress, Tab, MenuItem, InputLabel, FormControl } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useProducts from './useProduct';
import { Product } from "../_settings/interfaces";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { getAuth } from 'firebase/auth';

export default function ProductList() {
    const { products,isLoading, selectedRestaurant, handleRestaurantClick } = useProducts();

    return (
        <Box sx={{
            width: '80vw',
            height: '250vh',
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
                                <Tab label="八方雲集" value="1" />
                                <Tab label="茶墵" value="2" />
                                <Tab label="食福簡餐" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {products.filter((product) => product.res_name === "八方雲集").map((product) =>
                                <List key={product.id}>
                                    <ListItem key={product.id} divider>
                                        <Image src={product.photo} alt='Image' priority={true} width={50} height={50}></Image>

                                        <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />
                                    </ListItem>
                                </List>
                            )}
                        </TabPanel>
                        <TabPanel value="2">
                            {products.filter((product) => product.res_name === "茶墵").map((product) =>
                                <List key={product.id}>
                                    <ListItem key={product.id} divider>
                                        <Image src={product.photo} alt='Image' priority={true} width={50} height={50}></Image>
                                        <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />
                                    </ListItem>
                                </List>
                            )}
                        </TabPanel>
                        <TabPanel value="3">
                            {products.filter((product) => product.res_name === "食福簡餐").map((product) =>
                                <List key={product.id}>
                                    <ListItem key={product.id} divider>
                                        <Image src={product.photo} alt='Image' priority={true} width={50} height={50}></Image>

                                        <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />
                                    </ListItem>
                                </List>
                            )}
                        </TabPanel>
                    </TabContext>
                </div>
            }
        </div>
            
        </Box >
    );
}
