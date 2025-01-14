import { Button } from "./button";
import SwipperStory from "./SwipperStory";
import Title from "./Title";


const SuccessStory = () => {
    return (
        <div>
            <Title title='Success Stories' desc='Heartwarming tales of pets finding their forever homes. Be inspired to make a difference today.'></Title>
            <SwipperStory></SwipperStory>
            <div className="flex justify-center pt-10">

            <Button>Adopt a Pet</Button>
            </div>
        </div>
    );
};

export default SuccessStory;