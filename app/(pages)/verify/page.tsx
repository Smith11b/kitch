
import styles from './verify.module.css';
import Image from 'next/image';


export default function VerifyPage() {
    return (
        <div className={styles.verifyContainer}>
            <div className={styles.verifyCard}>
                <Image src= "/images/logo pink.png" alt="logo" width={100} height={80} />
            <h1>Please check your email and confirm your email address</h1>
            <p>We can&apos;t have the robot overlords stopping us from helping you help feed people with ease. Please take a second to confirm we have your correct email address. </p>
            </div>
        </div>
    );
}
