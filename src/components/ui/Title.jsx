import React from 'react';

const Title = ({title, desc}) => {
    return (
        <div className='flex flex-col items-center text-center  pt-20 pb-10 gap-2'>
            <h1 className='text-3xl  font-bold  text-primary flex items-center gap-2'><div className='w-3 h-3 rounded-full bg-primary'></div> {title} <div className='w-20 h-1 bg-primary'></div></h1>
            <p className='w-2/4 opacity-70'>{desc}</p>
        </div>
    );
};

export default Title;