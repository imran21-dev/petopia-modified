import { useQuery } from "@tanstack/react-query";

import Title from "./Title";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";



const CategoryPets = () => {

  const {data: category, isLoading} = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
        const res = await fetch('/category.json')
        return res.json()
    }
  })
console.log(isLoading,category)
  return (
    <div>
        <Title title='Find Your Perfect Companion' desc='Browse through our pet categories and discover a wide variety of furry, feathery, and scaly friends waiting to bring joy into your life. Your next best friend is just a click away!'></Title>
      <div className="flex items-center justify-center flex-wrap gap-6 px-10">
      {
       isLoading ? 'loading..': category.map(category => <div key={category.id} className="bg-secondary w-max p-10 rounded-2xl flex flex-col items-center gap-2">
        <img src={category.image} alt="" className="w-20"/>
        <h1 className="text-xl font-bold">{category.category}</h1>
        <Link className="text-primary border border-primary px-3 py-2 rounded-full hover:text-background duration-150 hover:bg-primary text-sm font-medium flex items-center gap-1">View More <GoArrowRight className="text-lg"/></Link>
       </div>)
      }
      </div>
    </div>
  );
};

export default CategoryPets;
