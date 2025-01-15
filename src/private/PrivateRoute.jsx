import { AssetContext } from "@/auth/ContextApi";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AssetContext)
    const {pathname} = useLocation()
    if (loading) {
        return <div>loading......</div>
    }
    if (user) {
        return children
    }
    return <Navigate state={{from: pathname}} to='/login'></Navigate>
};

export default PrivateRoute;