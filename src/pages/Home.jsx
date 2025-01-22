
import AboutUs from "@/components/ui/AboutUs";
import Banner from "@/components/ui/Banner";
import CallToAction from "@/components/ui/CallToAction";
import CategoryPets from "@/components/ui/CategoryPets";
import Footer from "@/components/ui/Footer";
import PetCare from "@/components/ui/PetCare";

import SuccessStory from "@/components/ui/SuccessStory";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";




const Home = () => {
useEffect(() => {
  window.scrollTo(0,0)
},[])
  return (
    <div >
      <Helmet>
        <title>Home | Petopia</title>
      </Helmet>
      <div className="bg-primary/10">
        <Banner></Banner>
      </div>
      <div  className="w-11/12 mx-auto pb-10">
     
      <CategoryPets></CategoryPets>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      <SuccessStory></SuccessStory>
      <PetCare></PetCare>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
