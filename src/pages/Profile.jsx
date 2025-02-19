import { AssetContext } from '@/auth/ContextApi';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AssetContext);
    const handleImage = (e) => {
        e.target.src = fakeUser;
      };
    return (
        <div>
              <div className="flex flex-col text-center md:text-left md:flex-row items-center md:gap-10 gap-3 w-full">
                    <img
                      onError={handleImage}
                      className="w-44 h-44 rounded-full object-cover"
                      src={user?.photoURL}
                      alt=""
                    />
                    <div className="flex flex-col items-center md:items-start">
                      <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                      <p className="text-sm ">{user?.email}</p>
                      </div>
                  </div>
                <div className='grid md:grid-cols-3 gap-5 mt-10 text-center'>
                <Link className='bg-secondary px-10 py-7 text-primary text-2xl font-semibold rounded-xl' to='/dashboard/my-pets'>My Pets</Link>
                <Link className='bg-secondary px-10 py-7 text-primary text-2xl font-semibold rounded-xl' to='/dashboard/my-donations'>My Donations</Link>
                <Link className='bg-secondary px-10 py-7 text-primary text-2xl font-semibold rounded-xl' to='/dashboard/my-campaign'>My Campaigns</Link>

                </div>
        </div>
    );
};

export default Profile;