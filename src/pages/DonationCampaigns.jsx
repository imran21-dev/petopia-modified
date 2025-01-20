import CampaignCart from "@/components/ui/CampaignCart";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import noResule from "../assets/noresult.json";


const DonationCampaigns = () => {
    const axiosPublic = useAxiosPublic()
    const {data : allCampaigns, isLoading} = useQuery({
        queryKey: ['allCampaigns'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-campaigns')
            return res.data
        }
    })

    return (
        <div className="w-11/12 mx-auto pt-5">
            <h1 className="text-xl font-bold">Donation Campaigns</h1>
            {
            isLoading? <div className="grid grid-cols-3 gap-6 pt-5">
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
                <Skeleton className='w-full h-96 rounded-[50px] bg-secondary'></Skeleton>
            </div> :
              allCampaigns?.length < 1 ? <div className="w-full flex justify-center flex-col items-center h-screen">
              <Lottie className="w-96" animationData={noResule}></Lottie>
              <h1 className="text-lg font-medium">No Result</h1>
            </div> :
             <div className="grid grid-cols-3 gap-6 pt-5">
                {
                allCampaigns.map(camp => <CampaignCart key={camp._id} camp={camp}></CampaignCart>)
                }
             </div>
            }
        </div>
    );
};

export default DonationCampaigns;