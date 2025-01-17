import { Link } from "react-router-dom";
import { Button } from "./button";

const CampaignCart = ({camp}) => {
    const {  donatedAmount, petImage, petName, maxAmount, _id} = camp
 
    return (
        <div className="border rounded-[50px] shadow-secondary shadow-sm overflow-hidden">
            <img className="w-full h-80 object-cover" src={petImage} alt="" />
                <h1 className="px-5 text-lg font-bold pt-3">{petName}</h1>
            <div className="px-5 pb-3 flex items-center justify-between">
            <h2 className="font-semibold animate-pulse text-lg text-primary">Donated: ${donatedAmount}</h2>
            <h2 className="font-medium ">Up to <span className="text-primary font-bold">${maxAmount}</span> Needed</h2>
            </div>
            <div className="px-5 pb-5">
            <Link to={`/donation-details/${_id}`}><Button className='rounded-full'>View Details</Button></Link>
            </div>
        </div>
    );
};

export default CampaignCart;