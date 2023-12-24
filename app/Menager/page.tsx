import styles from '../page.module.css'
import AccountList from './accountList'
export default function Home() {
    return (<div className={styles.main}>
        <h1>店家帳號一覽</h1>
        <AccountList />
    </div>)
}