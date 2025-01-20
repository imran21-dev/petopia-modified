

import CampaignCart from "@/components/ui/CampaignCart";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useInView } from "react-intersection-observer";
import noResule from "../assets/noresult.json";

const DonationCampaigns = () => {
  const axiosPublic = useAxiosPublic();
  const { ref, inView } = useInView(); 

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allCampaigns"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosPublic.get(`/all-campaigns?page=${pageParam}&limit=6`);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) return undefined; 
      return allPages.length + 1; 
    },
  });


  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="w-11/12 mx-auto pt-5">
      <h1 className="text-xl font-bold">Donation Campaigns</h1>


      {isLoading && (
        <div className="grid grid-cols-3 gap-6 pt-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="w-full h-96 rounded-[50px] bg-secondary"
            />
          ))}
        </div>
      )}

    
      <div className="grid grid-cols-3 gap-6 pt-5">
        {data?.pages.map((page) =>
          page.map((camp) => <CampaignCart key={camp._id} camp={camp} />)
        )}
      </div>


      <div ref={ref} className="text-center text-sm py-5 opacity-50">
        {isFetchingNextPage && <p>Loading...</p>}
        {!hasNextPage && !isLoading && <p>No more campaigns available</p>}
      </div>
    </div>
  );
};

export default DonationCampaigns;
