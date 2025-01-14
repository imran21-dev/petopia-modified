import { Button } from "@/components/ui/button";
import PetCard from "@/components/ui/PetCard";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CategorySelector from "@/components/ui/CategorySelector";
import noResule from "../assets/noresult.json";
import Lottie from "lottie-react";
import { CgClose } from "react-icons/cg";

const PetListing = () => {
  const skeleton = [1, 1, 1, 1, 1, 1, 1, 1];
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [demoLoad, setDemoLoad] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const onSubmit = (data) => {
    if (data.keyword.trim() === "") {
      setKeyword("");
      return;
    } else {
      setKeyword(data.keyword);
      refetch();
      setSelectedCategory("");
    }
  };

  useEffect(() => {
    document.getElementById("Form").reset();
  }, [demoLoad]);

  const {
    data: allPets,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPets", keyword, selectedCategory],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pets?keyword=${keyword}&category=${selectedCategory}`
      );
      return res.data;
    },
  });

  const handleReset = () => {
    setKeyword("");
  };

  return (
    <div className="w-11/12 mx-auto pt-5">
      <div className="grid grid-cols-3 items-center pb-5">
        <h1 className="text-xl font-bold">All Pets</h1>

        <div className="flex justify-center items-center gap-2 w-full">
        
            <button className={`opacity-0 duration-150 hover:bg-secondary p-2 rounded-full ${keyword && 'opacity-100'}` } onClick={handleReset}>
              <CgClose />
            </button>
        
          <form
            id="Form"
            onSubmit={handleSubmit(onSubmit)}
            className="border w-full  flex items-center pl-2 rounded-full overflow-hidden"
          >
            <CiSearch className="text-xl opacity-50" />
            <input
              type="text"
              {...register("keyword")}
              placeholder="Seacrh..."
              className="bg-transparent pl-1 pr-3 flex-1 "
            />
            <Button className="rounded-full">Search</Button>
          </form>
        </div>
        <div className="flex justify-end">
          <CategorySelector
            setSelectedCategory={setSelectedCategory}
            setKeyword={setKeyword}
            selectedCategory={selectedCategory}
            setDemoLoad={setDemoLoad}
            demoLoad={demoLoad}
          ></CategorySelector>
        </div>
      </div>
      <div>
        {isLoading
          ? ""
          : allPets.length < 1 && (
              <div className="w-full flex justify-center flex-col items-center h-screen">
                <Lottie className="w-96" animationData={noResule}></Lottie>
                <h1 className="text-lg font-medium">No Result</h1>
              </div>
            )}
      </div>

      <div className="grid grid-cols-4 gap-6  pt-5">
        {isLoading ? (
          <>
            {skeleton.map((skeleton, idx) => (
              <Skeleton
                key={idx}
                className="w-full rounded-[50px] h-96"
              ></Skeleton>
            ))}
          </>
        ) : (
          allPets.map((pet) => <PetCard key={pet._id} pet={pet}></PetCard>)
        )}
      </div>
    </div>
  );
};

export default PetListing;
