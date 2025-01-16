import { AssetContext } from "@/auth/ContextApi";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AssetContext)
    const {pathname} = useLocation()
    if (loading) {
        return <div className="flex justify-center items-center h-full"><BarLoader color="#F9802D"/></div>
    }
    if (user) {
        return children
    }
    return <Navigate state={{from: pathname}} to='/login'></Navigate>
};

export default PrivateRoute;