'use client'
import { Box,Input,Button, List, ListItem, ListItemText,TextField,Dialog,DialogTitle,DialogContent,DialogActions,Fab} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function ProductList() {
  const [products, setProducts] = useState([
    { desc: "咖哩飯", price: 20000 },
    { desc: "雞肉飯", price: 20000 },
    { desc: "咖啡自助吧", price: 30000 }
  ])
  const [newProduct, setNewProduct] = useState({ visible: false, desc: "", price: 0, editvisible:false })
  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }
  const show = (index:number) => {
    setNewProduct({ ...newProduct, visible: true})
  }

  const show1 = (index:number) => {
    setNewProduct({ ...newProduct, editvisible: true})
  }

  function update() {
    setProducts(() => [...products, newProduct]);
    setNewProduct({ ...newProduct, visible: false })
    console.log(products);
  }

  
  function delete1 (index: number){
    const dI = [...products]
    dI.splice(index,1)
    setProducts(dI)
    console.log(products);
  }
  const hide = () => {
    setNewProduct({ ...newProduct, visible: false })
  }
  return (
    <Box sx={{
      width: '80vw',
      height: '100vh',
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

                        <Button variant="contained" color="primary" onClick={update}>新增</Button>
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
                <ListItemText primary={product.desc} secondary={product.price}>
                </ListItemText>
                
                <IconButton onClick={() => show(2)}>
                <EditIcon />
                </IconButton> 
                
                <IconButton edge="end" aria-label="delete" onClick={() => delete1(index)}>
                 <DeleteIcon />
                </IconButton>
              </ListItem>)}
          </List>
        </div>
       
      }
      
    </Box>
  );
}