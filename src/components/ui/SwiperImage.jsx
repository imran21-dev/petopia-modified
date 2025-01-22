import { Swiper, SwiperSlide } from "swiper/react";
import pet1 from "../../assets/pet1.jpg";
import pet2 from "../../assets/pet2.jpg";
import pet3 from "../../assets/pet3.jpg";
import pet4 from "../../assets/pet4.jpg";
import pet5 from "../../assets/pet5.jpg";
import pet6 from "../../assets/pet6.jpg";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

const SwiperImage = () => {
  return (
    <div className="py-10 relative z-0">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop='true'
        autoplay={{
          
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet1}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet5}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet6}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet3}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet4}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative  swipperCard">
            <img
              src={pet2}
              alt=""
              className="w-full h-20 md:h-60 object-cover rounded-2xl "
            />
            <p className="absolute flex opacity-0 duration-300 swipperText bg-gradient-to-t from-background/50 to-transparent h-full  w-full items-end p-5 font-semibold backdrop-blur-sm bottom-0 rounded-2xl">
              Adopt. Love. Transform Lives.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperImage;
