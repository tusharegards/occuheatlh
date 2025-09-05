import React from "react";
import doctorImage from "../assets/why-accuhealth.jpg"; 

const WhyChooseOccuHealth: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-left bg-no-repeat h-[80vh]"
      style={{ backgroundImage: `url(${doctorImage})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0"></div>

      <div className="relative container mx-auto md:px-[120px] px-10 py-16 lg:py-24 ">
        <div className="max-w-xl mt-[50px]">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            Why Choose OccuHealth?
          </h2>
          <p className=" text-text-dark text-base md:text-lg leading-relaxed">
            At OccuHealth, we focus on delivering flexible, reliable, and
            comprehensive health screening solutions for businesses of all
            sizes. Whether it’s pre-employment checks or regulatory compliance,
            we ensure your workforce remains healthy, safe, and productive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseOccuHealth;
