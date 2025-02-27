import { useQuery } from "@tanstack/react-query";

import Title from "./Title";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { Skeleton } from "./skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";



const CategoryPets = () => {
 const skeleton = [1,1,1,1,1,1,1,1,1,1]
 const axiosPublic = useAxiosPublic()
  const {data: category, isLoading} = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
        const res = await axiosPublic.get('/category')
        return res.data
    }
  })

  return (
    <div>
        <Title title='Find Your Perfect Companion' desc='Browse through our pet categories and discover a wide variety of furry, feathery, and scaly friends waiting to bring joy into your life. Your next best friend is just a click away!'></Title>
      <div className="flex items-center justify-center flex-wrap gap-6 md:px-10">
      {
       isLoading ? skeleton.map((skeleton, idx) => <Skeleton key={idx} className='md:w-60 w-20 md:h-60 h-20 bg-secondary'></Skeleton>) : category.map(category => <div key={category.id} className="bg-secondary w-max p-3 md:p-10 rounded-2xl flex flex-col items-center gap-2">
        <img src={category.image} alt="" className="w-10 md:w-20"/>
        <h1 className="text-sm md:text-xl font-bold">{category.category}</h1>
        <Link state={{category : category.category}} to='/pet-listing' className="text-primary border border-primary px-3 py-1 rounded-full hover:text-background duration-150 hover:bg-primary text-xs md:text-sm font-medium flex items-center gap-1">View More <GoArrowRight className="text-lg"/></Link>
       </div>)
      }
      </div>
    </div>
  );
};

export default CategoryPets;
