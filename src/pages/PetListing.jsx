import { Button } from "@/components/ui/button";
import PetCard from "@/components/ui/PetCard";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CategorySelector from "@/components/ui/CategorySelector";
import noResule from "../assets/noresult.json";
import Lottie from "lottie-react";
import { CgClose } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PetListing = () => {
  const skeleton = [1, 1, 1, 1, 1, 1, 1, 1];
  const axiosPublic = useAxiosPublic();

  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [demoLoad, setDemoLoad] = useState(0);
  const [keyword, setKeyword] = useState(state?.keyword ? state.keyword : "");
  const [selectedCategory, setSelectedCategory] = useState(
    state?.category ? state.category : ""
  );

  const { ref, inView } = useInView();

  const {
    data: allPets,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["allPets", keyword, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosPublic.get(
        `/pets?keyword=${keyword}&category=${selectedCategory}&page=${pageParam}&limit=8`
      );

      return res.data;
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const onSubmit = (data) => {
    if (data.keyword.trim() === "") {
      setKeyword("");
      return;
    }

    setKeyword(data.keyword);
    refetch();
    setSelectedCategory("");
  };

  useEffect(() => {
    document.getElementById("Form").reset();
  }, [demoLoad]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleReset = () => {
    setKeyword("");
    document.getElementById("Form").reset();
  };

  return (
    <div className="w-11/12 mx-auto pt-3 md:pt-5">
      <Helmet>
        <title>Pet Listing | Petopia</title>
      </Helmet>
      <div className="grid gap-2 lg:grid-cols-3 items-center pb-5">
        <h1 className="text-lg md:text-xl font-bold">All Pets</h1>
        <div className="flex justify-center  items-center gap-2 w-full">
          <button
            className={`opacity-0 duration-150 hover:bg-secondary p-2 rounded-full ${
              keyword && "opacity-100"
            }`}
            onClick={() => handleReset()}
          >
            <CgClose />
          </button>
          <form
            id="Form"
            onSubmit={handleSubmit(onSubmit)}
            className="border text-sm md:text-base  flex items-center pl-2 rounded-full overflow-hidden"
          >
            <CiSearch className="text-3xl opacity-50" />
            <input
              type="text"
              {...register("keyword")}
              placeholder="Search..."
              className="bg-transparent pl-1 pr-3 w-full"
            />
            <Button className="md:text-sm text-xs h-max">Search</Button>
          </form>
        </div>
        <div className="flex  justify-end">
          <CategorySelector
            setSelectedCategory={setSelectedCategory}
            setKeyword={setKeyword}
            selectedCategory={selectedCategory}
            setDemoLoad={setDemoLoad}
            demoLoad={demoLoad}
          />
        </div>
      </div>
      <div>
        {allPets?.pages[0].pets.length === 0 && !isFetchingNextPage && (
          <div className="w-full flex justify-center flex-col items-center h-screen">
            <Lottie className="w-44 md:w-96" animationData={noResule}></Lottie>
            <h1 className="text-lg font-medium">No Results</h1>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 md:pt-5">
          {skeleton.map((skeleton, idx) => (
            <Skeleton
              key={idx}
              className="w-full rounded-md md:rounded-[50px] h-72 md:h-96 bg-secondary"
            ></Skeleton>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 md:pt-5">
          {allPets?.pages.map((page) =>
            page.pets.map((pet) => <PetCard key={pet._id} pet={pet}></PetCard>)
          )}
          {isFetchingNextPage &&
            skeleton.map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-full rounded-[50px] h-96 bg-secondary"
              />
            ))}
        </div>
      )}
      <div ref={ref} className="text-center text-sm py-5 opacity-50">
        {isFetchingNextPage && <p>Loading...</p>}
        {!hasNextPage && !isLoading && <p>No more pet available</p>}
      </div>
    </div>
  );
};

export default PetListing;
