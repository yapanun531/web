'use client'
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useState } from 'react'
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';

export default function ProductList() {
    let products = [
        { desc: "iPad", price: 20000 },
        { desc: "iPhone 8", price: 20000 },
        { desc: "iPhone X", price: 30000 }
        ];
  const [selectedIndex, setSelectedIndex] = useState(5);
  console.log("index:",selectedIndex)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '80vw',
        height: '100vh',
        backgroundColor: 'background.paper',
        color: 'black',
        textAlign: 'left' }}>
      <Divider />
      <List subheader="Product list" aria-label="product list">
        <ListItemButton
          selected={selectedIndex == 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItem divider key={products[0].desc}> 
            <ListItemText primary={products[0].desc} secondary={products[0].price}>
            </ListItemText>
          </ListItem>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex == 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItem divider key={products[1].desc}> 
            <ListItemText primary={products[1].desc} secondary={products[1].price}>
            </ListItemText>
          </ListItem>
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex == 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItem divider key={products[2].desc}> 
            <ListItemText primary={products[2].desc} secondary={products[2].price}>
            </ListItemText>
          </ListItem>
        </ListItemButton>
      </List>
    </Box>
  );
}






