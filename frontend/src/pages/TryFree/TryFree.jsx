import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../services/chatService";

const TryFree = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Deen Tales is an Islamic AI companion designed to inspire, guide, and create. I can chat with you about faith, help you learn through meaningful conversations, and even make visuals that reflect Islamic values while keeping content pure and respectful.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(1);
  const navigate = useNavigate();

  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || attemptCount >= 3) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
    };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: response.message || "I'm here to help you!",
      };
      setMessages((prev) => [...prev, botMessage]);
      setAttemptCount((prev) => prev + 1);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const showLimitMessage = attemptCount >= 3;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ---------- HEADER ---------- */}
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
        <div className="w-full flex items-center justify-between px-2 sm:px-6">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button> */}

            <div className="flex items-center gap-1 sm:gap-2">
              <img
                src="/images/public/logo.png"
                alt="Deen Tales Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                Deen Tales
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-1 sm:gap-2">

            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6b8e6f] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- CHAT MESSAGES ---------- */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 ${message.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {message.type === "bot" && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">DT</span>
                </div>
              )}

              <div
                className={`max-w-[80%] sm:max-w-xl px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${message.type === "user"
                    ? "bg-gray-200"
                    : "bg-white border border-gray-200"
                  }`}
              >
                {message.type === "bot" ? (
                  <div className="flex flex-col">
                    {/* Message Text */}
                    <p className="text-left text-xs sm:text-sm leading-relaxed">{message.text}</p>

                    {/* Copy Icon on the left-bottom */}
                    <div className="mt-1 flex justify-start">
                      <button
                        onClick={() => handleCopyMessage(message.text)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-left text-xs sm:text-sm leading-relaxed">{message.text}</p>
                )}
              </div>



              {message.type === "user" && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-xs sm:text-sm">U</span>
                </div>
              )}
            </div>
          ))}

          {/* LOADING DOTS */}
          {isLoading && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">DT</span>
              </div>

              <div className="bg-white border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- INPUT AREA ---------- */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
        <div className="max-w-3xl mx-auto">

          {showLimitMessage && (
            <div className="mb-3 sm:mb-4 bg-gray-100 border border-gray-300 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                Limit exceed. Sign in to create an image and more.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="px-4 sm:px-6 py-2 bg-[#6b8e6f] hover:bg-[#5d7a61] text-white rounded-lg font-medium text-xs sm:text-sm"
              >
                Sign in
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send your message"
              disabled={showLimitMessage}
              className="w-full px-3 py-3 sm:px-4 sm:py-3 pr-20 sm:pr-24 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6b8e6f]"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">

              <button type="button" className="p-1 sm:p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              <button
                type="submit"
                disabled={!inputMessage.trim() || showLimitMessage || isLoading}
                className="p-1 sm:p-2 text-gray-400 hover:text-[#6b8e6f] disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>

          <p className="text-[10px] sm:text-xs text-center text-gray-400 mt-3">
            Deen Tales can produce accurate information about islam, names, or fact&nbsp;
            <a href="/privacy" className="underline hover:text-gray-600">
              Privacy Notice
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TryFree;
