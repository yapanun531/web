'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton, Fab, LinearProgress, Tab, MenuItem, InputLabel, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    const { products, addProduct, deleteProduct, updateProduct, isLoading, restaurants, selectedRestaurant, handleRestaurantClick } = useProducts();
    const [newProduct, setNewProduct] = React.useState<Product>({ id: "", desc: "", price: 0, res_name: "", type: "", photo: "", hearts: 0, heartClicked: false });
    const [addOrUpdateDialogOpen, setAddOrUpdateDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);

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

    async function sendEmail(subject: string, html: string) {
        try {
            const response = await axios({
                method: 'post',
                url: '/email',
                data: {
                    email: getAuth().currentUser?.email,
                    subject: subject,
                    html: html
                },
            });
            console.log(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
            } else {
                console.error("錯誤");
            }

        }
    }
    const getDisplayName = getAuth().currentUser?.displayName;


    const handleOpenAddOrUpdateDialog = () => {
        setAddOrUpdateDialogOpen(true);
    };

    const handleCloseAddOrUpdateDialog = () => {
        setAddOrUpdateDialogOpen(false);
        resetProduct();
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    function addOrUpdate() {
        if (newProduct.id === "") {
            addProduct(newProduct, newProduct.res_name);
            sendEmail("新增產品", `新增產品 ${newProduct.desc} 成功`);
        }
        else {
            console.log(products)
            updateProduct(newProduct, newProduct.res_name);
            sendEmail("更新產品", `更新產品 ${newProduct.desc} 成功`);
        }
        handleCloseAddOrUpdateDialog();
        resetProduct();
    }

    const resetProduct = () => {
        setNewProduct({ id: "", desc: "", price: 0, res_name: "", type: "", photo: "", hearts: 0, heartClicked: false })
    }

    function setUpdateProduct(product: Product) {
        setNewProduct({ ...product })
        handleOpenAddOrUpdateDialog();
    }

    function setDeleteProduct(product: Product) {
        setNewProduct({ ...product })
        handleOpenDeleteDialog();
    }

    function checkDeleteProduct() {
        deleteProduct(newProduct.id, newProduct.res_name);
        handleCloseDeleteDialog();
        resetProduct();
    }


    return (

        <Box sx={{
            width: '90vw',
            height: '54vh',
            overflow: 'auto',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }}>

            <Dialog open={addOrUpdateDialogOpen} onClose={handleCloseAddOrUpdateDialog} aria-labelledby={newProduct.id === "" ? "新增產品" : "編輯產品"}>
                <DialogTitle>{newProduct.id === "" ? "新增產品" : "更新產品"}</DialogTitle>
                <DialogContent>
                    <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
                    <TextField type="number" label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
                    <TextField label="產品類型" variant="outlined" name="type" value={newProduct.type} onChange={handleClick} /><p />
                    <FormControl fullWidth>
                        <InputLabel id="res_name">餐廳名稱</InputLabel>
                        <Select labelId="res_name" label="餐廳名稱" value={newProduct.res_name} onChange={handleChange}>
                            {restaurants.map((restaurant: string) => (
                                <MenuItem value={restaurant} key={restaurant}>{restaurant}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseAddOrUpdateDialog}
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

            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>確認刪除？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        確定要刪除這個項目嗎？這個操作無法撤銷。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        取消
                    </Button>
                    <Button onClick={checkDeleteProduct} color="secondary">
                        確定
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                {isLoading ? <LinearProgress /> :
                    <div>

                        <TabContext value={selectedRestaurant}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleRestaurantClick} aria-label="restaurant list">
                                    {restaurants
                                        .filter((restaurant) => products.some(product => product.res_name === restaurant && product.res_name === getDisplayName))
                                        .map((restaurant: string) => (
                                            <Tab label={restaurant} value={restaurant} key={restaurant} />
                                        ))}
                                </TabList>
                            </Box>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={handleOpenAddOrUpdateDialog} variant='contained'>新增產品</Button>
                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>商品名稱</TableCell>
                                            <TableCell align="left">價格</TableCell>
                                            <TableCell align="left">種類</TableCell>
                                            <TableCell align="left">操作</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>



                                        {products.map((product) =>
                                            <TableRow
                                                key={product.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{product.desc}</TableCell>
                                                <TableCell align="left">{product.price}</TableCell>
                                                <TableCell align="left">{product.type}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="update"
                                                        onClick={() => setUpdateProduct(product)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => setDeleteProduct(product)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )}


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabContext>



                        <Fab color="primary" aria-label="Add" onClick={handleOpenAddOrUpdateDialog} sx={{
                            position: 'fixed',
                            right: 8,
                            top: 8,
                        }}>
                            <AddIcon />
                        </Fab>
                    </div>
                }
            </div>
        </Box >
    );

}
