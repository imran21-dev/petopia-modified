import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import fakeUser from "../../assets/fakeuser.webp";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { FaCloudMoon } from "react-icons/fa";
import { IoPartlySunnySharp } from "react-icons/io5";

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

const Navbar = () => {
  const { user, loading, logOut } = useContext(AssetContext);
  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const { toast } = useToast()
  const [isOpenMenu, setIsOpenMenu] = useState(false) 
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
          title: 'Logged Out!',
           description: "See you soon! Come back anytime.",
         })
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
  useEffect(()=> {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  },[])
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem('theme', newTheme)
  };
  return (
    <Headroom>
      <div className={` duration-300 z-50 relative bg-background shadow-sm`}>
        <div className="w-11/12 mx-auto gap-10 flex items-center">
          <Link to="/" className="text-lg font-bold flex items-center gap-1">
            <img className="w-10" src={logo} alt="" />
            <span>Petopia</span>
          </Link>

          <div id="navbar" className="flex">
            <NavLink to="/" className="navlist-text">
              Home
            </NavLink>
            <NavLink to="/pet-listing" className="navlist-text">
              Pet Listing
            </NavLink>
            <NavLink to="/donation-campaigns" className="navlist-text">
              Donation Campaigns
            </NavLink>
          </div>

          <div className="flex items-center flex-1 justify-end gap-2">
            {loading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="w-20 h-8"></Skeleton>
                <Skeleton className="w-20 h-8"></Skeleton>
                <Skeleton className="w-8 rounded-full h-8"></Skeleton>
              </div>
            ) : (
              <>
                {" "}
                {!user && (
                  <>
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                    <Link to="/registration">
                      {" "}
                      <Button variant="secondary">Sign up</Button>
                    </Link>
                  </>
                )}
                {user && 
                <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
                  <DropdownMenuTrigger onClick={() =>setIsOpenMenu(true)}>
                    <img
                      onError={handleImage}
                      src={user?.photoURL}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <div className="flex gap-2 items-center">
                        <img
                        onError={handleImage}
                          src={user?.photoURL}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <h1 className="">{user?.displayName}</h1>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpenMenu(false)}>
                      <Link to='/dashboard/home' className="flex gap-1 items-center">
                        <RxDashboard className="text-lg" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleTheme}>
                      {theme === 'light' ? 
                      <h1 className="flex gap-1 items-center">
                      <FaCloudMoon className="text-lg"/> Night Mode
                      </h1>:
                      <h1 className="flex gap-1 items-center">
                      <IoPartlySunnySharp className="text-lg"/> Day Mode
                      </h1>
                      }
                    </DropdownMenuItem>
                    
                  
                    
                    <DropdownMenuItem onClick={handleLogOut}>
                      <button
                        
                        className="flex gap-1 items-center"
                      >
                        <MdLogout className="text-lg" />
                        Log out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                }
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
              <AlertDialogAction disabled={spin} onClick={handleContinue}>
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
