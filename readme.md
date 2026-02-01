## Group Members

- **Eishal Khan** (SP23-BSCS-0031)
- **Muhammad Bassam Yousaf** (SP23-BSCS-0072)
- **Arhum bin Abid** (SP23-BSCS-0040)
- **Safiyah Asif Khan** (SP23-BSCS-0037)
- **Waniya Khan** (SP23-BSCS-0010)

# DeenTales Frontend

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

```text
deentales/
├── .vscode/
├── backend/
│   ├── app/
│   │   ├── dependencies/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── __pycache__/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── venv/
│   ├── .env
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
├── data/
│   ├── 
│   └── main_df.csv 
│   ├── hadith
│   └── names_of_Allah
│   ├── quran
│   └── surahs
│   ├── tafseer
│   └── translation
├── docs/
│   ├── README.md
│   └── api_docs.md
├── documentation/
│   ├── COMMANDS.md
│   ├── HOW_TO_USE_VENV.md
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   └── VENV_GUIDE.md
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── TAILWIND_SETUP.md
│   └── vite.config.js
├── .gitignore
├── readme.md
└── requirements.txt
```

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
