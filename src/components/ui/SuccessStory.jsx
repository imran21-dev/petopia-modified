import { Link } from "react-router-dom";
import { Button } from "./button";
import SwipperStory from "./SwipperStory";
import Title from "./Title";


const SuccessStory = () => {
    return (
        <div>
            <Title title='Success Stories' desc='Heartwarming tales of pets finding their forever homes. Be inspired to make a difference today.'></Title>
            <SwipperStory></SwipperStory>
            <div className="flex justify-center pt-10">

           <Link to='/pet-listing'> <Button className='md:text-sm text-xs h-max'>Adopt a Pet</Button></Link>
            </div>
        </div>
    );
};

export default SuccessStory;