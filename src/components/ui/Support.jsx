import { Link } from "react-router-dom";
import Title from "./Title";
import { Button } from "./button";
import { GoArrowRight } from "react-icons/go";
import pet1 from '../../assets/pet1.jpg'
const Support = () => {

  return (
    <div className="text-center">
      <Title
        title="Donate & Support"
        desc="Your support helps provide food, medical care, and shelter for homeless pets. Every donation makes a difference!"
      ></Title>
      <img className="w-full h-56 xl:h-96 mb-5 md:h-72 object-cover rounded-3xl" src={pet1} alt="" />
      <Link to='/donation-campaigns'><Button className='md:text-sm text-xs h-max'>Donate Now <GoArrowRight /></Button></Link>
    </div>
  );
};

export default Support;
