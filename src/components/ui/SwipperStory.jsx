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
        { isLoading ? <div className='flex items-center justify-center h-20'>
            loading...
        </div> :
        story.map((story, idx) =>   <SwiperSlide className='pl-2 w-full' key={idx}><div className='flex md:flex-row flex-col gap-4 md:gap-6 lg:gap-20 '> 
            <figure className='md:w-2/4'>
            <img src={story.image} alt="" className='w-full object-cover rounded-3xl md:h-96 h-44' />
            </figure>
            <div className='md:w-2/4'>
            <h2 className='md:text-2xl font-bold pb-2'>{story.pet_name}</h2>
            <p className='text-xs md:text-base'>{story.story}</p>
            <h2 className='pt-3 md:pt-5 text-xs md:text-sm flex items-center gap-1'><IoCalendar />{story.adopted_date}</h2>
            <h2 className='pt-2 text-xs md:text-sm flex items-center gap-1'><FaLocationDot /> {story.location}</h2>
            </div>
        </div></SwiperSlide>
    )
        }
      
      </Swiper>
        </div>
    );
};

export default SwipperStory;