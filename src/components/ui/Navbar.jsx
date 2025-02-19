import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import fakeUser from "../../assets/fakeuser.webp";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { FaCloudMoon } from "react-icons/fa";
import { IoPartlySunnySharp } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

import Headroom from "react-headroom";
import { AssetContext } from "@/auth/ContextApi";
import { Skeleton } from "./skeleton";
import { ImSpinner3 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { user, loading, logOut, demoLoadTheme, setDemoLoadTheme } =
    useContext(AssetContext);
  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const { toast } = useToast();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
  const [open, setOpen] = useState(false)

  const {pathname} = useLocation()
  

  return (
    <Headroom>
      <div className={` duration-300 z-50 relative pt-2 pb-2 md:pb-0 md:pt-0 bg-background shadow-sm ${pathname.includes('/dashboard') && 'hidden'} ` }>
        <div className="w-11/12 mx-auto md:gap-10 flex  items-center">
         <div className="relative block md:hidden">
         <button  onClick={() => setOpen(!open)} className="hover:bg-secondary p-2 rounded-full mr-2 text-sm">{open ? <IoMdClose/> : <RiMenu2Fill/>}</button> 
         <div id="mobile-nav" className={`bg-background shadow-md  h-max absolute  left-0 px-5 py-3 gap-1 w-max rounded-xl flex-col ${open ? 'flex' : 'hidden'}`}>
          <NavLink onClick={() => setOpen(!open)} to='/' className='text-sm font-medium'>Home</NavLink>
          <NavLink onClick={() => setOpen(!open)} to='/pet-listing' className='text-sm font-medium'>Pet Listing</NavLink>
          <NavLink onClick={() => setOpen(!open)} to='/donation-campaigns' className='text-sm font-medium'>Campaigns</NavLink>
         </div>
          </div>  
          <Link to="/" className="text-sm md:text-lg font-bold flex items-center gap-1">
            <img className="w-6 md:w-10" src={logo} alt="" />
            <span>Petopia</span>
          </Link>

          <div id="navbar" className="md:flex hidden">
            <NavLink to="/" className="navlist-text">
              Home
            </NavLink>
            <NavLink to="/pet-listing" className="navlist-text">
              Pet Listing
            </NavLink>
            <NavLink to="/donation-campaigns" className="navlist-text">
              Donation Campaigns
            </NavLink>
             {
             user && <>
             <NavLink to="/dashboard" className="navlist-text">
              Dashboard
            </NavLink>
            <h2 onClick={handleLogOut}  className="navlist-text cursor-pointer">
              Log out
            </h2>
             </>
             }
          </div>

          <div className="flex items-center flex-1 justify-end gap-2">
            {loading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 md:w-20 h-6 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-12 md:w-20 h-6 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="md:w-8 rounded-full h-6 w-6 md:h-8 bg-secondary"></Skeleton>
              </div>
            ) : (
              <>
                {" "}
                {!user && (
                  <>
                    <Link to="/login">
                      <Button className='text-xs h-max py-1 md:py-2 md:text-sm'>Login</Button>
                    </Link>
                    <Link to="/registration">
                      {" "}
                      <Button className='text-xs h-max py-1 md:py-2 md:text-sm' variant="secondary">Sign up</Button>
                    </Link>
                  </>
                )}
                {user && (
                  <DropdownMenu  open={isOpenMenu} onOpenChange={setIsOpenMenu}>
                    <DropdownMenuTrigger onClick={() => setIsOpenMenu(true)}>
                      <img
                        onError={handleImage}
                        src={user?.photoURL}
                        alt=""
                        className="md:w-8 w-6 md:h-8 h-6 rounded-full object-cover border-primary border-2"
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent >
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
                          to="/dashboard/home"
                          className="flex text-xs md:text-sm gap-1 items-center"
                        >
                          <RxDashboard className="md:text-lg" />
                          Dashboard
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
              </>
            )}
          </div>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? This action will end your
                current session, but you can always log back in to continue
                where you left off.
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
    </Headroom>
  );
};

export default Navbar;
