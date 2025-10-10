// src/pages/ContactUs.tsx
import React, { useEffect } from 'react';

import BecomeAClient from '../Layouts/BecomeAClient';
import Location from '../Service/client-api';


const ContactUs: React.FC = () => {
  useEffect(() => {
    const navType = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type;
    if (navType === 'reload') {
      window.location.href = 'https://occuhealth.net/contact';
    }
  }, []);
  return (
    <div className="bg-gray-50 py-12">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline text-green-700">Home</a> &gt; <span className="font-semibold text-gray-700">Contact us</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4">
        <h1
          className="mb-4 text-green-700 text-5xl font-bold font-serif"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Contact us
        </h1>
        <div className="flex flex-col sm:flex-row mb-12 space-y-4 sm:space-y-0 sm:space-x-12">
          <div className="text-lg">
            <p className="font-bold">Phone:</p>
            <p className="text-gray-600">(888) 928-9038</p>
          </div>
          <div className="text-lg">
            <p className="font-bold">Fax:</p>
            <p className="text-gray-600">(888) 928-6087</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:space-x-16">
            
            {/* Left Column: Our Locations */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2
                className="mb-6 text-3xl font-bold text-gray-800 font-serif"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Our Locations
              </h2>

              {/* Stack locations vertically */}
              <div className="space-y-6">
                <Location />
              </div>

              
            </div>

            {/* Right Column: Leave your queries Form */}
            <div className="lg:w-1/2">
              <h2
                className="mb-3 text-3xl font-bold text-gray-800 font-serif"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Leave your queries
              </h2>
              <p className="mb-4 text-gray-600">
                If you have any question, or would you like more information. Please leave your name and contact information here
              </p>

              <form>
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Mobile */}
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Comments */}
                <div className="mb-4">
                  <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  ></textarea>
                </div>

                {/* Checkbox */}
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="privacyCheck"
                    className="mt-1 mr-2 accent-green-600"
                  />
                  <label htmlFor="privacyCheck" className="text-gray-600 text-sm">
                    By checking this box you agree to receive text messages from OccuHealth, you can reply stop to opt-out at any time, see <a href="#" className="text-green-700 hover:underline">privacy policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-md text-lg transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Send now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BecomeAClient />
    </div>
  );
};

export default ContactUs;