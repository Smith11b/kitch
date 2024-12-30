'use client';
import Button from '@/shared/components/button/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/repository/auth/signupLogin';
import { handleGoogleLogin } from '@/repository/auth/signupLogin';


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    return (
        <div className='max-w-[600px]'>
            <input
                className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-3 focus:outline-none"
                type="email"
                name="email"
                placeholder='name@example.com'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border-solid border-2 border-gray-300 rounded-md p-[13px] w-full text-lg mb-3 focus:outline-none"
                type="password"
                name="password"
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                text={hasError ? error : 'Continue with email'}
                onClick={() => handleLogin(email, password, router, setError, setHasError)}
                className={hasError ? "animate-wiggle" : ""}
                type="Primary"
            />
            <div className="flex items-center w-full my-14 ">
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
