import styles from '../page.module.css'
import ProductList from './productList'
export default function Home() {
    return (<div className={styles.main}>
        <h1>Hello</h1>
        <ProductList />
    </div>)
}