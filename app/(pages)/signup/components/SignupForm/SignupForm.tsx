import { FocusEvent, useState } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/shared/supabaseClient';
import Button from '@/shared/components/button/Button';
import styles from './signupForm.module.css'
import { handleSignupSetup, handleGoogleLogin} from '@/repository/auth/signupLogin';
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
    const [hasError, setHasError] = useState(false);

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
                setHasError(true);
                setTimeout(() => {
                    setHasError(false);
                }, 2000);
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
            <div className='max-w-[600px] text-lg'>
                <input
                    className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-8 focus:outline-none"
                    type="text"
                    name="name"
                    placeholder='Your name'
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-8 focus:outline-none"
                    type="text"
                    name="company"
                    placeholder='Company name'
                    onChange={(e) => setCompany(e.target.value)}

                />

                <input
                    className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-8 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder='name@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                      className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-8 focus:outline-none"
                    type="password"
                    name="password"
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => handlePasswordBlur(e)}
                />
                <input
                    className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-8 focus:outline-none"
                    type="password"
                    name="confirm_password"
                    placeholder='confirm password'
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onBlur={(e) => handlePasswordBlur(e)}
                />
                <Button
                    text={hasError ? error : 'Continue with email'}
                    onClick={() => handleSignup()}
                    className={hasError ? "animate-wiggle" : ""}
                    type="Primary"
                />
                <div className="flex items-center w-full my-10 ">
                <span className="flex-1 h-[1px] bg-secondary-blue"></span>
                <span className="px-2.5 text-secondary-blue">or</span>
                <span className="flex-1 h-[1px] bg-secondary-blue"></span>
            </div>

                <Button
                    text="Continue with Google"
                    onClick={() => handleGoogleLogin()}
                    type="Google"
                />
            </div>
        )
    }
