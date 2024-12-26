import Image from 'next/image'
import styles from './dashboard.module.css'
export default function Dashboard() {
    return (
        <div className={styles.tempContainer}>
            <Image src="/images/logo pink.png" alt="Kitch" width={100} height={100} />
            <h1>Dashboard Coming soon!</h1>
        </div>
    )
}
