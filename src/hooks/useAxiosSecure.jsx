import { AssetContext } from "@/auth/ContextApi";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const axiosInstance = axios.create({
  baseURL: "https://petopia-server-indol.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
    const { toast } = useToast()
  const { logOut } = useContext(AssetContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${error.code}`,
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
            });
        }
        return Promise.reject(error)
      }
    );
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
