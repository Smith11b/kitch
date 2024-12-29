'use client';
import Button from '@/shared/components/button/Button';
import styles from './loginForm.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/repository/auth/signupLogin';
import { handleGoogleLogin } from '@/repository/auth/signupLogin';


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    return (
        <div className={styles.loginForm}>
            <input
                className={styles.loginInput}
                type="email"
                name="email"
                placeholder='name@example.com'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={styles.loginInput}
                type="password"
                name="password"
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                text="Continue with Email"
                onClick={() => handleLogin(email, password, router)}
                className={styles.loginButton}
                type="Primary"
            />
            <div className={styles.orContainer}>
                <span className={styles.orLine}></span>
                <span className={styles.orText}>or</span>
                <span className={styles.orLine}></span>
            </div>

            <Button
                text="Continue with Google"
                onClick={() => handleGoogleLogin()}
                className={styles.googleButton}
                type="Google"
            />
        </div>
    )
}
