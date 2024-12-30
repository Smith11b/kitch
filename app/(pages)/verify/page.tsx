
import styles from './verify.module.css';
import Image from 'next/image';


export default function VerifyPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-secondary-blue">
            <div className="w-[80%] m-w-[800px] flex flex-col items-center justify-center border-solid border-gray-300 border p-4 rounded-lg">
                <Image src= "/images/logo pink.png" alt="logo" width={100} height={80} />
            <h1 className="text-center leading-none my-8">Please check your email and confirm your email address</h1>
            <p className='text-center text-lg'>We can&apos;t have the robot overlords stopping us from helping you help feed people with ease. Please take a second to confirm we have your correct email address. </p>
            </div>
        </div>
    );
}
