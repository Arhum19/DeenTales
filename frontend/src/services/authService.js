// Authentication service - handles login, signup, and OAuth
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Signup user
  async signup(userData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Google OAuth
  async googleAuth(token) {
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Google authentication failed");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem("token");
  },

  // Get current token
  getToken() {
    return localStorage.getItem("token");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
};
