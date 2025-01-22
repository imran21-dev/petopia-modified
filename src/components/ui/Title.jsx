import React from 'react';

const Title = ({title, desc}) => {
    return (
        <div className='flex flex-col items-center text-center pt-10 md:pt-20 pb-5 md:pb-10 gap-2'>
            <h1 className='text-lg md:text-3xl  font-bold  text-primary flex items-center gap-2'><div className='md:w-3 w-2 md:h-3 h-2 rounded-full bg-primary'></div> {title} <div className='w-10 md:w-20 h-1 bg-primary'></div></h1>
            <p className='text-xs md:text-base md:w-2/4 opacity-70'>{desc}</p>
        </div>
    );
};

export default Title;