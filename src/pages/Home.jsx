import Banner from "@/components/ui/Banner";
import CategoryPets from "@/components/ui/CategoryPets";

const Home = () => {
  return (
    <div className="">
      <div className="bg-primary/10">
        <Banner></Banner>
      </div>
      <CategoryPets></CategoryPets>
    </div>
  );
};

export default Home;
