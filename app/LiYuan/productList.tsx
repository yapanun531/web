'use client'
import { Box,Input,Button, List, ListItem, ListItemText,TextField,Dialog,DialogTitle,DialogContent,DialogActions,Fab, CircularProgress} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import useProducts from './useProduct';
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
export default function ProductList() {
  const [products, setProducts, addProduct, deleteProduct,updateProduct, isLoading] = useProducts()
    
  const [newProduct, setNewProduct] = useState({ visible: false, desc: "", price: 0, type: "",res_name:"" ,editvisible:false })
  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "price") {
      setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
    }
    else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
  }
  const show = (index:number) => {
    setNewProduct({ ...newProduct, visible: true})
  }
  
  {isLoading ? <CircularProgress /> :
  <List subheader="Product list" aria-label="product list">
    {products.map((product) =>
      <ListItem divider key={product.desc}>
        <ListItemText primary={product.desc} secondary={product.price}>
        </ListItemText>
      </ListItem>)}
  </List>
}



  function add() {
    addProduct(newProduct);
    setNewProduct({ ...newProduct, visible: false })
    console.log(products);
  }
  const hide = () => {
    setNewProduct({ ...newProduct, visible: false })
  }
  return (
    <Box sx={{
      width: '80vw',
      height: '250vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      {newProduct.visible ?
                    
                      <Dialog open={newProduct.visible} onClose={hide} aria-labelledby="新增產品">
                      <DialogTitle>新增產品</DialogTitle>
                      <DialogContent>
                        <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
                        <TextField label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
                        <TextField label="產品類型" variant="outlined" name="type" value={newProduct.type} onChange={handleClick} /><p />
                        <TextField label="餐廳名稱" variant="outlined" name="type" value={newProduct.res_name} onChange={handleClick} /><p />
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

                        <Button variant="contained" color="primary" onClick={add}>新增</Button>
                      </DialogActions>
                    </Dialog>
        :
        <div>
              <Fab color="primary" aria-label="Add" onClick={() => show(1)}>
      <AddIcon/>
        </Fab>
          
          <List subheader="  菜單" aria-label="product list">
            {products.map((product,index) =>
              <ListItem divider key={product.desc}>
                <ListItemText primary={product.desc} secondary={product.price} >
                </ListItemText>
                
                <IconButton onClick={() => show(2)}>
                <EditIcon />
                </IconButton> 
                
                <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product.id)}>
                  <DeleteIcon />
                
                </IconButton>
              </ListItem>)}
          </List>
        </div>
       
      }
      
    </Box>
  );
}