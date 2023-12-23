import styles from '../page.module.css'
import ProductList from './productList'
import { Box } from "@mui/material";
export default function Home() {
    return (<div className={styles.main}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: 500,
            height: 100,
            m: 1,
            p: 1,
            border: '1px solid',
            borderRadius: 2,
            alignItems: 'center'
        }}>
            測試
        </Box>
        <h1>菜單一覽</h1>
        <ProductList />
    </div>)
}