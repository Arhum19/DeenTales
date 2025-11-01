import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "CONVERSATIONAL",
      description:
        "Chat with an AI mentor that shares faith-based wisdom and positive guidance.",
      bgColor: "bg-[#f5f0e8]",
      iconColor: "text-[#d4c5a8]",
      icon: (
        <svg
          className="w-32 h-32"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <rect x="25" y="35" width="50" height="40" rx="5" strokeWidth="2.5" />
          <rect x="35" y="45" width="10" height="15" strokeWidth="2" />
          <rect x="55" y="45" width="10" height="15" strokeWidth="2" />
          <circle cx="50" cy="25" r="8" strokeWidth="2.5" />
          <line x1="50" y1="17" x2="50" y2="35" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      title: "VISUALS",
      description:
        "Generate inspiring, modest visuals that align with Islamic values.",
      bgColor: "bg-[#d4e4d5]",
      iconColor: "text-[#6b8e6f]",
      icon: (
        <svg
          className="w-40 h-40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="30" strokeWidth="2.5" />
          <ellipse
            cx="50"
            cy="50"
            rx="30"
            ry="15"
            strokeWidth="2"
            transform="rotate(45 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="30"
            ry="15"
            strokeWidth="2"
            transform="rotate(-45 50 50)"
          />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <circle cx="35" cy="35" r="4" fill="currentColor" />
          <circle cx="65" cy="35" r="4" fill="currentColor" />
          <circle cx="35" cy="65" r="4" fill="currentColor" />
          <circle cx="65" cy="65" r="4" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Faceless Content",
      description:
        "Create meaningful, face-free art that stays true to Islamic ethics.",
      bgColor: "bg-[#d4e4d5]",
      iconColor: "text-[#6b8e6f]",
      icon: (
        <svg
          className="w-40 h-40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle
            cx="50"
            cy="40"
            r="15"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 35 55 Q 35 70 50 70 Q 65 70 65 55"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path d="M 30 30 Q 50 20 70 30" strokeWidth="2" />
          <path d="M 30 70 Q 50 80 70 70" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Erotic Restriction",
      description:
        "Stay safe with built-in filters that block all inappropriate content.",
      bgColor: "bg-[#f5f0e8]",
      iconColor: "text-[#d4c5a8]",
      icon: (
        <svg
          className="w-32 h-32"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="40" cy="45" r="15" strokeWidth="2" />
          <circle cx="60" cy="45" r="15" strokeWidth="2" />
          <circle cx="75" cy="60" r="12" strokeWidth="2" />
          <line x1="40" y1="30" x2="60" y2="30" strokeWidth="2" />
          <line x1="60" y1="30" x2="75" y2="48" strokeWidth="2" />
          <line x1="40" y1="60" x2="48" y2="45" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
          Features
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* First Row - Two Equal Boxes */}
          <div
            className={`${features[0].bgColor} rounded-3xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between md:col-span-1`}
          >
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
                {features[0].title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-8 max-w-xs">
                {features[0].description}
              </p>
              <Link
                to="/login"
                className="text-[#c4b896] text-sm font-medium hover:underline inline-block"
              >
                Try now
              </Link>
            </div>
            {/* Icon */}
            <div
              className={`absolute bottom-4 right-4 ${features[0].iconColor} opacity-50`}
            >
              {features[0].icon}
            </div>
          </div>

          <div
            className={`${features[1].bgColor} rounded-3xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between md:col-span-2`}
          >
            {/* Content */}
            <div className="relative z-10 flex flex-col items-start text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
                {features[1].title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-sm">
                {features[1].description}
              </p>
              <Link
                to="/login"
                className="text-[#6b8e6f] text-base font-medium hover:underline inline-block self-start"
              >
                Try now
              </Link>
            </div>
            {/* Icon */}
            <div
              className={`absolute bottom-4 right-4 ${features[1].iconColor} opacity-50`}
            >
              {features[1].icon}
            </div>
          </div>

          {/* Second Row - Reversed */}
          <div
            className={`${features[2].bgColor} rounded-3xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between md:col-span-2`}
          >
            {/* Content */}
            <div className="relative z-10 flex flex-col items-start text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {features[2].title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-sm">
                {features[2].description}
              </p>
              <Link
                to="/login"
                className="text-[#6b8e6f] text-base font-medium hover:underline inline-block self-start"
              >
                Try now
              </Link>
            </div>
            {/* Icon */}
            <div
              className={`absolute bottom-4 right-4 ${features[2].iconColor} opacity-50`}
            >
              {features[2].icon}
            </div>
          </div>

          <div
            className={`${features[3].bgColor} rounded-3xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-between md:col-span-1`}
          >
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {features[3].title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-8 max-w-xs">
                {features[3].description}
              </p>
              <Link
                to="/login"
                className="text-[#c4b896] text-sm font-medium hover:underline inline-block"
              >
                Try now
              </Link>
            </div>
            {/* Icon */}
            <div
              className={`absolute bottom-4 right-4 ${features[3].iconColor} opacity-50`}
            >
              {features[3].icon}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
