

// src/pages/PreHealth.tsx
import React from 'react';
import HowItWorks from '../../Layouts/HowItWorks';
import BecomeAClient from '../../Layouts/BecomeAClient';



const PreEmployment: React.FC = () => {
  return (
    <>
    
      {/* Navbar component would go here */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <a href="#" className="hover:underline">Home</a> &gt; <span className="font-semibold">Services</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12 mb-16">
          {/* Left Column (Text) */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold font-serif text-gray-800 mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Pre-Employment Health Screening
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ensure that your new hires are in compliance with government and employer mandates with our standard health screening packages. Our discipline based pre-employment health screening packages provide an all-in-one solution for employee physical exams, lab testing, drug testing and vaccines.
            </p>
          </div>

          {/* Right Column (Main Image) */}
          <div className="lg:w-1/2">
            <img
              src="/src/assets/slide1.jpg"
              alt="People waiting for health screening"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        <HowItWorks />

        {/* "How does it work?" Section */}
        
      </div>
      <BecomeAClient />
    </>
  );
};

export default PreEmployment;





