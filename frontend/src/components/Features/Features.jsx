import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "CONVERSATIONAL",
      description:
        "Chat with an AI mentor that shares faith-based wisdom and positive guidance.",
      bgColor: "bg-[#f5f0e8]",
      icon: (
        <img
          src="/images/conversation_Icon.png"
          alt="Conversational Icon"
          className="w-20 sm:w-28 h-20 sm:h-28 opacity-70"
        />
      ),
    },
    {
      title: "VISUALS",
      description:
        "Generate inspiring, modest visuals that align with Islamic values.",
      bgColor: "bg-[#d4e4d5]",
      icon: (
        <img
          src="/images/Visuals.png"
          alt="Visuals Icon"
          className="w-28 sm:w-44 h-28 sm:h-44 opacity-80"
        />
      ),
    },
    {
      title: "Faceless Content",
      description:
        "Create meaningful, face-free art that stays true to Islamic ethics.",
      bgColor: "bg-[#d4e4d5]",
      icon: (
        <img
          src="/images/faceless_icon.png"
          alt="Faceless Icon"
          className="w-28 sm:w-44 h-28 sm:h-44 opacity-90"
        />
      ),
    },
    {
      title: "Erotic Restriction",
      description:
        "Stay safe with built-in filters that block all inappropriate content.",
      bgColor: "bg-[#f5f0e8]",
      icon: (
        <img
          src="/images/Erotic_restriction.png"
          alt="Restriction Icon"
          className="w-20 sm:w-28 h-20 sm:h-28 opacity-89"
        />
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div
            className={`${features[0].bgColor} rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[250px] sm:min-h-[280px] flex flex-col justify-between md:col-span-1`}
          >
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 uppercase tracking-wide">
                {features[0].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-xs">
                {features[0].description}
              </p>
              <Link
                to="/login"
                className="text-[#c4b896] text-sm font-medium hover:underline inline-block"
              >
                Try now
              </Link>
            </div>
            <div className="absolute bottom-4 right-4 opacity-50">
              {features[0].icon}
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className={`${features[1].bgColor} rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[250px] sm:min-h-[280px] flex flex-col justify-between md:col-span-2`}
          >
            <div className="relative z-10 flex flex-col items-start text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 uppercase tracking-wide">
                {features[1].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-sm">
                {features[1].description}
              </p>
              <Link
                to="/login"
                className="text-[#6b8e6f] text-sm sm:text-base font-medium hover:underline inline-block self-start"
              >
                Try now
              </Link>
            </div>
            <div className="absolute bottom-4 right-4 opacity-50">
              {features[1].icon}
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className={`${features[2].bgColor} rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[250px] sm:min-h-[280px] flex flex-col justify-between md:col-span-2`}
          >
            <div className="relative z-10 flex flex-col items-start text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                {features[2].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-sm">
                {features[2].description}
              </p>
              <Link
                to="/login"
                className="text-[#6b8e6f] text-sm sm:text-base font-medium hover:underline inline-block self-start"
              >
                Try now
              </Link>
            </div>
            <div className="absolute bottom-4 right-4 opacity-50">
              {features[2].icon}
            </div>
          </div>

          {/* Feature 4 */}
          <div
            className={`${features[3].bgColor} rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[250px] sm:min-h-[280px] flex flex-col justify-between md:col-span-1`}
          >
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                {features[3].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-xs">
                {features[3].description}
              </p>
              <Link
                to="/login"
                className="text-[#c4b896] text-sm font-medium hover:underline inline-block"
              >
                Try now
              </Link>
            </div>
            <div className="absolute bottom-4 right-4 opacity-50">
              {features[3].icon}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
