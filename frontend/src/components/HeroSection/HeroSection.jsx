import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-white flex items-center relative overflow-hidden w-full m-0 p-0">
      <div className="w-full px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4 text-center">
              Worlds First Islamic
              <br />
              Storyteller agent
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md text-center mx-auto">
              this agent has the ability to pick the authentic references from
              Quran and hadith and generate relevant stories
            </p>
            <div className="flex gap-6 items-center justify-center">
              <Link
                to="/login"
                className="bg-[#6b8e6f] text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-[#5d7a61] transition-all inline-block"
              >
                Try Now
              </Link>
              <Link
                to="/about"
                className="text-gray-600 text-base font-medium hover:text-gray-900 transition-colors inline-block"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right Visual - Decorative Circles */}
          <div className="relative h-[550px] hidden lg:block">
            {/* Giant Circle (far right, mostly cut off) */}
            <div className="absolute w-[700px] h-[700px] bg-[#9fbd8b] rounded-full opacity-75 -right-48 -top-16"></div>

            {/* Medium Circle 1 (top left-ish) */}
            <div className="absolute w-[190px] h-[190px] bg-[#9fbd8b] rounded-full opacity-85 left-[-2%] top-[-10%]"></div>

            {/* Medium Circle 2 (bottom left-ish) */}
            <div className="absolute w-[190px] h-[190px] bg-[#9fbd8b] rounded-full opacity-85 left-[-11%] bottom-[13%]"></div>

            {/* Small Circle 1 (top right) */}
            <div className="absolute w-[75px] h-[75px] bg-[#d2d0a0] rounded-full opacity-90 right-[58%] top-[-14%]"></div>

            {/* Small Circle 2 (center-left) */}
            <div className="absolute w-[75px] h-[75px] bg-[#d2d0a0] rounded-full opacity-90 left-[7%] top-[32%]"></div>

            {/* Small Circle 3 (bottom right) */}
            <div className="absolute w-[75px] h-[75px] bg-[#d2d0a0] rounded-full opacity-90 right-[71%] bottom-[-1%]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
