import React, { createContext, useContext, useState, useCallback } from "react";
import { chatService } from "../services/chatService";

const ChatContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadChats = useCallback(async () => {
    try {
      const data = await chatService.getAllChats();
      setChats(data);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  }, []);

  const createChat = useCallback(async (title = "New Chat") => {
    try {
      const newChat = await chatService.createChat(title);
      setChats((prev) => [newChat, ...prev]);
      setCurrentChat(newChat);
      setMessages([]);
      return newChat;
    } catch (error) {
      console.error("Failed to create chat:", error);
      throw error;
    }
  }, []);

  const selectChat = useCallback(async (chatId) => {
    try {
      const chatData = await chatService.getChatMessages(chatId);
      setCurrentChat({ id: chatId, title: chatData.chat_title });
      setMessages(chatData.messages);
      return chatData;
    } catch (error) {
      console.error("Failed to select chat:", error);
      throw error;
    }
  }, []);

  const sendMessage = useCallback(
    async (userMessage, generateImages = false) => {
      if (!currentChat) {
        const newChat = await createChat();
        setCurrentChat(newChat);
      }

      setIsLoading(true);
      try {
        const response = await chatService.sendMessage(
          currentChat?.id,
          userMessage,
          generateImages
        );

        setMessages((prev) => [...prev, response]);
        await loadChats(); // Refresh to update titles
        return response;
      } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [currentChat, createChat, loadChats]
  );

  const deleteChat = useCallback(
    async (chatId) => {
      try {
        await chatService.deleteChat(chatId);
        setChats((prev) => prev.filter((c) => c.id !== chatId));
        if (currentChat?.id === chatId) {
          setCurrentChat(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to delete chat:", error);
        throw error;
      }
    },
    [currentChat]
  );

  const updateChatTitle = useCallback(
    async (chatId, newTitle) => {
      try {
        const updated = await chatService.updateChatTitle(chatId, newTitle);
        setChats((prev) =>
          prev.map((c) => (c.id === chatId ? { ...c, title: newTitle } : c))
        );
        if (currentChat?.id === chatId) {
          setCurrentChat((prev) => ({ ...prev, title: newTitle }));
        }
        return updated;
      } catch (error) {
        console.error("Failed to update chat title:", error);
        throw error;
      }
    },
    [currentChat]
  );

  const value = {
    chats,
    currentChat,
    messages,
    isLoading,
    loadChats,
    createChat,
    selectChat,
    sendMessage,
    deleteChat,
    updateChatTitle,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
