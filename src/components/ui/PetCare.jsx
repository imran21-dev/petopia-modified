import React from 'react';
import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './skeleton';

const PetCare = () => {
    const skeleton = [1,1,1,1,1,1,1,1]
    const {data: care, isLoading} = useQuery({
        queryKey: ['care'],
        queryFn: async () => {
            const res = await fetch('./tips.json')
            return res.json()
        }
    })

   
    return (
        <div>
            <Title title='Pet Care Tip' desc='Caring for pets goes beyond just food and shelter. Discover essential tips to keep your furry, feathered, or scaly friends happy, healthy, and thriving every day.'></Title>
       <div className='grid grid-cols-4 gap-6'>
       {
        isLoading? <>
            {skeleton.map((skeleton, idx) => <Skeleton key={idx} className='w-full h-60'></Skeleton>)}
        </>
         : care.map((care, idx) => <div key={idx} className='bg-secondary p-5 rounded-2xl flex items-center gap-6'>
            <img src={care.icon} alt="" className='w-20'/>
            <div>
            <h1 className='text-lg font-semibold'>{care.title}</h1>
            <p className='opacity-70'>{care.description}</p>
            </div>
        </div>)
        }
       </div>
        </div>
    );
};

export default PetCare;