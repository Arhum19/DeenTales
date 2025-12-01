import React, { useState } from "react";

const VisualsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const images = [
    "/images/Masjid.jpg",
    "/images/light.jpg",
    "/images/pray.jpg",
    "/images/street.png",
    "/images/scenery.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Visuals By Deen Tales
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center max-w-5xl mx-auto">

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="
              absolute 
              left-2 sm:-left-10 
              top-1/2 -translate-y-1/2 
              w-10 h-10 sm:w-12 sm:h-12 
              bg-[#6b8e6f] hover:bg-[#5d7a61] 
              text-white rounded-full 
              flex items-center justify-center 
              transition-all shadow-lg
              z-40
            "
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Images */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
            {images.map((img, index) => {
              const position = index - currentIndex;
              const isCurrent = position === 0;
              const isAdjacent = Math.abs(position) === 1;
              const isVisible = Math.abs(position) <= 2;

              if (!isVisible) return null;

              return (
                <div
                  key={index}
                  className={`
                    transition-all duration-500 ease-in-out flex-shrink-0
                    ${
                      isCurrent
                        ? "w-48 h-64 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] z-30"
                        : isAdjacent
                        ? "w-36 h-52 sm:w-56 sm:h-80 md:w-64 md:h-80 z-20"
                        : "w-28 h-40 sm:w-40 sm:h-56 md:w-52 md:h-64 z-10"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={`Visual ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl shadow-lg cursor-pointer"
                    onClick={() => goToSlide(index)}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="
              absolute 
              right-2 sm:-right-10 
              top-1/2 -translate-y-1/2 
              w-10 h-10 sm:w-12 sm:h-12 
              bg-[#6b8e6f] hover:bg-[#5d7a61] 
              text-white rounded-full 
              flex items-center justify-center 
              transition-all shadow-lg
              z-40
            "
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 h-2 bg-gray-800"
                  : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualsSection;
