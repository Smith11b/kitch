'use client';
import SlideTransition from '@/shared/transitions/SlideTransition';
import styles from './signup.module.css';
import Image from 'next/image';
import SignupForm from './components/SignupForm/SignupForm';



export default function SignupPage() {

    return (
        <div className={styles.signupContainer}>
            <div className={styles.transitionContainer}>
            <SlideTransition direction="right" isVisible={true}>
            <Image className={styles.logo} src={'/images/logo pink.png'} alt="Kitch Logo" width={80} height={50} />
                <div className={styles.signupFormContainer}>
                <h1>Get Started Today</h1>
                <p>Sign up now to start saving time on you meal prep company</p>
                <SignupForm />
                <p className={styles.loginUpText}>Already have an account?? <a className={styles.signupLink} href="/login">Sign in</a></p>
                </div>
            </SlideTransition>
            </div>
        </div>
    );
}
