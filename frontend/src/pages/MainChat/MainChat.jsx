import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../services/chatService";
import { authService } from "../../services/authService";

const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [generateImages, setGenerateImages] = useState(true);
  const [userName, setUserName] = useState("User");

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }
    loadChatHistory();
    loadUserInfo();
  }, [navigate]);

  // Load user info
  const loadUserInfo = async () => {
    try {
      const user = await authService.getUser();
      if (user && user.username) {
        setUserName(user.username);
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const loadChatHistory = async () => {
    try {
      const chats = await chatService.getAllChats();
      setChatHistory(chats);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await chatService.createChat();
      setCurrentChatId(newChat.id);
      setMessages([]);
      await loadChatHistory();
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const handleSelectChat = async (chatId) => {
    try {
      setCurrentChatId(chatId);
      const chatData = await chatService.getChatMessages(chatId);
      // Transform messages to display format
      const formattedMessages = chatData.messages.map((msg) => ({
        id: msg.id,
        userMessage: msg.user_message,
        aiMessage: msg.ai_message,
        aiImages: msg.ai_images || [],
        aiReferences: msg.ai_references || [],
        createdAt: msg.created_at,
      }));
      setMessages(formattedMessages);
      // Close sidebar on mobile after selection
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    try {
      await chatService.deleteChat(chatId);
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
      await loadChatHistory();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Create new chat if none exists
    let chatId = currentChatId;
    if (!chatId) {
      try {
        const newChat = await chatService.createChat();
        chatId = newChat.id;
        setCurrentChatId(chatId);
      } catch (error) {
        console.error("Failed to create chat:", error);
        setIsLoading(false);
        return;
      }
    }

    // Optimistically add user message
    const tempMessage = {
      id: "temp-" + Date.now(),
      userMessage: userMessage,
      aiMessage: null,
      aiImages: [],
      aiReferences: [],
      isLoading: true,
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await chatService.sendMessage(
        chatId,
        userMessage,
        generateImages
      );

      // Replace temp message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? {
                id: response.id,
                userMessage: response.user_message,
                aiMessage: response.ai_message,
                aiImages: response.ai_images || [],
                aiReferences: response.ai_references || [],
                isLoading: false,
              }
            : msg
        )
      );

      // Refresh chat history to update titles
      await loadChatHistory();
    } catch (error) {
      console.error("Failed to send message:", error);
      // Update temp message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? {
                ...msg,
                aiMessage: "Sorry, something went wrong. Please try again.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Group chat history by date
  const groupedHistory = chatHistory.reduce((acc, chat) => {
    const date = new Date(chat.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    let group;
    if (date.toDateString() === today.toDateString()) {
      group = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      group = "Yesterday";
    } else if (date > weekAgo) {
      group = "Previous 7 days";
    } else {
      group = "Older";
    }

    if (!acc[group]) acc[group] = [];
    acc[group].push(chat);
    return acc;
  }, {});

  // Filter chats by search
  const filteredHistory = searchQuery
    ? Object.fromEntries(
        Object.entries(groupedHistory)
          .map(([date, chats]) => [
            date,
            chats.filter((chat) =>
              chat.title.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          ])
          .filter(([, chats]) => chats.length > 0)
      )
    : groupedHistory;

  // Get icon for chat based on content
  const getChatIcon = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("prophet") || lower.includes("story")) return "📖";
    if (lower.includes("quran")) return "📕";
    if (lower.includes("hadith")) return "📜";
    if (lower.includes("prayer") || lower.includes("salah")) return "🕌";
    return "💬";
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-[#e8f5e9] text-gray-900 flex flex-col
          absolute inset-y-0 left-0 z-40 transform transition-transform duration-300
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}
          md:relative md:inset-y-auto md:left-auto md:z-10 md:transition-all
          ${isSidebarOpen ? "md:w-64" : "md:w-0 md:overflow-hidden"}`}
      >
        {isSidebarOpen && (
          <div className="flex flex-col flex-1 h-full">
            {/* Header */}
            <div className="p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900">{userName}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 hover:bg-white/50 rounded md:hidden"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New chat
              </button>

              {/* Search */}
              {isSearchOpen && (
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search chats..."
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {Object.keys(filteredHistory).length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No chats yet
                </p>
              ) : (
                Object.entries(filteredHistory).map(([date, chats]) => (
                  <div key={date} className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">{date}</p>
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 text-sm cursor-pointer group
                          ${
                            currentChatId === chat.id
                              ? "bg-white/70 text-gray-900"
                              : "text-gray-700 hover:bg-white/50"
                          }`}
                      >
                        <span>{getChatIcon(chat.title)}</span>
                        <span className="truncate flex-1">{chat.title}</span>
                        <button
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                        >
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* User Menu */}
            <div className="p-4 flex-shrink-0 border-t border-gray-200">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="ml-auto p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-500"
                    title="Logout"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <span className="font-semibold text-gray-900">Deen Tales</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* Image generation toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={generateImages}
                  onChange={(e) => setGenerateImages(e.target.checked)}
                  className="w-4 h-4 text-[#6b8e6f] rounded focus:ring-[#6b8e6f]"
                />
                <span className="text-sm text-gray-600">Generate Images</span>
              </label>
              <div className="w-10 h-10 bg-[#6b8e6f] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-[#6b8e6f] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">DT</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Deen Tales
                </h1>
                <p className="text-gray-500 mb-8">
                  World's first Islamic AI chatbot
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    "Tell me about Prophet Yunus (PBUH)",
                    "What are the five pillars of Islam?",
                    "Story of Prophet Yusuf (PBUH)",
                    "Explain Surah Al-Fatiha",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-[#6b8e6f] hover:shadow-sm transition-all text-sm text-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-4">
                    {/* User Message */}
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-xl px-4 py-3 rounded-2xl bg-gray-200 text-gray-900">
                        <p className="text-sm leading-relaxed">
                          {msg.userMessage}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-[#6b8e6f] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">DT</span>
                      </div>
                      <div className="max-w-3xl">
                        {msg.isLoading ? (
                          <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            {/* AI Text Response */}
                            <div className="px-4 py-3">
                              <div className="text-sm leading-relaxed text-gray-900 whitespace-pre-wrap">
                                {msg.aiMessage}
                              </div>

                              {/* Quranic References */}
                              {msg.aiReferences &&
                                msg.aiReferences.length > 0 && (
                                  <div className="mt-4 pt-3 border-t border-gray-100">
                                    {msg.aiReferences.map((ref, idx) => (
                                      <p
                                        key={idx}
                                        className="text-sm text-gray-700 mb-1"
                                      >
                                        <span className="font-semibold text-[#6b8e6f]">
                                          Quranic Reference:
                                        </span>{" "}
                                        {ref}
                                      </p>
                                    ))}
                                  </div>
                                )}
                            </div>

                            {/* Generated Images */}
                            {msg.aiImages && msg.aiImages.length > 0 && (
                              <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 gap-2">
                                  {msg.aiImages.map((imgUrl, idx) => (
                                    <img
                                      key={idx}
                                      src={imgUrl}
                                      alt={`Generated illustration ${idx + 1}`}
                                      className="w-full h-40 object-cover rounded-lg"
                                      loading="lazy"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-3">
                              <button
                                onClick={() => handleCopyMessage(msg.aiMessage)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Copy"
                              >
                                <svg
                                  className="w-4 h-4"
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
                              <button
                                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                title="Like"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  />
                                </svg>
                              </button>
                              <button
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Dislike"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
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
                    d="M12 4v16m8-8H4"
                  />
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 text-gray-400 hover:text-[#6b8e6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </form>
            <p className="text-xs text-center text-gray-400 mt-3">
              Deen Tales will produce accurate information about people, places,
              or fact.{" "}
              <a href="/privacy" className="underline hover:text-gray-600">
                Privacy Notice
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainChat;
