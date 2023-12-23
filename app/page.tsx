import styles from './page.module.css'
import Rform from './ChengYuan/productList'

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>菜單一覽</h1>
      <Rform />
    </div>
  )
}
