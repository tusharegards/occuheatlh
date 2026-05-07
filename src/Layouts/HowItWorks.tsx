// src/components/HowItWorks.tsx
import React from 'react';
import img1 from '../assets/Ph1.svg';
import img2 from '../assets/Ph2.svg';
import img3 from '../assets/Ph3.svg';
import img4 from '../assets/Ph4.svg';
import img5 from '../assets/Ph5.svg';
import img6 from '../assets/Ph6.svg';

type Step = { image: string; alt: string; label: string };
type HowItWorksProps = {
  variant?: 'default' | 'inServiceTraining';
};

const defaultSteps: Step[] = [
  { image: img1, alt: 'Become a Client icon', label: 'Become a Client' },
  { image: img2, alt: 'Create Employee Profile icon', label: 'Create Employee Profile' },
  { image: img3, alt: 'Submit Order icon', label: 'Submit Order' },
  { image: img4, alt: 'Employee Schedules Appointment icon', label: 'Employee Schedules Appointment' },
  { image: img5, alt: 'Employee Receives Health Screening icon', label: 'Employee Receives Health Screening' },
  { image: img6, alt: 'Results Delivered in Employer Portal icon', label: 'Results Delivered in Employer Portal' },
];

const inServiceTrainingSteps: Step[] = [
  { image: img1, alt: 'Become a Client icon', label: 'Become a Client' },
  { image: img2, alt: 'Create Employee Profile icon', label: 'Create Employee Profile' },
  { image: img4, alt: 'Employee Schedules Appointment icon', label: 'Employee Schedules Appointment' },
  { image: img5, alt: 'Employee Receives In-Service Training icon', label: 'Employee Receives In-Service Training' },
  { image: img6, alt: 'Results Delivered in Employer Portal icon', label: 'Results Delivered in Employer Portal' },
];

const HowItWorks: React.FC<HowItWorksProps> = ({ variant = 'default' }) => {
  const steps = variant === 'inServiceTraining' ? inServiceTrainingSteps : defaultSteps;
  const gridColsClass =
    steps.length === 5
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 lg:gap-x-8 items-start'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 lg:gap-x-8 items-start';

  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold font-serif text-gray-800 mb-12" style={{ fontFamily: 'Georgia, serif' }}>
        How does it work?
      </h2>
      <div className={gridColsClass}>
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`flex flex-col items-center text-center ${index < steps.length - 1 ? 'lg:border-r lg:border-gray-300' : ''}`}
          >
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <img src={step.image} alt={step.alt} className="w-full h-full object-contain" />
            </div>
            <h3 className="font-semibold text-lg">{step.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;