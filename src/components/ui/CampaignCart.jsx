import { Link } from "react-router-dom";
import { Button } from "./button";

const CampaignCart = ({camp}) => {
    const {  donatedAmount, petImage, petName, maxAmount, _id} = camp
 
    return (
        <div className="border rounded-md md:rounded-[50px] shadow-secondary shadow-sm overflow-hidden">
            <img className="w-full h-56 md:h-80 object-cover" src={petImage} alt="" />
                <h1 className="md:px-5 px-3 md:text-lg font-bold pt-2 md:pt-3">{petName}</h1>
            <div className="md:px-5 px-3 pb-1 md:pb-3 flex items-center justify-between">
            <h2 className="font-semibold animate-pulse md:text-lg text-primary">Donated: ${donatedAmount}</h2>
            <h2 className="font-medium text-sm md:text-base">Up to <span className="text-primary font-bold">${maxAmount}</span> Needed</h2>
            </div>
            <div className="md:px-5 px-3 pb-3 md:pb-5">
            <Link to={`/donation-details/${_id}`}><Button className='md:text-sm text-xs h-max'>View Details</Button></Link>
            </div>
        </div>
    );
};

export default CampaignCart;