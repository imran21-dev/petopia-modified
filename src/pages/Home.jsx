import AboutUs from "@/components/ui/AboutUs";
import Banner from "@/components/ui/Banner";
import CallToAction from "@/components/ui/CallToAction";
import CategoryPets from "@/components/ui/CategoryPets";
import SuccessStory from "@/components/ui/SuccessStory";

const Home = () => {
  return (
    <div>
      <div className="bg-primary/10">
        <Banner></Banner>
      </div>
      <div  className="w-11/12 mx-auto pb-96">
      <CategoryPets></CategoryPets>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
