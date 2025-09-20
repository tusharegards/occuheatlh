// src/components/HowItWorks.tsx
import React from 'react';
import img1 from '../assets/Ph1.svg';
import img2 from '../assets/Ph2.svg';
import img3 from '../assets/Ph3.svg';
import img4 from '../assets/Ph4.svg';
import img5 from '../assets/Ph5.svg';
import img6 from '../assets/Ph6.svg';

const HowItWorks: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold font-serif text-gray-800 mb-12" style={{ fontFamily: 'Georgia, serif' }}>
        How does it work?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 lg:gap-x-8 items-start">
        {/* Step 1 with divider */}
        <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-300">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img1} alt="Become a Client icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Become a Client</h3>
        </div>
        {/* Step 2 with divider */}
        <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-300">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img2} alt="Create Employee Profile icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Create Employee Profile</h3>
        </div>
        {/* Step 3 with divider */}
        <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-300">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img3} alt="Submit Order icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Submit Order</h3>
        </div>
        {/* Step 4 with divider */}
        <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-300">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img4} alt="Employee Schedules Appointment icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Employee Schedules Appointment</h3>
        </div>
        {/* Step 5 with divider */}
        <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-300">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img5} alt="Employee Receives Health Screening icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Employee Receives Health Screening</h3>
        </div>
        {/* Step 6 (no divider) */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={img6} alt="Results Delivered in Employer Portal icon" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-lg">Results Delivered in Employer Portal</h3>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;