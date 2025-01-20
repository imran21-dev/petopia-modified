import { AssetContext } from "@/auth/ContextApi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user, loading} = useContext(AssetContext)
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin, isPending: isAdminPending} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/user/admin?email=${user.email}`)
            return res.data?.admin
        }
    })
 
    return [isAdmin, isAdminPending]
};

export default useAdmin;