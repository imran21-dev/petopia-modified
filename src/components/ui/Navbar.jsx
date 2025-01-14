import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import fakeUser from "../../assets/fakeuser.webp";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import ThemeToggler from "./ThemeToggler";
import Headroom from "react-headroom";

const Navbar = () => {
  
  return (
    <Headroom>

    <div className={` duration-300 z-50 relative bg-background`}>
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
          <Link>
            <Button>Login</Button>
          </Link>
          <Link>
            {" "}
            <Button variant="secondary">Sign up</Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={fakeUser}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex gap-2 items-center">
                  <img
                    src={fakeUser}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h1 className="">Mohammad Imran</h1>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link className="flex gap-1 items-center">
                  <RxDashboard className="text-lg" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="flex gap-1 items-center">
                  <MdLogout className="text-lg" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggler></ThemeToggler>
        </div>
      </div>
    </div>
    </Headroom>
  );
};

export default Navbar;
