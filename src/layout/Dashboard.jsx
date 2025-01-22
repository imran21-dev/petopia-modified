import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { RiApps2AddFill } from "react-icons/ri";
import { FaCat } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoAccessibility } from "react-icons/io5";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { MdPets } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import useAdmin from "@/hooks/useAdmin";
import { MdMenuOpen } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Drawer } from "@mui/material";

const Dashboard = () => {
  
  const [isAdmin] = useAdmin();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div id="dashboard" className="grid  w-full grid-cols-12   absolute mx-auto top-0">
      <div className="col-span-2 hidden lg:block pt-20 h-screen -mt-16 bg-secondary/50">
        <h1 className="text-xl px-5 font-semibold">
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </h1>
        {isAdmin ? (
          <div className="pt-5 w-full flex gap-1 flex-col">
            <NavLink to="/dashboard/home" className="dashboard-list">
              <GoHomeFill className="text-lg" />
              Admin Home
            </NavLink>

            <NavLink to="/dashboard/add-pet" className="dashboard-list">
              <RiApps2AddFill className="text-lg" />
              Add a Pet
            </NavLink>

            <NavLink to="/dashboard/my-pets" className="dashboard-list">
              <FaCat className="text-lg" />
              My Pets
            </NavLink>

            <NavLink
              to="/dashboard/adoption-requests"
              className="dashboard-list"
            >
              <IoAccessibility className="text-lg" />
              Adoption Requests
            </NavLink>

            <NavLink to="/dashboard/create-campaign" className="dashboard-list">
              <BiSolidDonateHeart className="text-lg" />
              Create Campaign
            </NavLink>

            <NavLink to="/dashboard/my-campaign" className="dashboard-list">
              <MdCampaign className="text-lg" />
              My Campaigns
            </NavLink>

            <NavLink to="/dashboard/my-donations" className="dashboard-list">
              <FaDonate className="text-lg" />
              My Donations
            </NavLink>

            <div className="h-[1px] w-11/12 mx-auto bg-accent-foreground/10"></div>

            <NavLink to="/dashboard/users" className="dashboard-list">
              <HiMiniUsers className="text-lg" />
              All Users
            </NavLink>

            <NavLink to="/dashboard/all-pets" className="dashboard-list">
              <MdPets className="text-lg" />
              All Pets
            </NavLink>

            <NavLink to="/dashboard/all-donation" className="dashboard-list">
              <FaHandHoldingDollar className="text-lg" />
              All Donations
            </NavLink>
          </div>
        ) : (
          <div className="pt-5 w-full flex gap-1 flex-col">
            <NavLink to="/dashboard/home" className="dashboard-list">
              <GoHomeFill className="text-lg" />
              Home
            </NavLink>

            <NavLink to="/dashboard/add-pet" className="dashboard-list">
              <RiApps2AddFill className="text-lg" />
              Add a Pet
            </NavLink>

            <NavLink to="/dashboard/my-pets" className="dashboard-list">
              <FaCat className="text-lg" />
              My Pets
            </NavLink>

            <NavLink
              to="/dashboard/adoption-requests"
              className="dashboard-list"
            >
              <IoAccessibility className="text-lg" />
              Adoption Requests
            </NavLink>

            <NavLink to="/dashboard/create-campaign" className="dashboard-list">
              <BiSolidDonateHeart className="text-lg" />
              Create Campaign
            </NavLink>

            <NavLink to="/dashboard/my-campaign" className="dashboard-list">
              <MdCampaign className="text-lg" />
              My Campaigns
            </NavLink>

            <NavLink to="/dashboard/my-donations" className="dashboard-list">
              <FaDonate className="text-lg" />
              My Donations
            </NavLink>
          </div>
        )}
      </div>
      <div  className="absolute block lg:hidden  pt-5">
        <button className="text-xl bg-secondary p-2 rounded-tr-3xl rounded-br-3xl" onClick={toggleDrawer(true)}><MdMenuOpen/></button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        <div onClick={toggleDrawer(false)} className="bg-background text-accent-foreground h-full">
        <h1 className="text-lg pt-5 px-5 font-semibold">
          {isAdmin ? "Admin Dashboard" : "Dashboard"}
        </h1>
        {isAdmin ? (
          <div id="mobile-dashboard" className="pt-5 w-full text-sm flex gap-1 flex-col">
            <NavLink to="/dashboard/home" className="dashboard-list">
              <GoHomeFill className="text-lg" />
              Admin Home
            </NavLink>

            <NavLink to="/dashboard/add-pet" className="dashboard-list">
              <RiApps2AddFill className="text-lg" />
              Add a Pet
            </NavLink>

            <NavLink to="/dashboard/my-pets" className="dashboard-list">
              <FaCat className="text-lg" />
              My Pets
            </NavLink>

            <NavLink
              to="/dashboard/adoption-requests"
              className="dashboard-list"
            >
              <IoAccessibility className="text-lg" />
              Adoption Requests
            </NavLink>

            <NavLink to="/dashboard/create-campaign" className="dashboard-list">
              <BiSolidDonateHeart className="text-lg" />
              Create Campaign
            </NavLink>

            <NavLink to="/dashboard/my-campaign" className="dashboard-list">
              <MdCampaign className="text-lg" />
              My Campaigns
            </NavLink>

            <NavLink to="/dashboard/my-donations" className="dashboard-list">
              <FaDonate className="text-lg" />
              My Donations
            </NavLink>

            <div className="h-[1px] w-11/12 mx-auto bg-accent-foreground/10"></div>

            <NavLink to="/dashboard/users" className="dashboard-list">
              <HiMiniUsers className="text-lg" />
              All Users
            </NavLink>

            <NavLink to="/dashboard/all-pets" className="dashboard-list">
              <MdPets className="text-lg" />
              All Pets
            </NavLink>

            <NavLink to="/dashboard/all-donation" className="dashboard-list">
              <FaHandHoldingDollar className="text-lg" />
              All Donations
            </NavLink>
          </div>
        ) : (
          <div className="pt-5 w-full flex gap-1 flex-col">
            <NavLink to="/dashboard/home" className="dashboard-list">
              <GoHomeFill className="text-lg" />
              Home
            </NavLink>

            <NavLink to="/dashboard/add-pet" className="dashboard-list">
              <RiApps2AddFill className="text-lg" />
              Add a Pet
            </NavLink>

            <NavLink to="/dashboard/my-pets" className="dashboard-list">
              <FaCat className="text-lg" />
              My Pets
            </NavLink>

            <NavLink
              to="/dashboard/adoption-requests"
              className="dashboard-list"
            >
              <IoAccessibility className="text-lg" />
              Adoption Requests
            </NavLink>

            <NavLink to="/dashboard/create-campaign" className="dashboard-list">
              <BiSolidDonateHeart className="text-lg" />
              Create Campaign
            </NavLink>

            <NavLink to="/dashboard/my-campaign" className="dashboard-list">
              <MdCampaign className="text-lg" />
              My Campaigns
            </NavLink>

            <NavLink to="/dashboard/my-donations" className="dashboard-list">
              <FaDonate className="text-lg" />
              My Donations
            </NavLink>
          </div>
        )}
      </div>
        </Drawer>
      </div>
      <div className="lg:col-span-10 col-span-12 pt-5  px-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
