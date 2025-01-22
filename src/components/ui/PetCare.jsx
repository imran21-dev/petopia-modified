import React from 'react';
import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './skeleton';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const PetCare = () => {
    const skeleton = [1,1,1,1,1,1,1,1]
    const axiosPublic = useAxiosPublic()
    const {data: care, isLoading} = useQuery({
        queryKey: ['care'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tips')
            return res.data
        }
    })

   
    return (
        <div>
            <Title title='Pet Care Tip' desc='Caring for pets goes beyond just food and shelter. Discover essential tips to keep your furry, feathered, or scaly friends happy, healthy, and thriving every day.'></Title>
       <div className='grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6'>
       {
        isLoading? <>
            {skeleton.map((skeleton, idx) => <Skeleton key={idx} className='w-full h-60 bg-secondary'></Skeleton>)}
        </>
         : care.map((care, idx) => <div key={idx} className='bg-secondary p-5 rounded-2xl flex flex-row  items-center md:gap-6 gap-2'>
            <img src={care.icon} alt="" className='w-10 md:w-20'/>
            <div>
            <h1 className='md:text-lg font-semibold'>{care.title}</h1>
            <p className='text-xs md:text-base opacity-70'>{care.description}</p>
            </div>
        </div>)
        }
       </div>
        </div>
    );
};

export default PetCare;