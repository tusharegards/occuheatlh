// components/Carousel.tsx
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
    {
        title: "OccuHealth",
        subtitle: "Pre-Employment Health Screening",
        description:
          "Ensure that your new hires are in compliance with government and employer mandates with our discipline based pre-employment health screening packages.",
        image: slide1,
      },
      {
        title: "OccuHealth",
        subtitle: "Annual Health Screenings",
        description:
          "Maintain compliance with government and employer mandated health requirements tailored to your needs.",
        image: slide3,
      },
    {
    title: "OccuHealth",
    subtitle: "Individual Testing",
    description:
      "Order from our simple menu of physical exams, lab tests, drug tests and vaccines.",
    image: slide2,
  },
  {
    title: "OccuHealth",
    subtitle: "Data Warehouse",
    description:
      "Order from our vast inventory of health data, including physical exams, lab tests, drug tests, and vaccination history.",
    image: slide4,
  },
  {
    title: "OccuHealth",
    subtitle: "Continuous Compliance Monitoring",
    description:
      "Stay compliant with industry standards and government mandated health requirements.",
    image: slide4,
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="w-full h-full object-cover"
          />

          {/* Text overlay */}
          <div
            className="absolute md:top-1/2 md:left-30 top-1/4 left-10 max-w-lg text-white p-6 transform -translate-y-1/2"
            style={{ background: "#338a47dc" }}
          >
            <p className="text-sm">{slide.title}</p>
            <h2 className="text-3xl font-bold">{slide.subtitle}</h2>
            <p className="mt-2">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full border ${
              index === current
                ? "bg-yellow-400 border-yellow-400"
                : "bg-gray-300 border-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}