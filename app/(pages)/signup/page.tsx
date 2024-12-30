'use client';
import SlideTransition from '@/shared/transitions/SlideTransition';
import Image from 'next/image';
import SignupForm from './components/SignupForm/SignupForm';



export default function SignupPage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen text-secondary-blue">
            <SlideTransition direction="right" isVisible={true}>
            <Image className="mb-10" src={'/images/logo pink.png'} alt="Kitch Logo" width={80} height={50} />
                <div className="flex flex-col items-center justify center w-[80%]">
                <h1 className="font-extrabold text-5xl text-center mb-2">Get Started Today</h1>
                <p className='text-lg pt-2 mb-8'>Sign up now to start saving time on you meal prep company</p>
                <SignupForm />
                <p className="mt-3">Already have an account?? <a className="text-primary-pink font-semibold" href="/login">Sign in</a></p>
                </div>
            </SlideTransition>

        </div>
    );
}
