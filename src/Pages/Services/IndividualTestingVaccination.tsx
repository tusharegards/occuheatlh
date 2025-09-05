// src/pages/IndividualTestingPage.tsx
import React from 'react';
import BecomeAClient from '../../Layouts/BecomeAClient';
import HowItWorks from '../../Layouts/HowItWorks';

const  IndividualTestingVaccination: React.FC = () => {
  return (
    <>
      
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
              Individual Testing <br/>& Vaccination
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Order from our simple menu of physical exams, lab tests, drug tests and vaccines.
            </p>

            {/* Lists */}
            <div className="flex flex-col sm:flex-row sm:space-x-12 space-y-8 sm:space-y-0 text-gray-600">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Individual Testing</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Drug Screen</li>
                  <li>Hepatitis B</li>
                  <li>Physical</li>
                  <li>PPD (1-Step)</li>
                  <li>PPD (2-Step)</li>
                  <li>Quantiferon</li>
                  <li>Rubella</li>
                  <li>Rubella/Measles</li>
                  <li>TB Questionnaire</li>
                  <li>Mumps</li>
                  <li>Varicella</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Individual Vaccination</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>COVID Vaccine</li>
                  <li>Flu Vaccine</li>
                  <li>Hepatitis B Vaccine</li>
                  <li>Rubella - MMR Vaccine</li>
                  <li>Rubeola - MMR 1 Vaccine</li>
                  <li>Rubeola - MMR 2 Vaccine</li>
                  <li>Tdap Vaccine</li>
                  <li>Varicella 1 Vaccine</li>
                  <li>Varicella 2 Vaccine</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (Main Image) */}
          <div className="lg:w-1/2">
            <img
              src="/src/assets/slide3.jpg" 
              alt="Doctor performing a health check"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* The "How it works" component is now imported and used here */}
        <HowItWorks />
      </div>
      <BecomeAClient />
    </>
  );
};

export default IndividualTestingVaccination;

