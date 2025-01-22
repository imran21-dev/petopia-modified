import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://petopia-server-indol.vercel.app"
})
const useAxiosPublic = () => {
    return axiosInstance
};

export default useAxiosPublic;