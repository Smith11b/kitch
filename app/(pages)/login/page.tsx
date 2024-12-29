'use client';
import styles from './login.module.css'
import Image from 'next/image';
import SlideTransition from '@/shared/transitions/SlideTransition';



import LoginForm from './components/LoginForm/LoginForm';

export default function LoginPage() {

    return (
        <div className={styles.loginContainer}>
            <div className={styles.transitionContainer}>
            <SlideTransition direction="left" isVisible={true}>
            <Image className={styles.logo} src={'/images/logo pink.png'} alt="Kitch Logo" width={80} height={50} />
                <div className={styles.loginFormContainer}>
                <h1>Welcome back</h1>
                <p>Sign in to continue to your account</p>
                <LoginForm />
                <p className={styles.signUpText}>New to our platform? <a className={styles.signupLink} href="/signup">Create an account.</a></p>
                </div>
            </SlideTransition>
            </div>
        </div>
    );
}
