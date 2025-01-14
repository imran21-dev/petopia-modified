import React from "react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="flex items-center relative bg-banner-image h-[600px] bg-cover bg-no-repeat bg-center">
        <div className="absolute top-0 left-0 bg-gradient-to-r from-background via-background/60  to-transparent w-2/4 h-full"/>
      <div className="w-11/12 mx-auto">
        <div className="w-2/4 flex justify-center flex-col relative">
          <h1 className="text-5xl leading-[60px] font-extrabold text-primary">
            Adopt A <br />
            Furry Friend
          </h1>
          <p className="text-base opacity-80 w-3/4">
            Find your perfect companion and give a loving home to a furry
            friend. Explore adorable pets waiting for adoption today!
          </p>
          <form className="">
            <div className="overflow-hidden bg-background flex w-2/4 mt-5  px-1 py-1 rounded-2xl">
              <input
                type="text"
                placeholder="Search here"
                className="bg-transparent indent-3 w-full"
              />
              <Button>Search</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
