'use client';
import Button from '@/shared/components/button/Button';
import styles from './loginForm.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/shared/supabaseClient';


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Login error:', error.message);
            return;
        }

        if (data && data.session) {
            const { access_token, refresh_token } = data.session;
            await fetch('/api/setSession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ access_token, refresh_token }),
            });

            router.push('/dashboard');
        }
    }

    async function handleGoogleLogin() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
            },
        });

        if (error) {
            console.error('Google sign-in error:', error.message);
            return;
        }
    }



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
                onClick={() => handleLogin()}
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
