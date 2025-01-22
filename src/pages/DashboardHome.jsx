import Lottie from 'lottie-react';
import dashboard from '../assets/dashboard.json'
import { useContext } from 'react';
import { AssetContext } from '@/auth/ContextApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import fakeUser from '../assets/fakeuser.webp'
import useAdmin from '@/hooks/useAdmin';
import { FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
const DashboardHome = () => {

    const {user} = useContext(AssetContext)


    const handleImage = (e) => {
        e.target.src = fakeUser
    }
    const [isAdmin] = useAdmin()
    return ( 
        <div className='flex justify-center flex-col items-center pt-3'>

        

           <div className='flex flex-col text-center md:text-left md:flex-row items-center md:gap-10 gap-3 w-full'>
           <img onError={handleImage} className='w-32 h-32 rounded-full object-cover' src={user?.photoURL} alt="" />
            <div>
            <h1 className='text-xl md:text-3xl font-medium'>{isAdmin ? 'Welcome to Admin Dashboard ': 'Welcome to Dashboard '}<span className='font-bold bg-gradient-to-br from-red-600 to-primary text-transparent bg-clip-text'>{user?.displayName.split(' ')[0]}</span></h1>
            <p className='md:text-base text-sm'>Add and Manage Your Pets and Campaigns with Ease!</p>
            </div>
           </div>
            <div className='md:w-6/12 pt-5 md:pt-16'>
                <Lottie  animationData={dashboard}></Lottie>
            </div>
            <Link to='/dashboard/add-pet'><Button className='rounded-full bg-gradient-to-br from-red-600 to-primary'>Get Started</Button></Link>
        </div>
    );
};

export default DashboardHome;