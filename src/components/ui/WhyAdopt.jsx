import Title from "./Title";

const WhyAdopt = () => {
  return (
    <div>
      <Title
        title="Why Adopt?"
        desc="Adopting a pet is more than just bringing home a furry friend—it's giving them a second chance at life."
      ></Title>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mx-auto">
        <div className="bg-secondary p-6 rounded-xl shadow-md">
          <h3 className="text-base md:text-xl font-semibold ">
            🐾 Save a Life
          </h3>
          <p className="text-xs md:text-base opacity-70 mt-2">
            Every adoption helps reduce pet homelessness and gives an animal a
            loving home.
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-xl shadow-md">
          <h3 className="text-base md:text-xl font-semibold ">
            💖 Unconditional Love
          </h3>
          <p className="text-xs md:text-base opacity-70 mt-2">
            Adopted pets form strong bonds and bring endless joy to your life.
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-xl shadow-md">
          <h3 className="text-base md:text-xl font-semibold ">
            🏡 Support Ethical Choices
          </h3>
          <p className="text-xs md:text-base opacity-70 mt-2">
            Adoption discourages unethical breeding and promotes responsible pet
            care.
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-xl shadow-md">
          <h3 className="text-base md:text-xl font-semibold ">
            💰 Cost-Effective
          </h3>
          <p className="text-xs md:text-base opacity-70 mt-2">
            Adoption fees are often lower, and many pets come vaccinated and
            spayed/neutered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyAdopt;
