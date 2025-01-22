import React from 'react';
import { Button } from './button';
import { MdOutlinePets } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const PetCard = ({pet}) => {
    const {pet_age,pet_image,pet_location,pet_name, _id} = pet
    return (
        <div className='rounded-xl md:rounded-[50px] border  overflow-hidden shadow-secondary shadow-sm'>
            <img src={pet_image} alt="" className='w-full h-64 md:h-72 object-cover' />
            <div className='p-3 md:p-5'>
                <h1 className='md:text-lg font-semibold'>{pet_name}</h1>
                 <div className='flex justify-between pb-2 md:pb-3 md:pt-2 pt-1'>
                 <h1 className='text-sm md:text-base flex items-center gap-2'>{pet_age} years old</h1>
                 <h1 className='text-sm md:text-base flex items-center gap-2'><FaLocationDot />{pet_location}</h1>
                 </div>
                <Link to={`/pet-details/${_id}`}><Button className='md:text-sm text-xs h-max'>View Details</Button></Link>
            </div>
        </div>
    );
};

export default PetCard;