import { Link } from "react-router-dom";
import service1 from "../assets/slide1.jpg"; // replace with your actual images
import service2 from "../assets/slide2.jpg";
import service3 from "../assets/slide3.jpg";
import service4 from "../assets/slide4.jpg";

type Service = {
  title: string;
  desc: string;
  image: string;
  to?: string;
};

const services: Service[] = [
  {
    title: "Pre-Employment Health Screening",
    desc: "Ensure that your new hires are in compliance with government...",
    image: service1,
    to:'services/pre-employment'
  },
  {
    title: "Annual Health Screening",
    desc: "Maintain compliance with government and employer mandated health...",
    image: service2,
    to:'services/annual-health-screening'
  },
  {
    title: "Individual Testing & Vaccination",
    desc: "Order from our simple menu of physical exams, lab tests, drug tests...",
    image: service3,
    to:'services/individual-testing-vaccination'
  },
  {
    title: "Data Warehouse Solutions",
    desc: "Order from our vast inventory of health data, including physical exams...",
    image: service4,
    to:'/services/data-warehouse'
  },
];

export default function Services() {
  return (
    <section className="py-16">
      <h2 className="text-[35px] md:text-[45px] font-semibold text-center mb-10 text-text-dark">
        Our Services
      </h2>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, image, to }: Service) {
  return (
    <Link
      to={to || "#"}
      className="group relative block overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
    >
      {/* Fixed heights per breakpoint to match the reference layout */}
      <div className="relative h-[520px] lg:h-[440px] md:h-[420px] sm:h-[420px]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {/* Bottom gradient that deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/55" />

        {/* Text block pinned to bottom, slides up slightly on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-6 translate-y-0 group-hover:translate-y-[-6px] transition-transform duration-500">
          <h3 className="text-white leading-tight font-semibold text-[26px] md:text-[22px]">
            {title}
          </h3>

          <p className="mt-3 text-[#28C76F] text-[15px] md:text-[15px] leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
