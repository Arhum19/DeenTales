// Image service - handles AI image generation
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const imageService = {
  // Generate image from prompt
  async generateImage(prompt, options = {}) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/image/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt,
          ...options, // size, style, etc.
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Image generation error:", error);
      throw error;
    }
  },

  // Get user's generated images
  async getMyImages() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/image/my-images`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch images error:", error);
      throw error;
    }
  },

  // Get specific image
  async getImage(imageId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/image/${imageId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch image error:", error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(imageId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/image/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      return true;
    } catch (error) {
      console.error("Delete image error:", error);
      throw error;
    }
  },
};
