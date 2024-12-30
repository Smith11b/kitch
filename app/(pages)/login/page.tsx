'use client';
import Image from 'next/image';
import SlideTransition from '@/shared/transitions/SlideTransition';



import LoginForm from './components/LoginForm/LoginForm';

export default function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen text-secondary-blue">
            <SlideTransition direction="left" isVisible={true}>
            <Image className="mb-10" src={'/images/logo pink.png'} alt="Kitch Logo" width={80} height={50} />
                <div className="flex flex-col items-center justify center w-[80%]">
                <h1 className="font-extrabold text-5xl text-center mb-2">Welcome back</h1>
                <p className="text-lg pt-2 mb-10">Sign in to continue to your account</p>
                <LoginForm />
                <p className="mt-8">New to our platform? <a className="text-primary-pink font-semibold" href="/signup">Create an account.</a></p>
                </div>
            </SlideTransition>

        </div>
    );
}
