import Title from "./Title";
import happyPet from '../../assets/happy pet.jpg'
import { Link } from "react-router-dom";
import { Button } from "./button";
import SwiperImage from "./SwiperImage";

const CallToAction = () => {
    return (
        <div>
            <Title title='Give Them a Second Chance' desc='Open your heart and home to a pet in need. Adoption not only transforms their lives but fills yours with unconditional love and companionship. Be the reason for their happily ever after!'></Title>

            <div className="flex gap-10">
                <figure className="w-2/4">
                    <img src={happyPet} alt="" className="w-full rounded-3xl" />
                </figure>
                <div className="w-2/4">
                    <h1 className="text-3xl opacity-70 font-bold">Every Pet Deserves a Loving Home</h1>
                    <p className="py-3 opacity-70">By adopting a pet, you’re giving them a chance to experience love, care, and a better life. Join us in creating happy stories, one adoption at a time.</p>
                    <ul className="list-inside list-disc opacity-70">
                        <li>Save a life and provide a second chance.</li>
                        <li>Gain a loyal and loving companion.</li>
                        <li>Support ethical and humane practices.</li>
                    </ul>

                    <SwiperImage></SwiperImage>


                    <Link><Button>View Available Pets</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;