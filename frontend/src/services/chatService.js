// Chat service - handles AI chatbot interactions with DeenTales backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const chatService = {
  // Create a new chat session
  async createChat(title = "New Chat") {
    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create chat");
      }

      return await response.json();
    } catch (error) {
      console.error("Create chat error:", error);
      throw error;
    }
  },

  // Get all user's chats (for sidebar)
  async getAllChats() {
    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch chats");
      }

      return await response.json();
    } catch (error) {
      console.error("Get chats error:", error);
      throw error;
    }
  },

  // Get messages for a specific chat
  async getChatMessages(chatId) {
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch messages");
      }

      return await response.json();
    } catch (error) {
      console.error("Get messages error:", error);
      throw error;
    }
  },

  // Send a message and get AI response
  async sendMessage(chatId, userMessage, generateImages = false) {
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}/message`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          user_message: userMessage,
          generate_images: generateImages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  },

  // Update chat title
  async updateChatTitle(chatId, newTitle) {
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update chat");
      }

      return await response.json();
    } catch (error) {
      console.error("Update chat error:", error);
      throw error;
    }
  },

  // Delete a chat
  async deleteChat(chatId) {
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok && response.status !== 204) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete chat");
      }

      return true;
    } catch (error) {
      console.error("Delete chat error:", error);
      throw error;
    }
  },

  // Regenerate images for a message
  async regenerateImages(chatId, messageId) {
    try {
      const response = await fetch(
        `${API_URL}/chat/${chatId}/message/${messageId}/regenerate-images`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to regenerate images");
      }

      return await response.json();
    } catch (error) {
      console.error("Regenerate images error:", error);
      throw error;
    }
  },
};
