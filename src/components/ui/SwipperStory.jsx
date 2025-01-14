import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { Skeleton } from './skeleton';


const SwipperStory = () => {


    const {data: story, isLoading} = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await fetch('story.json')
            return res.json()
        }
    })




    return (
        <div className='relative z-0 '>
               <Swiper
        pagination={{
          dynamicBullets: false,
        }}
        
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }}
  
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        { isLoading ? <div className='flex gap-20'>
            <Skeleton className='w-2/4 h-96'></Skeleton>
            <div className='w-2/4 space-y-2'>
            <Skeleton className='w-32 h-8'></Skeleton>
            <Skeleton className='w-full h-3'></Skeleton>
            <Skeleton className='w-full h-3'></Skeleton>
            <Skeleton className='w-2/3 h-3'></Skeleton>
            <Skeleton className='w-full h-3'></Skeleton>
            <Skeleton className='w-full h-3'></Skeleton>
            <Skeleton className='w-2/3 h-3'></Skeleton>
            <Skeleton className='w-32 h-3'></Skeleton>
            <Skeleton className='w-32 h-3'></Skeleton>
            </div>
        </div> :
        story.map((story, idx) =>   <SwiperSlide className='pl-2 w-full' key={idx}><div className='flex gap-20 '> 
            <figure className='w-2/4'>
            <img src={story.image} alt="" className='w-full object-cover rounded-3xl h-96' />
            </figure>
            <div className='w-2/4'>
            <h2 className='text-2xl font-bold pb-2'>{story.pet_name}</h2>
            <p>{story.story}</p>
            <h2 className='pt-5 text-sm flex items-center gap-1'><IoCalendar />{story.adopted_date}</h2>
            <h2 className='pt-2 text-sm flex items-center gap-1'><FaLocationDot /> {story.location}</h2>
            </div>
        </div></SwiperSlide>
    )
        }
      
      </Swiper>
        </div>
    );
};

export default SwipperStory;