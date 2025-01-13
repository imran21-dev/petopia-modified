import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { Outlet } from "react-router-dom";


const HomePage = () => {
    return (
        <div className="max-w-[1920px] mx-auto">
           <Navbar></Navbar>
           <div className=" ">
            <Outlet></Outlet>
           </div>
        </div>
    );
};

export default HomePage;