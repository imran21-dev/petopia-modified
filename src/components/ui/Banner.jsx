import React from 'react';
import { Button } from "@/components/ui/button"

import pet from '../../assets/pet.jpg'
const Banner = () => {
    return (
        <div className='flex w-11/12 mx-auto relative  pt-5 pb-10'>
         
            <div className="w-2/4 flex justify-center -mt-5 flex-col relative">
     
  
            <h1 className='text-5xl leading-[60px] font-extrabold text-primary'>Adopt A <br />Furry Friend</h1>
            <p className='text-base opacity-80'>Find your perfect companion and give a loving home to a furry friend. Explore adorable pets waiting for adoption today!</p>
            <form className=''>
            <div className='overflow-hidden bg-background flex w-2/4 mt-5  px-1 py-1 rounded-2xl'>
                <input type="text" placeholder='Search here' className='bg-transparent indent-3 w-full'/>
                <Button>Search</Button>
            </div>
            </form>
            </div>


            <div className="w-2/4 flex justify-center relative">

            <img src={pet} alt="" className='animate-im w-96 h-96 object-cover ' />
            </div>
        </div>
    );
};

export default Banner;