import { AssetContext } from "@/auth/ContextApi";
import useAdmin from "@/hooks/useAdmin";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AssetContext)
    const [isAdmin, isAdminPending] = useAdmin()
    const {pathname} = useLocation()
    if (loading || isAdminPending) {
        return <div className="flex justify-center items-center h-full"><BarLoader color="#F9802D"/></div>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate state={{from: pathname}} to='/dashboard'></Navigate>
};

export default AdminRoute;