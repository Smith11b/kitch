
import styles from './login.module.css'
import Image from 'next/image';



import LoginForm from './components/LoginForm/LoginForm';

export default function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <Image className={styles.logo} src={'/images/logo pink.png'} alt="Kitch Logo" width={80} height={50} />
            <h1>Welcome back</h1>
            <p>Sign in to continue to your account</p>
            <LoginForm />
            <p className={styles.signUpText}>New to our platform? <a className={styles.signupLink} href="#">Create an account.</a></p>
        </div>
    );
}
