
// src/pages/AnnualHealthScreeningPage.tsx
import React from 'react';
import HowItWorks from '../../Layouts/HowItWorks';
import BecomeAClient from '../../Layouts/BecomeAClient';
import slideImg from '../../assets/slide5.jpg'


const ComplianceMonitoring: React.FC = () => {
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
                Continuous Compliance Monitoring
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                Stay compliant with industry standards and government mandated health requirements. OccuHealth's integration partnership with HHAeXchange will automatically sync all employee information with its powerful system that is designed to:                </p>
              <br />
              <ul className="list-disc pl-6">
                <li>Track health care compliance requirements for your workforce</li>
                <li>Order and schedule these requirements on your behalf</li>
                <li>Follow up to make sure all requirements are completed</li>
                <li>Deliver all results in a timely manner both through our employer portal and directly to HHAeXchange</li>
                <li>Notify both the employer and the employee of any non-compliance</li>

            </ul>
              </div>
    
              {/* Right Column (Main Image) */}
              <div className="lg:w-1/2">
                <img
                  src={slideImg} // Placeholder for your image
                  alt="Database Image"
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

export default ComplianceMonitoring;