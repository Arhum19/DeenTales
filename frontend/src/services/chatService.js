// Chat service - handles AI chatbot interactions
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const chatService = {
  // Send message to AI
  async sendMessage(message, conversationId = null) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  },

  // Get chat history
  async getChatHistory(conversationId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/chat/history/${conversationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Chat history error:", error);
      throw error;
    }
  },

  // Get all conversations
  async getConversations() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chat/conversations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Conversations error:", error);
      throw error;
    }
  },

  // Create new conversation
  async createConversation(title = "New Conversation") {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chat/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create conversation");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Create conversation error:", error);
      throw error;
    }
  },

  // Delete conversation
  async deleteConversation(conversationId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/chat/conversation/${conversationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete conversation");
      }

      return true;
    } catch (error) {
      console.error("Delete conversation error:", error);
      throw error;
    }
  },
};
