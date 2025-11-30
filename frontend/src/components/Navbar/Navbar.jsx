import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/public/logo.png" alt="Deen Tales Logo" className="h-10 w-10 object-contain" />
          <span className="text-2xl font-bold text-gray-900">Deen Tales</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 flex-1 justify-center">
          <li><button onClick={() => scrollToSection("home")} className="text-gray-700 font-bold hover:text-[#7ba67d]">Home</button></li>
          <li><button onClick={() => scrollToSection("visuals")} className="text-gray-700 font-bold hover:text-[#7ba67d]">Visuals</button></li>
          <li><button onClick={() => scrollToSection("features")} className="text-gray-700 font-bold hover:text-[#7ba67d]">Features</button></li>
        </ul>

        {/* Login + Signup ALWAYS visible (desktop + mobile) */}
        <div className="flex gap-3 items-center">
          <Link to="/login" className="text-gray-700 px-3 py-2 text-sm sm:text-base hover:text-[#7ba67d]">
            Login
          </Link>
          <Link
            to="/try-free"
            className="bg-[#7ba67d] text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-[#6b9470]"
          >
            Try for free
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden ml-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Menu (ONLY NAV ITEMS, not login/signup) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4">
            <li><button onClick={() => scrollToSection("home")} className="text-gray-700 font-bold">Home</button></li>
            <li><button onClick={() => scrollToSection("visuals")} className="text-gray-700 font-bold">Visuals</button></li>
            <li><button onClick={() => scrollToSection("features")} className="text-gray-700 font-bold">Features</button></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
