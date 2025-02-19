import Lottie from "lottie-react";
import dashboard from "../assets/dashboard.json";
import { useContext } from "react";
import { AssetContext } from "@/auth/ContextApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fakeUser from "../assets/fakeuser.webp";
import useAdmin from "@/hooks/useAdmin";
import { FaDonate, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { MdCampaign, MdPets } from "react-icons/md";
import AllDonations from "./AllDonations";
import { HiMiniUsers } from "react-icons/hi2";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Charts from "@/components/ui/Charts";
const DashboardHome = () => {
  const { user } = useContext(AssetContext);

  const handleImage = (e) => {
    e.target.src = fakeUser;
  };
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
   const {
      data: allPets = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["allPets", user],
      queryFn: async () => {
        const res = await axiosSecure.get(`/all-pets?email=${user.email}`);
        return res.data;
      },
    });

    const {
      data: campaigns,
      isLoadingc,
    
    } = useQuery({
      queryKey: ["campaigns", user],
      queryFn: async () => {
        const res = await axiosSecure.get(`/all-campaings?email=${user.email}`);
        return res.data;
      },
    });

    const {
      data: donations,
      isLoadingmc,
   
    } = useQuery({
      queryKey: ["donations", user],
      queryFn: async () => {
        const res = await axiosSecure.get(`/my-donations?email=${user.email}`);
        return res.data;
      },
    });

    const {
      data: allUser,
      isLoadingu,
    } = useQuery({
      queryKey: ["allUser", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/all-users?email=${user.email}`);
        return res.data;
      },
    });

  return (
    <div className="flex justify-center flex-col w-full items-center pt-3">
      <Helmet>
        <title>Dashboard | Petopia</title>
      </Helmet>

      {/* <div className="flex flex-col text-center md:text-left md:flex-row items-center md:gap-10 gap-3 w-full">
        <img
          onError={handleImage}
          className="w-32 h-32 rounded-full object-cover"
          src={user?.photoURL}
          alt=""
        />
       
      </div> */}

        <section className="w-full">
          {isLoading || isLoadingc || isLoadingmc || isLoadingu ? <>ok</> : <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-3">
            <div className="flex justify-center items-center gap-3 bg-secondary/50  py-10 rounded-lg">
            <HiMiniUsers className="text-3xl" />
            <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{allUser?.length}</h2>
            <h1 className="font-medium">Total User</h1>
            </div>
          </div>

            <div className="flex justify-center items-center gap-3 bg-secondary/50 w-full py-10 rounded-lg">
            <MdPets className="text-3xl" />
            <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{allPets?.length}</h2>
            <h1 className="font-medium">Total Pets</h1>
            </div>
          </div>

            <div className="flex justify-center items-center gap-3 bg-secondary/50  py-10 rounded-lg">
            <FaHandHoldingDollar className="text-3xl" />
            <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{campaigns?.length}</h2>
            <h1 className="font-medium">Total Campaigns</h1>
            </div>
          </div>
          

            <div className="flex justify-center items-center gap-3 bg-secondary/50  py-10 rounded-lg">
            <FaDonate className="text-3xl" />
            <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{donations?.length}</h2>
            <h1 className="font-medium">My Donations</h1>
            </div>
          </div>


          </div>
          <Charts donations={campaigns}></Charts>
          </> 
          
          }
          
        </section>
      
      
    </div>
  );
};

export default DashboardHome;
