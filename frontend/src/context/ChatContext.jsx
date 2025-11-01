import React, { createContext, useContext, useState } from "react";
import { chatService } from "../services/chatService";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadConversations = async () => {
    try {
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const createConversation = async (title) => {
    try {
      const newConv = await chatService.createConversation(title);
      setConversations([...conversations, newConv]);
      setCurrentConversation(newConv);
      setMessages([]);
      return newConv;
    } catch (error) {
      console.error("Failed to create conversation:", error);
      throw error;
    }
  };

  const sendMessage = async (message) => {
    if (!currentConversation) {
      await createConversation();
    }

    setIsLoading(true);
    try {
      const response = await chatService.sendMessage(
        message,
        currentConversation?.id
      );

      const userMessage = { role: "user", content: message };
      const aiMessage = { role: "assistant", content: response.message };

      setMessages([...messages, userMessage, aiMessage]);
      return response;
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatHistory = async (conversationId) => {
    try {
      const history = await chatService.getChatHistory(conversationId);
      setMessages(history);
      setCurrentConversation({ id: conversationId });
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await chatService.deleteConversation(conversationId);
      setConversations(conversations.filter((c) => c.id !== conversationId));
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      throw error;
    }
  };

  const value = {
    conversations,
    currentConversation,
    messages,
    isLoading,
    loadConversations,
    createConversation,
    sendMessage,
    loadChatHistory,
    deleteConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
