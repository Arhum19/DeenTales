# DeenTales Documentation

Welcome to the DeenTales documentation.

## Project Overview

DeenTales is an AI-powered platform for storytelling and visual creation, combining the power of large language models and image generation AI.

## Architecture

### Frontend

- React 18 with Vite
- React Router for navigation
- Context API for state management

### Backend

- FastAPI for REST API
- JWT authentication
- OpenAI integration for chat
- DALL-E/Stability AI for images

### Database

- Configurable (SQLite, PostgreSQL, MongoDB)
- User management
- Chat history
- Image storage

## Quick Start

1. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Setup**

   ```powershell
   cd backend
   # Windows (PowerShell)
   py -3.13 -m venv venv
   venv\Scripts\Activate.ps1
   pip install --upgrade pip
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

   ```bash
   # Linux/Mac
   cd backend
   python3.13 -m venv venv
   source venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

## Features

- User authentication (email/password, Google OAuth)
- AI chat conversations
- AI image generation
- User profile management
- Conversation history
- Image gallery

## API Reference

See [API Documentation](api_docs.md) for detailed endpoint information.

## Contributing

(Coming soon)

## License

Copyright © 2025 DeenTales. All rights reserved.
