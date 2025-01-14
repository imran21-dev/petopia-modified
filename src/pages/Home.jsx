import Banner from "@/components/ui/Banner";
import CallToAction from "@/components/ui/CallToAction";
import CategoryPets from "@/components/ui/CategoryPets";

const Home = () => {
  return (
    <div>
      <div className="bg-primary/10">
        <Banner></Banner>
      </div>
      <div  className="w-11/12 mx-auto">
      <CategoryPets></CategoryPets>
      <CallToAction></CallToAction>
      </div>
    </div>
  );
};

export default Home;
