import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { Outlet } from "react-router-dom";


const HomePage = () => {
    return (
        <div className="max-w-[1920px]">
           <Navbar></Navbar>
           <div className="w-11/12 mx-auto ">
            <Outlet></Outlet>
           </div>
        </div>
    );
};

export default HomePage;