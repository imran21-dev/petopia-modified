import Title from "./Title";
import aboutUs from '../../assets/aboutus.jpg'
import { Button } from "./button";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div>
            <Title title='About Us' desc='Connecting Hearts, One Paw at a Time'></Title>
            <img src={aboutUs} alt="" className="md:h-[600px] mb-5 md:mb-10 rounded-3xl w-full object-cover"/>
          <div className="">
          <h1 className="md:text-3xl text-xl text-accent-foreground/70 md:leading-[40px] font-bold">Welcome to <span className="text-primary">Petopia</span>, a platform dedicated to connecting loving families with pets in need of a home.</h1>
            <h1 className="pt-2 text-sm md:text-base font-bold opacity-70">This website was created to make pet adoption easier, faster, and more transparent, ensuring that every pet finds a safe and loving home.</h1>
          <p className="flex-1 pb-3 md:pb-10 md:text-base text-sm pt-4">At <span className="text-primary font-medium">Petopia</span> we believe every pet deserves a loving home. Our platform was designed to simplify the adoption process, connecting you with pets that match your lifestyle and preferences. Whether you're looking for a playful kitten, a loyal dog, or even a unique exotic pet, we've got you covered. Our mission is to ensure every pet has a chance at happiness while providing adopters with all the resources they need to welcome their new family member. Together, we can make a difference, one adoption at a time.</p>
          </div>

            <h2 className="md:text-xl font-semibold py-2 md:py-3">How It Works</h2>
            <ul className="list-inside list-disc text-xs md:text-base pb-10">
                <li>Browse through various pet categories to find the right companion</li>
                <li>View detailed profiles for each pet, including their age, personality, and needs.</li>
                <li>Contact us or visit the adoption center to meet your future pet.</li>
            </ul>
            <p className="pb-3 md:text-base text-sm">Join us in creating a world where every pet has a loving home. Start your journey today!</p>
            <Link to='/pet-listing'><Button className='md:text-sm text-xs h-max'>Start Exploring Pets <GoArrowRight /></Button></Link>

           
        </div>
    );
};

export default AboutUs;