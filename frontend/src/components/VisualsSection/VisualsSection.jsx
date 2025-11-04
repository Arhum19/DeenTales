import React, { useState } from "react";

const VisualsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  // Sample images array - you can replace these URLs with your actual images
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=400&h=500&fit=crop",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full bg-gray-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Visuals By Deen Tales
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center max-w-5xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-20 z-40 w-14 h-14 bg-[#6b8e6f] hover:bg-[#5d7a61] text-white rounded-full flex items-center justify-center transition-all shadow-lg top-1/2 -translate-y-1/2"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Images Container */}
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            {images.map((img, index) => {
              // Calculate position relative to current index
              const position = index - currentIndex;
              const isCurrent = position === 0;
              const isAdjacent = Math.abs(position) === 1;
              const isVisible = Math.abs(position) <= 2;

              if (!isVisible) return null;

              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-in-out flex-shrink-0 ${
                    isCurrent
                      ? "w-80 h-96 z-30"
                      : isAdjacent
                      ? "w-64 h-80 z-20"
                      : "w-52 h-64 z-10"
                  }`}
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
            className="absolute -right-20 z-40 w-14 h-14 bg-[#6b8e6f] hover:bg-[#5d7a61] text-white rounded-full flex items-center justify-center transition-all shadow-lg top-1/2 -translate-y-1/2"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-gray-800"
                  : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualsSection;
