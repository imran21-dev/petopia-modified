import Title from "./Title";
import aboutUs from '../../assets/aboutus.jpg'
import { Button } from "./button";
import { GoArrowRight } from "react-icons/go";

const AboutUs = () => {
    return (
        <div>
            <Title title='About Us' desc='Connecting Hearts, One Paw at a Time'></Title>

          <div className="">
          <h1 className="text-3xl text-accent-foreground/70 leading-[40px] font-bold">Welcome to <span className="text-primary">Petopia</span>, a platform dedicated to connecting loving families with pets in need of a home.</h1>
            <h1 className="pt-2 font-bold opacity-70">This website was created to make pet adoption easier, faster, and more transparent, ensuring that every pet finds a safe and loving home.</h1>
          <p className="flex-1 pb-10 pt-4">At <span className="text-primary font-medium">Petopia</span> we believe every pet deserves a loving home. Our platform was designed to simplify the adoption process, connecting you with pets that match your lifestyle and preferences. Whether you're looking for a playful kitten, a loyal dog, or even a unique exotic pet, we've got you covered. Our mission is to ensure every pet has a chance at happiness while providing adopters with all the resources they need to welcome their new family member. Together, we can make a difference, one adoption at a time.</p>
          </div>

            <h2 className="text-xl font-semibold py-3">How It Works</h2>
            <ul className="list-inside list-disc pb-10">
                <li>Browse through various pet categories to find the right companion</li>
                <li>View detailed profiles for each pet, including their age, personality, and needs.</li>
                <li>Contact us or visit the adoption center to meet your future pet.</li>
            </ul>
            <p className="pb-3 ">Join us in creating a world where every pet has a loving home. Start your journey today!</p>
            <Button>Start Exploring Pets <GoArrowRight /></Button>

            <img src={aboutUs} alt="" className="h-[600px] mt-10 rounded-3xl w-full object-cover"/>
        </div>
    );
};

export default AboutUs;