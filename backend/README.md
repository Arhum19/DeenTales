# DeenTales Backend API

FastAPI backend for DeenTales AI-powered storytelling and visual creation platform.

## Features

- **Authentication**: JWT-based auth with login, signup, and Google OAuth support
- **AI Chat**: OpenAI GPT integration for conversational AI
- **Image Generation**: DALL-E / Stability AI integration for visual creation
- **User Management**: Profile management and user operations
- **Rate Limiting**: Attempt tracking for usage monitoring

## Tech Stack

- **Framework**: FastAPI
- **Authentication**: JWT with passlib and python-jose
- **Database**: SQLite (configurable for PostgreSQL/MongoDB)
- **AI Services**: OpenAI API, Stability AI

## Project Structure

```
backend/
├── app/
│   ├── main.py              # Application entry point
│   ├── api/
│   │   └── routes/          # API endpoints
│   │       ├── auth.py      # Authentication routes
│   │       ├── chat.py      # Chat routes
│   │       ├── image.py     # Image generation routes
│   │       └── user.py      # User routes
│   ├── core/
│   │   ├── config.py        # Configuration settings
│   │   ├── security.py      # Security utilities (JWT, hashing)
│   │   └── utils.py         # Utility functions
│   ├── models/              # Database models
│   │   ├── user.py
│   │   ├── chat_history.py
│   │   └── attempt.py
│   ├── services/            # External services
│   │   ├── chat_engine.py   # OpenAI integration
│   │   └── image_engine.py  # Image generation
│   ├── database/            # Database operations
│   │   ├── connection.py
│   │   └── crud.py
│   └── schemas/             # Pydantic schemas
│       ├── user_schema.py
│       ├── chat_schema.py
│       └── image_schema.py
├── requirements.txt
└── .env
```

## Getting Started

### Prerequisites

- **Python 3.13.7** - [Download here](https://www.python.org/downloads/)
- **pip** (bundled with Python)
- **Git** (to clone the repository)

### Installation

#### Step 1: Navigate to Backend Directory

```powershell
cd backend
```

#### Step 2: Create Virtual Environment

**Windows (PowerShell):**

```powershell
py -3.13 -m venv venv
```

**Linux/Mac:**

```bash
python3.13 -m venv venv
```

> **Note**: The virtual environment folder `venv/` is already in `.gitignore` and should NOT be committed to the repository.

#### Step 3: Activate Virtual Environment

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal prompt.

#### Step 4: Upgrade pip

```powershell
python -m pip install --upgrade pip
```

#### Step 5: Install All Dependencies

```powershell
pip install -r requirements.txt
```

This will install all required packages:

- FastAPI (web framework)
- Uvicorn (ASGI server)
- Pydantic & Pydantic-Settings (validation)
- Python-JOSE (JWT tokens)
- Passlib (password hashing)
- Python-Multipart (file uploads)
- Aiofiles (async file operations)
- Email-Validator
- And more...

#### Step 6: Verify Installation

```powershell
pip list
```

You should see ~33 packages installed.

**Quick sanity check:**

```powershell
python -c "import fastapi, uvicorn; print('✓ Environment ready!')"
```

#### Step 7: Configure Environment Variables

1. Copy the example environment file:

```powershell
copy .env.example .env
```

2. Edit `.env` with your actual values:

```bash
# Required: Change these!
SECRET_KEY=your-actual-secret-key-here
OPENAI_API_KEY=your-openai-api-key
STABILITY_API_KEY=your-stability-api-key

# Optional: Adjust as needed
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

> **⚠️ Important**: The `.env` file contains sensitive data and is in `.gitignore`. Never commit it!

### Running the Server

From the `backend` directory with venv activated:

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Flags explained:**

- `--reload`: Auto-restart on code changes (dev only)
- `--host 127.0.0.1`: Bind to localhost
- `--port 8000`: Listen on port 8000

The API will be available at:

- **API Base**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

### API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/token` - OAuth2 token endpoint
- `POST /api/auth/google` - Google OAuth

### Chat

- `POST /api/chat/message` - Send message to AI
- `POST /api/chat/conversation` - Create conversation
- `GET /api/chat/conversations` - Get user conversations
- `GET /api/chat/history/{id}` - Get conversation history
- `DELETE /api/chat/conversation/{id}` - Delete conversation

### Image

- `POST /api/image/generate` - Generate image from prompt
- `GET /api/image/my-images` - Get user's images
- `GET /api/image/{id}` - Get specific image
- `DELETE /api/image/{id}` - Delete image

### User

- `GET /api/user/me` - Get current user
- `PUT /api/user/me` - Update current user
- `GET /api/user/{id}` - Get user by ID

## Environment Variables

```env
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
DATABASE_URL=sqlite:///./deentales.db
```

## Development

### Adding New Routes

1. Create route file in `app/api/routes/`
2. Add router to `app/main.py`
3. Create corresponding schemas in `app/schemas/`
4. Implement CRUD operations in `app/database/crud.py`

### Database

Currently using in-memory storage (dict). To add persistent database:

1. Choose database (SQLite, PostgreSQL, MongoDB)
2. Install driver (aiosqlite, asyncpg, motor)
3. Update `app/database/connection.py`
4. Implement database operations in `app/database/crud.py`

## License

Copyright © 2025 DeenTales. All rights reserved.
