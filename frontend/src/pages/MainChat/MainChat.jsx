import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../services/chatService";

const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Dummy chat history
  const [chatHistory] = useState([
    { id: 1, title: "Helpful AI Ready", icon: "💬", date: "Today" },
    { id: 2, title: "Greenhouse Effect Expla...", icon: "🌍", date: "Today" },
    { id: 3, title: "Movie Streaming Help", icon: "🎬", date: "Today" },
    { id: 4, title: "Web Design Workflow", icon: "💬", date: "Previous 7 days" },
    { id: 5, title: "Photo generation", icon: "🖼️", date: "Previous 7 days" },
    { id: 6, title: "Cats eat grass", icon: "💬", date: "Previous 7 days" },
    { id: 7, title: "Weather Dynamics", icon: "🌤️", date: "Previous 7 days" },
  ]);

  useEffect(() => {
    const initConversation = async () => {
      try {
        const conv = await chatService.createConversation();
        setConversationId(conv.id);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };
    initConversation();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(input, conversationId);
      const aiMessage = { role: "assistant", content: response.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    const initConversation = async () => {
      try {
        const conv = await chatService.createConversation();
        setConversationId(conv.id);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };
    initConversation();
  };

  const groupedHistory = chatHistory.reduce((acc, chat) => {
    if (!acc[chat.date]) {
      acc[chat.date] = [];
    }
    acc[chat.date].push(chat);
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-[#e8f5e9] transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 flex-shrink-0">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#6b8e6f] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Arhum</p>
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1 hover:bg-white/50 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New chat
          </button>

          {/* Search - Collapsible */}
          {isSearchOpen && (
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6b8e6f]"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {Object.entries(groupedHistory).map(([date, chats]) => (
            <div key={date} className="mb-4">
              <p className="text-xs text-gray-500 mb-2">{date}</p>
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-3 py-2 hover:bg-white/50 rounded-lg mb-1 flex items-center gap-2 text-sm text-gray-700"
                >
                  <span>{chat.icon}</span>
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Upgrade Section */}
        <div className="p-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Arhum</span>
              <button className="ml-auto p-1 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              Upgrade to Pro
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="/images/public/logo.png"
                  alt="Deen Tales Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-semibold text-gray-900">Deen Tales</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Arhum</span>
              <div className="w-10 h-10 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Deen Tales</h1>
                <p className="text-gray-500">World first islamic ai chatbot</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">DT</span>
                      </div>
                    )}
                    <div
                      className={`max-w-xl px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-gray-200 text-gray-900"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-3 mt-2 text-gray-400">
                          <button
                            onClick={() => handleCopyMessage(msg.content)}
                            className="hover:text-gray-600 transition-colors"
                            title="Copy message"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-bold text-sm">A</span>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">DT</span>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send your message"
                disabled={isLoading}
                className="w-full pl-14 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#6b8e6f] focus:border-transparent text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 text-gray-400 hover:text-[#6b8e6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-xs text-center text-gray-400 mt-3">
              Deen Tales will produce accurate information about islam, names, or fact{" "}
              <a href="/privacy" className="underline hover:text-gray-600">
                Privacy Notice
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
