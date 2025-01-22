import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AssetContext } from "@/auth/ContextApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import Payment from "@/components/ui/Payment";
import CampaignCart from "@/components/ui/CampaignCart";
import { Skeleton } from "@/components/ui/skeleton";

const DonationDetails = () => {
  const { id } = useParams();
  const { user, isOpenPayment, setIsOpenPayment , demoLoad} = useContext(AssetContext);
  const axiosPublic = useAxiosPublic();

  const [forRefetch, setForRefetch] = useState(demoLoad)
  const { data: campaign, isLoading, refetch } = useQuery({
    queryKey: ["campaign", id, demoLoad],
    queryFn: async () => {
      const res = await axiosPublic.get(`/campaign-details?id=${id}`);
      return res.data;
    },
  });
if (forRefetch !== demoLoad) {
  refetch()
}


  const {data: recommendedCampaigns, isLoading: recommendedLoading} = useQuery({
    queryKey:['recommendedCampaigns', id],
    queryFn: async () => {
        const res = await axiosPublic.get(`/recommended-campaigns?id=${id}`)
        return res.data
    }
  })







  const maxAmount = campaign?.maxAmount;
  const donatedAmount = campaign?.donatedAmount;
  const progress = (donatedAmount / maxAmount) * 100;

  const [isOpen, setIsOpen] = useState(false);
  
  const handleDonate = () => {
    if (!user) {
      setIsOpen(true);
    } else {
      setIsOpenPayment(true);
    }
  };



  return (
    <div className="w-11/12 mx-auto pt-3 md:pt-5">
      <h1 className="text-lg lg:text-2xl font-bold pb-3 lg:pb-10">Campaign Details</h1>
      {isLoading ? (
        <div>
            <div className="grid  lg:grid-cols-2 gap-3 lg:gap-10">
                <Skeleton className='w-full h-64 md:h-[500px] rounded-3xl bg-secondary'></Skeleton>
                <div className="space-y-3">
                <Skeleton className='w-4/12 h-4 md:h-8 bg-secondary'></Skeleton>
                    <Skeleton className='w-full h-6 md:h-14 bg-secondary'></Skeleton>
                    <Skeleton className='w-3/12 h-4 md:h-8 bg-secondary'></Skeleton>
                    <Skeleton className='w-3/12 h-4 md:h-8 bg-secondary'></Skeleton>
                    <Skeleton className='w-3/12 h-4 md:h-8 bg-secondary'></Skeleton>
                    <Skeleton className='w-2/12 h-4 md:h-8 bg-secondary'></Skeleton>
                    <Skeleton className='w-5/12 h-2 md:h-5 bg-secondary'></Skeleton>
                    <Skeleton className='w-2/12 h-4 md:h-10 bg-secondary'></Skeleton>
                </div>
            </div>
            <Skeleton className='w-full h-32 mt-5 bg-secondary'></Skeleton>
        </div>
      ) : (
        <div>
          <div className="grid  lg:grid-cols-2 gap-3 lg:gap-10">
            <img
              className="w-full h-64 lg:h-[500px] object-cover rounded-3xl"
              src={campaign.petImage}
              alt=""
            />
            <div>
              <h1 className="text-lg lg:text-2xl font-bold">{campaign.petName}</h1>

              <div>
                {campaign.active ? (
                  <h5 className="text-green-500 font-semibold flex items-center gap-1 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>{" "}
                    Active
                  </h5>
                ) : (
                  <h5 className="text-red-500 font-semibold flex items-center gap-1 ">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>{" "}
                    Paused
                  </h5>
                )}
              </div>

              <p className="text-sm font-medium pb-2 pt-1">
                {campaign.shortDescription}
              </p>

              <h2 className="font-medium text-sm md:text-base flex items-center gap-1">
                Added on <IoMdArrowDropright />
                {moment(campaign.addedDate).format("MMM Do YY")}
              </h2>

              <h2 className="font-medium text-sm md:text-base flex items-center gap-1 py-1 md:py-2">
                Expires in <IoMdArrowDropright />
                {moment(campaign.lastDate).format("MMM Do YY")}
              </h2>

              <h2 className="font-medium text-sm md:text-base flex items-center gap-1 text-primary">
                Already Donated <IoMdArrowDropright /> ${campaign.donatedAmount}
              </h2>
              <h2 className="font-medium text-sm md:text-base flex items-center gap-1 py-1 md:py-2">
                Up to Need <IoMdArrowDropright /> ${campaign.maxAmount}{" "}
              </h2>

              <h2 className="font-medium text-xs md:text-sm">Donation Progress</h2>
              <div className="flex items-center gap-2 pb-3 md:pb-5">
                <div className="w-2/5 bg-secondary h-3  rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 bg-primary h-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <h2 className="font-medium text-sm">{`${progress.toFixed(
                  1
                )}%`}</h2>
              </div>
              <Button className='md:text-sm text-xs h-max' disabled={!campaign.active} onClick={handleDonate}>Donate Now</Button>
              
            </div>
          </div>
          <h2 className="font-semibold pt-3 md:pt-5">Description</h2>
          <p className="text-xs py-1 md:text-sm md:py-3">{campaign.longDescription}</p>

          <h1 className="md:text-xl font-bold pt-3 md:pt-5">Recommended Campaign</h1>
          <div className="">
                {
                recommendedLoading ? <div className="grid grid-cols-3 gap-6 pt-5">
                    <Skeleton className='w-full h-72 md:h-96 rounded-md md:rounded-[50px] bg-secondary'></Skeleton>
                    <Skeleton className='w-full h-72 md:h-96 rounded-md md:rounded-[50px] bg-secondary'></Skeleton>
                    <Skeleton className='w-full h-72 md:h-96 rounded-md md:rounded-[50px] bg-secondary'></Skeleton>
                </div> : 
                recommendedCampaigns.length < 1 ? <div className="font-semibold text-center pt-10">No Result</div> :
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pt-3 md:pt-5">
                    {
                    recommendedCampaigns.map(camp => <CampaignCart camp={camp} key={camp._id} ></CampaignCart>)
                    }
                </div>
                }
          </div>
        </div>
      )}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Restricted</AlertDialogTitle>
            <AlertDialogDescription>
              You need to log in to proceed. Please sign in to access this
              feature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link to="/login">
                <Button>Go to Login</Button>
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpenPayment} onOpenChange={setIsOpenPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adoption Request</DialogTitle>
            <DialogDescription>
              Submit your request and take the first step toward a forever
              friendship.
            </DialogDescription>
          </DialogHeader>

         
            <div className="">
             <Payment></Payment>
            </div>
            
            
         
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationDetails;
