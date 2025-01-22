import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    const keyword = e.target.keyword.value
    if (keyword.trim() === "") {
      return
    }
    navigate('/pet-listing', {state: {keyword : keyword}})
  }
  return (
    <div className="flex items-end md:items-center relative bg-banner-image h-80 md:h-[600px] bg-cover bg-no-repeat bg-center">
        <div className="absolute top-0 left-0 bg-gradient-to-r from-background via-background/60  to-transparent w-3/4 md:w-2/4 h-full"/>
      <div className="w-11/12 mx-auto ">
        <div className="xl:w-2/4 flex justify-center flex-col relative">
          <h1 className="md:text-5xl text-3xl md:leading-[60px] font-extrabold text-primary">
            Adopt A <br />
            Furry Friend
          </h1>
          <p className="text-xs pt-2 md:text-base opacity-80 w-3/4">
            Find your perfect companion and give a loving home to a furry
            friend. Explore adorable pets waiting for adoption today!
          </p>
          <form onSubmit={handleSearch}>
            <div className="overflow-hidden bg-background flex md:w-2/4 mt-2 mb-3 md:mt-5  px-1 py-1 rounded-2xl">
              <input
               name="keyword"
                type="text"
                placeholder="Search here"
                className="bg-transparent indent-3 text-sm  md:text-base w-full"
              />
              <Button className='text-xs h-max py-2 md:text-sm'>Search</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
