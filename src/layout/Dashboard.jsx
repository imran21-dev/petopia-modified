import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiApps2AddFill } from "react-icons/ri";
import { FaCat, FaCloudMoon } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoAccessibility, IoPartlySunnySharp } from "react-icons/io5";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { MdCampaign, MdLogout } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { MdPets } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import useAdmin from "@/hooks/useAdmin";
import { MdMenuOpen } from "react-icons/md";
import logo from "../assets/logo.png";
import { Drawer } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { AssetContext } from "@/auth/ContextApi";
import { ImSpinner3 } from "react-icons/im";
const Dashboard = () => {
  const { user, loading, logOut } = useContext(AssetContext);
  const [isAdmin] = useAdmin();
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [spin, setSpin] = useState(false);
  const handleLogOut = () => {
    setIsOpen(true);
  };
  const handleContinue = () => {
    setSpin(true);
    logOut()
      .then(() => {
        setSpin(false);
        setIsOpen(false);
        toast({
          title: "Logged Out!",
          description: "See you soon! Come back anytime.",
        });
      })
      .catch((error) => {
        setSpin(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleImage = (e) => {
    e.target.src = fakeUser;
  };

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setDemoLoadTheme(demoLoadTheme + 1);
  };

  return (
    <div
      id="dashboard"
      className="grid  w-full grid-cols-12   absolute mx-auto top-0"
    >
      <div className="col-span-2 hidden lg:block pt-5 h-screen  bg-secondary/50">
        <Link
          to="/"
          className="text-sm md:text-lg font-bold mx-5 pb-5 flex items-center gap-1"
        >
          <img className="w-6 md:w-10" src={logo} alt="" />
          <span>Petopia</span>
        </Link>
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
      <div className="absolute block lg:hidden  pt-5">
        <button
          className="text-xl bg-secondary p-2 rounded-tr-3xl rounded-br-3xl"
          onClick={toggleDrawer(true)}
        >
          <MdMenuOpen />
        </button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div
            onClick={toggleDrawer(false)}
            className="bg-background text-accent-foreground h-full"
          >
            <Link
              to="/"
              className="text-sm md:text-lg mx-5 py-5 font-bold flex items-center gap-1"
            >
              <img className="w-6 md:w-10" src={logo} alt="" />
              <span>Petopia</span>
            </Link>
            <h1 className="text-lg  px-5 font-semibold">
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </h1>
            {isAdmin ? (
              <div
                id="mobile-dashboard"
                className="pt-5 w-full text-sm flex gap-1 flex-col"
              >
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

                <NavLink
                  to="/dashboard/create-campaign"
                  className="dashboard-list"
                >
                  <BiSolidDonateHeart className="text-lg" />
                  Create Campaign
                </NavLink>

                <NavLink to="/dashboard/my-campaign" className="dashboard-list">
                  <MdCampaign className="text-lg" />
                  My Campaigns
                </NavLink>

                <NavLink
                  to="/dashboard/my-donations"
                  className="dashboard-list"
                >
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

                <NavLink
                  to="/dashboard/all-donation"
                  className="dashboard-list"
                >
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

                <NavLink
                  to="/dashboard/create-campaign"
                  className="dashboard-list"
                >
                  <BiSolidDonateHeart className="text-lg" />
                  Create Campaign
                </NavLink>

                <NavLink to="/dashboard/my-campaign" className="dashboard-list">
                  <MdCampaign className="text-lg" />
                  My Campaigns
                </NavLink>

                <NavLink
                  to="/dashboard/my-donations"
                  className="dashboard-list"
                >
                  <FaDonate className="text-lg" />
                  My Donations
                </NavLink>
              </div>
            )}
          </div>
        </Drawer>
      </div>
      <div className="lg:col-span-10 col-span-12 pt-5  px-5">
        <div className="flex justify-end gap-2">
          {user && (
            <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
              <DropdownMenuTrigger onClick={() => setIsOpenMenu(true)}>
                <img
                  onError={handleImage}
                  src={user?.photoURL}
                  alt=""
                  className="md:w-8 w-6 md:h-8 h-6 rounded-full object-cover border-primary border-2"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <div className="flex gap-2 items-center">
                    <img
                      onError={handleImage}
                      src={user?.photoURL}
                      alt=""
                      className="md:w-8 w-6 md:h-8 h-6 rounded-full object-cover"
                    />
                    <h1 className="text-xs md:text-sm">{user?.displayName}</h1>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpenMenu(false)}>
                  <Link
                    to="/"
                    className="flex text-xs md:text-sm gap-1 items-center"
                  >
                    <GoHomeFill className="md:text-lg" />
                    Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleTheme}>
                  {theme === "light" ? (
                    <h1 className="flex text-xs md:text-sm gap-1 items-center">
                      <FaCloudMoon className="md:text-lg" /> Night Mode
                    </h1>
                  ) : (
                    <h1 className="flex text-xs md:text-sm gap-1 items-center">
                      <IoPartlySunnySharp className="md:text-lg" /> Day Mode
                    </h1>
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogOut}>
                  <button className="flex text-xs md:text-sm gap-1 items-center">
                    <MdLogout className="md:text-lg" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Outlet></Outlet>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? This action will end your
              current session, but you can always log back in to continue where
              you left off.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              disabled={spin}
              onClick={handleContinue}
            >
              {spin && <ImSpinner3 className="animate-spin" />}Yes, Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
