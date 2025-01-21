import Lottie from 'lottie-react';
import errorLottie from '../assets/error.json';
import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
    const {status, statusText, error} = useRouteError()
 
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='w-1/6 h-max'>
                <Lottie animationData={errorLottie}></Lottie>
            </div>
            <h1 className='text-4xl font-semibold text-red-500'>{status}</h1>
            <p className='font-semibold'>{statusText}</p>
            <p className='pb-5'>{error?.message}</p>
            <Link to='/'><Button>Go to Home</Button></Link>
        </div>
    );
};

export default ErrorPage;