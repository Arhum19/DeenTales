import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full m-0 p-0">
      <div className="w-full px-12 py-4 flex justify-between items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/public/logo.png"
            alt="Deen Tales Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-gray-900">Deen Tales</span>
        </Link>

        <ul className="flex gap-10 list-none flex-1 justify-center">
          <li>
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 font-bold text-base font-medium hover:text-[#7ba67d] transition-colors cursor-pointer bg-transparent border-none"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("visuals")}
              className="text-gray-700 font-bold text-base font-medium hover:text-[#7ba67d] transition-colors cursor-pointer bg-transparent border-none"
            >
              Visuals
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 font-bold text-base font-medium hover:text-[#7ba67d] transition-colors cursor-pointer bg-transparent border-none"
            >
              Features
            </button>
          </li>
        </ul>

        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="text-gray-700 px-5 py-2 text-base font-medium hover:text-[#7ba67d] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/try-free"
            className="bg-[#7ba67d] text-white px-6 py-2.5 rounded-md text-base font-semibold hover:bg-[#6b9470] transition-all hover:-translate-y-0.5"
          >
            Try for free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
