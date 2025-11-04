# DeenTales - AI-Powered Storytelling Platform

An interactive platform for AI-driven storytelling and visual creation with GPT-powered chat and image generation capabilities.

---

## 📖 Documentation Index

**→ New to the project?** Start here:

- **[Documentation Home](documentation/README.md)** - Main documentation index
- **[SETUP_GUIDE.md](documentation/SETUP_GUIDE.md)** - Complete setup guide for new team members
- **[COMMANDS.md](documentation/COMMANDS.md)** - Quick command reference cheat sheet
- **[VENV_GUIDE.md](documentation/VENV_GUIDE.md)** - Everything about Python virtual environments

**Detailed Documentation:**

- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[frontend/README.md](frontend/README.md)** - Frontend setup and structure
- **[docs/README.md](docs/README.md)** - Project architecture and design
- **[docs/api_docs.md](docs/api_docs.md)** - API endpoint reference

---

## 🏗️ Project Structure

deentales/
│
├── frontend/ # React frontend
│ ├── public/
│ │ ├── images/
│ │ │ ├── public/ # Public visuals (hero images, icons)
│ │ │ └── private/ # Restricted visuals (user-generated, internal)
│ │ ├── index.html
│ │ └── favicon.ico
│ │
│ ├── src/
│ │ ├── assets/ # Logos, backgrounds, etc.
│ │ ├── components/ # Reusable UI parts
│ │ │ ├── Navbar/
│ │ │ ├── HeroSection/
│ │ │ ├── Features/
│ │ │ ├── VisualsSection/
│ │ │ ├── TryNow/
│ │ │ └── Footer/
│ │ │
│ │ ├── pages/ # Each route/page
│ │ │ ├── Home/
│ │ │ ├── Login/
│ │ │ ├── Signup/
│ │ │ ├── OAuth/
│ │ │ ├── MainChat/ # Main GPT-like interface
│ │ │ └── TryFree/
│ │ │
│ │ ├── context/ # React contexts (Auth, Theme, Chat)
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API calls to backend
│ │ │ ├── authService.js
│ │ │ ├── chatService.js
│ │ │ └── imageService.js
│ │ ├── styles/ # Global CSS or Tailwind config
│ │ ├── App.js
│ │ ├── main.jsx
│ │ └── router.js # React Router setup
│ │
│ └── package.json
│
├── backend/ # Python backend (FastAPI recommended)
│ ├── app/
│ │ ├── main.py # Entry point
│ │ ├── api/
│ │ │ ├── routes/
│ │ │ │ ├── auth.py # Login, signup, Google OAuth
│ │ │ │ ├── chat.py # AI chatbot routes
│ │ │ │ ├── image.py # AI image generation
│ │ │ │ └── user.py
│ │ │ └── **init**.py
│ │ ├── core/
│ │ │ ├── config.py # Env setup
│ │ │ ├── security.py # JWT, OAuth helpers
│ │ │ └── utils.py
│ │ ├── models/ # Database models
│ │ │ ├── user.py
│ │ │ ├── chat_history.py
│ │ │ └── attempt.py
│ │ ├── services/ # AI and image services
│ │ │ ├── chat_engine.py # Text generation (e.g. OpenAI API)
│ │ │ └── image_engine.py # Visual generation (e.g. DALL·E / Stability)
│ │ ├── database/ # DB connection setup
│ │ │ ├── connection.py
│ │ │ └── crud.py
│ │ └── schemas/ # Pydantic models
│ │ ├── user_schema.py
│ │ ├── chat_schema.py
│ │ └── image_schema.py
│ │
│ ├── requirements.txt
│ └── .env
│
├── docs/ # Documentation, API references
│ ├── README.md
│ └── api_docs.md
│
├── .gitignore
├── README.md
└── main.py

---

## 🚀 Quick Start for Team Members

### Frontend Setup

1. **Navigate to frontend:**

   ```powershell
   cd frontend
   ```

2. **Install Node dependencies:**

   ```powershell
   npm install
   ```

3. **Create environment file:**

   ```powershell
   copy .env.example .env
   ```

   Edit `.env` and set:

   ```
   VITE_API_URL=http://localhost:8000
   ```

4. **Run development server:**
   ```powershell
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

### Backend Setup

1. **Navigate to backend:**

   ```powershell
   cd backend
   ```

2. **Create Python virtual environment:**

   ```powershell
   # Windows
   py -3.13 -m venv venv

   # Linux/Mac
   python3.13 -m venv venv
   ```

3. **Activate virtual environment:**

   ```powershell
   # Windows (PowerShell)
   .\venv\Scripts\Activate.ps1

   # Linux/Mac
   source venv/bin/activate
   ```

4. **Install Python dependencies:**

   ```powershell
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. **Configure environment:**

   ```powershell
   copy .env.example .env
   ```

   Edit `.env` with your API keys and secrets.

6. **Run backend server:**
   ```powershell
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   Backend runs at: `http://localhost:8000`
   API Docs: `http://localhost:8000/docs`

### ⚠️ Important Git Rules

**DO NOT COMMIT:**

- `venv/` or `.venv/` folders
- `.env` files (contains secrets)
- `node_modules/` folder
- User uploads or generated files

These are already in `.gitignore` ✅

---

## 📚 Detailed Documentation

- **Frontend**: See `frontend/README.md`
- **Backend**: See `backend/README.md`
- **API Reference**: See `docs/api_docs.md`
- **Project Setup**: See `docs/README.md`
