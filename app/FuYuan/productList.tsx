'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent, IconButton, Fab, LinearProgress, Tab, MenuItem, InputLabel, FormControl } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useProducts from './useProduct';
import { Product } from "../_settings/interfaces";
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ProductList() {
    const { products, addProduct, deleteProduct, updateProduct, isLoading, restaurants, selectedRestaurant, handleRestaurantClick } = useProducts();
    const [newProduct, setNewProduct] = React.useState<Product>({ id: "", desc: "", price: 0, res_name: "", type: "" });
    const [status, setStatus] = React.useState({ visible: false });
    const handleChange = (e: SelectChangeEvent) => {
        setNewProduct({ ...newProduct, res_name: e.target.value as string });
    };
    const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "price") {
            setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
        }
        else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        }
    }
    function addOrUpdate() {
        if (newProduct.id === "") {
            addProduct(newProduct, newProduct.res_name);
        }
        else {
            updateProduct(newProduct, newProduct.res_name);
        }
        setStatus({ ...status, visible: false })
        resetProduct();
    }
    const resetProduct = () => {
        setNewProduct({ id: "", desc: "", price: 0, res_name: "", type: "" })
    }
    const show = () => {
        setStatus({ ...status, visible: true })
    };
    const hide = () => {
        setStatus({ ...status, visible: false })
    };
    function setUpdateProduct(product: Product) {
        setNewProduct({ ...product })
        setStatus({ visible: true })
    }
    return (
        <Box sx={{
            width: '80vw',
            height: '250vh',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }}>
            {status.visible ?
                <Dialog open={status.visible} onClose={hide} aria-labelledby={newProduct.id === "" ? "新增產品" : "編輯產品"}>
                    <DialogTitle>{newProduct.id === "" ? "新增產品" : "更新產品"}</DialogTitle>
                    <DialogContent>
                        <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
                        <TextField type="number" label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
                        <TextField label="產品類型" variant="outlined" name="type" value={newProduct.type} onChange={handleClick} /><p />
                        <FormControl fullWidth>
                            <InputLabel id="res_name">餐廳名稱</InputLabel>
                            <Select labelId="res_name" label="餐廳名稱" value={newProduct.res_name} onChange={handleChange}>
                                <MenuItem value="八方雲集">八方雲集</MenuItem>
                                <MenuItem value="茶墵">茶墵</MenuItem>
                                <MenuItem value="食福簡餐">食福簡餐</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <IconButton
                            aria-label="close"
                            onClick={hide}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Button variant="contained" color="primary" onClick={addOrUpdate}>{newProduct.id === "" ? "新增產品" : "更新產品"}</Button>
                    </DialogActions>
                </Dialog>
                :
                <div>
                    {isLoading ? <LinearProgress /> :
                        <div>
                            <TabContext value={selectedRestaurant}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleRestaurantClick} aria-label="lab API tabs example">
                                        {restaurants.map((restaurant) => (
                                            <Tab label={restaurant} value={restaurant} />
                                        ))}
                                    </TabList>
                                </Box>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button onClick={show} variant='contained'>新增產品</Button>
                                </div>
                                <TabPanel value="八方雲集">
                                    {products.filter((product) => product.res_name === "八方雲集").map((product) =>
                                        <List>
                                            <ListItem divider key={product.id}>
                                                <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />

                                                <IconButton
                                                    edge="end"
                                                    aria-label="update"
                                                    onClick={() => setUpdateProduct(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => deleteProduct(product.id, newProduct.res_name)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                        </List>
                                    )}
                                </TabPanel>
                                <TabPanel value="茶墵">
                                    {products.filter((product) => product.res_name === "茶墵").map((product) =>
                                        <List>
                                            <ListItem divider key={product.id}>
                                                <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />

                                                <IconButton
                                                    edge="end"
                                                    aria-label="update"
                                                    onClick={() => setUpdateProduct(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => deleteProduct(product.id, newProduct.res_name)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                        </List>
                                    )}
                                </TabPanel>
                                <TabPanel value="食福簡餐">
                                    {products.filter((product) => product.res_name === "食福簡餐").map((product) =>
                                        <List>
                                            <ListItem divider key={product.id}>
                                                <ListItemText primary={product.desc} secondary={<>價格: ${product.price}<br />種類: {product.type}</>} />

                                                <IconButton
                                                    edge="end"
                                                    aria-label="update"
                                                    onClick={() => setUpdateProduct(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => deleteProduct(product.id, newProduct.res_name)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                        </List>
                                    )}
                                </TabPanel>
                            </TabContext>

                            <Fab color="primary" aria-label="Add" onClick={show} sx={{
                                position: 'fixed',
                                right: 8,
                                top: 8,
                            }}>
                                <AddIcon />
                            </Fab>
                        </div>
                    }
                </div>
            }
        </Box >
    );
}
