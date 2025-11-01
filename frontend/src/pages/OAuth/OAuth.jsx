import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import "./OAuth.css";

const OAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle OAuth callback
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          await authService.googleAuth(token);
          navigate("/chat");
        } catch (error) {
          console.error("OAuth error:", error);
          navigate("/login");
        }
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="oauth-page">
      <div className="oauth-container">
        <div className="spinner"></div>
        <p>Authenticating...</p>
      </div>
    </div>
  );
};

export default OAuth;
