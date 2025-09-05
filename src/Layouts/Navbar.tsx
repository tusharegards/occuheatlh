// src/Layouts/Navbar.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import logo from "../assets/logo.jpeg";

type NavItem = { label: string; to: string };
type DropdownItem = { label: string; to: string };

const mainLinks: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Contact us", to: "/contact" },
  { label: "Become a Client", to: "https://occuhealth.service-now.com/ohp?id=become_client" },
  { label: "Employer Portal", to: "https://occuhealth.service-now.com/csm?id=csm_login" },
];

const services: DropdownItem[] = [
  { label: "Pre-Employment Health Screening", to: "/services/pre-employment" },
  { label: "Annual Health Screening", to: "/services/annual-health-screening" },
  { label: "Individual Testing & Vaccination", to: "/services/individual-testing-vaccination" },
  { label: "Data Warehouse Solutions", to: "/services/data-warehouse" },
  { label: "Continuous Compliance Monitoring", to: "/services/compliance-monitoring" },
];

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // desktop
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false); // mobile
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Collapse mobile accordion when menu closes
  useEffect(() => {
    if (!menuOpen) setServicesOpenMobile(false);
  }, [menuOpen]);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50 py-1">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center" onClick={() => setMenuOpen(false)}>
            <img src={logo} className="w-[140px] md:w-[160px]" alt="OccuHealth" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-text-dark">
            <li>
              <Link className="hover:text-brand" to="/">Home</Link>
            </li>

            {/* Services dropdown (desktop) */}
            <li
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen((s) => !s)}
                className="inline-flex items-center gap-1 hover:text-brand"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
              >
                Services <FiChevronDown className="mt-[2px]" />
              </button>

              <div
                className={`absolute left-0 top-full pt-3 w-72 transition-all z-30
                  ${servicesOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
              >
                <ul className="overflow-hidden rounded-md bg-brand text-white shadow-lg">
                  {services.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="block px-4 py-2.5 hover:bg-brand-dark">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {mainLinks.slice(1).map((link) => (
              <li key={link.label}>
                <Link className="hover:text-brand" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Call button (desktop) */}
          <a
            href="tel:8889289038"
            className="hidden md:inline-flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark"
          >
            <FiPhoneCall /> Call us: 888-928-9038
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile overlay (below navbar, below drawer z-index) */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 md:hidden transition-opacity duration-300 z-30
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile drawer (fixed, clickable above overlay) */}
      <div
        className={`
          fixed left-0 right-0 top-16 md:hidden z-40
          bg-white border-t border-gray-200 overflow-hidden
          transition-[max-height,opacity] duration-300 ease-out
          ${menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!menuOpen}
      >
        <div className="px-4 py-3 space-y-2">
          <Link className="block py-2" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {/* Services (mobile accordion with smooth expand/collapse) */}
          <div>
            <button
              className="w-full flex items-center justify-between py-3"
              onClick={() => setServicesOpenMobile((s) => !s)}
              aria-expanded={servicesOpenMobile}
            >
              <span>Services</span>
              <FiChevronDown
                className={`transition-transform ${servicesOpenMobile ? "rotate-180" : ""}`}
              />
            </button>

            {/* Animated height using grid trick */}
            <div
              className={`
                grid transition-[grid-template-rows,opacity] duration-300 ease-out
                ${servicesOpenMobile ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
              `}
            >
              <ul className="overflow-hidden rounded-md bg-brand text-white">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="block px-4 py-2 hover:bg-brand-dark"
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {mainLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              className="block py-2"
              to={link.to}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile call button */}
          <a
            href="tel:8889289038"
            className="mt-2 flex items-center justify-center gap-2 bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark"
          >
            <FiPhoneCall /> Call us: 888-928-9038
          </a>
        </div>
      </div>
    </nav>
  );
}
