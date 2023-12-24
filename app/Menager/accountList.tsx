'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton, Fab, LinearProgress, Tab, MenuItem, InputLabel, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useAccounts from './useAccount';
import { Store } from "../_settings/interfaces";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import app from "@/app/_firebase/Config"
import { useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';


export default function ProductList() {
    const { accounts, addAccount, deleteAccount, updateAccount, isLoading} = useAccounts();
    const [newAccount, setNewAccount] = React.useState<Store>({ id:"", name: "", account: "", password: ""});
    const [addOrUpdateDialogOpen, setAddOrUpdateDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const [message, setMessage] = useState("");
    
    const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {

        setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
    }
    async function createAccount() {
        const auth = getAuth(app);
        const res = await createUserWithEmailAndPassword(auth, newAccount.account, newAccount.password);
        await updateProfile(res.user, { displayName: newAccount.name });
        setMessage(`新增${newAccount.name}成功`);
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

    const handleOpenAddOrUpdateDialog = () => {
        setAddOrUpdateDialogOpen(true);
    };

    const handleCloseAddOrUpdateDialog = async () => {
        setAddOrUpdateDialogOpen(false);
        resetAccount();
        window.location.reload()
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        window.location.reload()
    };

    function addOrUpdate() {
        if (newAccount.id === "") {
            addAccount(newAccount);
            createAccount();
            sendEmail("新增店家", `新增店家 ${newAccount.name} 成功`);
        }
        else {
            console.log(accounts)
            updateAccount(newAccount);
        }
        handleCloseAddOrUpdateDialog();
        resetAccount();
    }

    const resetAccount = () => {
        setNewAccount({id:"",name: "", account: "", password: ""})
    }

    function setUpdateAccount(account: Store) {
        setNewAccount({ ...account })
        handleOpenAddOrUpdateDialog();
    }

    function setDeleteAccount(account: Store) {
        setNewAccount({ ...account })
        handleOpenDeleteDialog();
    }

    function checkDeleteProduct() {
        deleteAccount(newAccount.id);
        handleCloseDeleteDialog();
        resetAccount();
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
            <Dialog open={addOrUpdateDialogOpen} onClose={handleCloseAddOrUpdateDialog} aria-labelledby={newAccount.name === "" ? "新增店家" : "編輯店家"}>
                <DialogTitle>{newAccount.id === "" ? "新增店家" : "更新店家"}</DialogTitle>
                <DialogContent>
                    <TextField label="商店名稱" variant="outlined" name="name" value={newAccount.name} onChange={handleClick} /><p />
                    <TextField label="帳號" variant="outlined" name="account" value={newAccount.account} onChange={handleClick} /><p />
                    <TextField label="密碼" variant="outlined" name="password" value={newAccount.password} onChange={handleClick} /><p />
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
                    <Button variant="contained" color="primary" onClick={addOrUpdate}>{newAccount.id === "" ? "新增店家" : "更新店家"}</Button>
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

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={handleOpenAddOrUpdateDialog} variant='contained'>新增店家</Button>
                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>店家名稱</TableCell>
                                        <TableCell align="left">ID</TableCell>
                                        <TableCell align="left">帳號</TableCell>
                                        <TableCell align="left">密碼</TableCell>
                                        <TableCell align="left">操作</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {accounts.map((account) => (
                                        <TableRow
                                        key={account.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">{account.name}</TableCell>
                                        <TableCell align="left">{account.id}</TableCell>
                                        <TableCell align="left">{account.account}</TableCell>
                                        <TableCell align="left">{account.password}</TableCell>
                                        <TableCell align="left">
                                            <IconButton
                                                    edge="end"
                                                    aria-label="update"
                                                    onClick={() => setUpdateAccount(account)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => setDeleteAccount(account)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                    </div>
                }
            </div>
        </Box >
    );
}
