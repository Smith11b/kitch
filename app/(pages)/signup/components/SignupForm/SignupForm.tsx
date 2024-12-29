import { FocusEvent, useState } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/shared/supabaseClient';
import Button from '@/shared/components/button/Button';
import styles from './signupForm.module.css'
import { handleSignupSetup, handleGoogleLogin, handleLogin } from '@/repository/auth/signupLogin';
import * as yup from 'yup';
import { signupSchema } from '../validationSchema';


export default function SignupForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');

    async function handleSignup() {
        try {
            // Validate form data
            await signupSchema.validate({ name, email, password, passwordConfirm, company });

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: process.env.NEXT_PUBLIC_CONFIRMATION_URL
                }
            });
            if (error) {
                console.error('Login error:', error.message);
                setError(error.message);
                return;
            }

            await handleSignupSetup(data?.user, email, password, name, company, router);
        } catch (validationError) {
            if (validationError instanceof yup.ValidationError) {
                setError(validationError.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }



        function handlePasswordBlur(e: FocusEvent<HTMLInputElement, Element>) {
            if (e.target.value.length < 6)
                setError('Password must be at least 6 characters');
            else
                setError('');
        }




        return (
            <div className={styles.loginForm}>
                <input
                    className={styles.loginInput}
                    type="text"
                    name="name"
                    placeholder='Your name'
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className={styles.loginInput}
                    type="text"
                    name="company"
                    placeholder='Company name'
                    onChange={(e) => setCompany(e.target.value)}

                />

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
                    onBlur={(e) => handlePasswordBlur(e)}
                />
                <input
                    className={styles.loginInput}
                    type="password"
                    name="confirm_password"
                    placeholder='confirm password'
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onBlur={(e) => handlePasswordBlur(e)}
                />
                <p className={styles.error}>{error}</p>
                <Button
                    text="Continue with Email"
                    onClick={() => handleSignup()}
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
