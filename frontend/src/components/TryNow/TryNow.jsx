import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TryNow = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      navigate("/try-free");
    }
  };

  return (
    <section className="w-full bg-white py-32 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Get Started Card */}
        <div className="bg-[#a8c9a9] rounded-[2rem] px-16 py-12 shadow-lg">
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            Get started
          </h2>

          {/* Input Container */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center bg-white rounded-xl overflow-hidden shadow-sm">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter the story prompt..."
                className="flex-1 px-6 py-4 text-gray-400 text-base outline-none"
              />

              {/* Icons Container */}
              <div className="flex items-center gap-2 pr-4">
                {/* Microphone Icon */}
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Voice input"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </button>

                {/* Send/Paper Plane Icon */}
                <button
                  type="submit"
                  className="p-2 text-[#a8c9a9] hover:text-[#8fb89a] "
                  aria-label="Send"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TryNow;
