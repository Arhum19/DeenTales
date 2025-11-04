# 🎯 DeenTales - Complete Setup Guide for Team Members

Welcome to the DeenTales project! This guide will help you set up your development environment from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Backend Setup (Python/FastAPI)](#backend-setup)
4. [Frontend Setup (React/Vite)](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Git Workflow](#git-workflow)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Git**: [Download Git](https://git-scm.com/downloads)
- **Python 3.13.7**: [Download Python](https://www.python.org/downloads/)
  - ✅ During installation, check "Add Python to PATH"
- **Node.js** (v18 or higher): [Download Node.js](https://nodejs.org/)
  - Includes npm (Node Package Manager)
- **Code Editor**: [VS Code](https://code.visualstudio.com/) (recommended)

### Verify Installation

Open your terminal and run:

```powershell
# Check Git
git --version

# Check Python (should show 3.13.7)
python --version
# or
py --version

# Check Node.js
node --version

# Check npm
npm --version
```

---

## Clone the Repository

1. **Open your terminal** (PowerShell on Windows)

2. **Navigate to your projects folder:**
   ```powershell
   cd D:\Projects  # or wherever you keep your code
   ```

3. **Clone the repository:**
   ```powershell
   git clone https://github.com/Arhum19/DeenTales.git
   ```

4. **Navigate into the project:**
   ```powershell
   cd DeenTales
   ```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd backend
```

### Step 2: Create Virtual Environment

A virtual environment isolates Python dependencies for this project.

**Windows (PowerShell):**
```powershell
py -3.13 -m venv venv
```

**Linux/Mac:**
```bash
python3.13 -m venv venv
```

You should now see a `venv/` folder in the `backend` directory.

### Step 3: Activate Virtual Environment

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**If you get an execution policy error**, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

✅ **Success indicator**: Your terminal prompt should now show `(venv)` at the beginning.

### Step 4: Upgrade pip

```powershell
python -m pip install --upgrade pip
```

### Step 5: Install All Python Dependencies

```powershell
pip install -r requirements.txt
```

This installs ~33 packages including:
- FastAPI (web framework)
- Uvicorn (server)
- Pydantic (data validation)
- JWT authentication libraries
- And more...

**This may take 2-3 minutes.**

### Step 6: Verify Backend Installation

```powershell
# List installed packages
pip list

# Quick test
python -c "import fastapi, uvicorn; print('✓ Backend environment ready!')"
```

If you see "✓ Backend environment ready!" - you're good to go!

### Step 7: Configure Environment Variables

1. **Copy the example file:**
   ```powershell
   copy .env.example .env
   ```

2. **Edit the `.env` file** with your actual values:

   Open `backend/.env` in your code editor and update:

   ```bash
   # Security - REQUIRED
   SECRET_KEY=use-openssl-rand-hex-32-or-any-long-random-string
   
   # AI Services - REQUIRED for AI features
   OPENAI_API_KEY=sk-your-openai-api-key-here
   STABILITY_API_KEY=your-stability-api-key-here
   
   # Development settings
   DEBUG=True
   ALLOWED_ORIGINS=["http://localhost:5173","http://localhost:3000"]
   ```

   **To generate a secure SECRET_KEY:**
   ```powershell
   python -c "import secrets; print(secrets.token_hex(32))"
   ```

   ⚠️ **Never commit the `.env` file!** It's already in `.gitignore`.

### Step 8: Test Backend Server

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open your browser and go to:
- API: `http://localhost:8000`
- Interactive Docs: `http://localhost:8000/docs`

Press `Ctrl+C` to stop the server.

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal** (keep backend terminal running if you want) and:

```powershell
cd frontend
```

### Step 2: Install Node Dependencies

```powershell
npm install
```

This installs all packages from `package.json`:
- React
- React Router
- Vite
- Tailwind CSS
- And more...

**This may take 2-3 minutes.**

### Step 3: Configure Environment Variables

1. **Copy the example file:**
   ```powershell
   copy .env.example .env
   ```

2. **Edit `frontend/.env`:**
   ```bash
   VITE_API_URL=http://localhost:8000
   ```

   This tells the frontend where to find the backend API.

### Step 4: Test Frontend Server

```powershell
npm run dev
```

Open your browser and go to: `http://localhost:5173`

You should see the DeenTales homepage!

Press `Ctrl+C` to stop the server.

---

## Running the Application

For full-stack development, you need **both** servers running:

### Terminal 1: Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1  # Windows
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Terminal 2: Frontend

```powershell
cd frontend
npm run dev
```

### Access Points

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`

---

## Troubleshooting

### Backend Issues

#### "Python not found"
- Make sure Python 3.13.7 is installed
- Try `py` instead of `python`
- Check Python is in your PATH

#### "Cannot activate venv"
Windows PowerShell execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### "Module not found" errors
Make sure you:
1. Activated the venv: `.\venv\Scripts\Activate.ps1`
2. Installed dependencies: `pip install -r requirements.txt`

#### "Port 8000 already in use"
```powershell
# Use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

#### "npm not found"
- Make sure Node.js is installed
- Restart your terminal after installation

#### "ENOENT: no such file or directory"
- Make sure you're in the `frontend` directory
- Run `npm install` first

#### "Port 5173 already in use"
Vite will automatically use the next available port (5174, 5175, etc.)

#### Blank page or errors in browser
- Check browser console (F12)
- Make sure backend is running
- Verify `VITE_API_URL` in `.env` is correct

---

## Git Workflow

### Daily Workflow

1. **Pull latest changes** before starting work:
   ```powershell
   git pull origin main
   ```

2. **Create a feature branch** for your work:
   ```powershell
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and test them

4. **Check what changed:**
   ```powershell
   git status
   ```

5. **Stage and commit:**
   ```powershell
   git add .
   git commit -m "Add: descriptive message about changes"
   ```

6. **Push to GitHub:**
   ```powershell
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub for review

### ⚠️ Files to NEVER Commit

These are automatically ignored by `.gitignore`:

- `venv/` or `.venv/` - Python virtual environments
- `node_modules/` - Node.js packages
- `.env` - Environment variables with secrets
- `__pycache__/` - Python cache
- `dist/` - Build output
- User uploads and generated files

### Check Before Committing

```powershell
# See what will be committed
git status

# Make sure no .env or venv files appear!
```

---

## VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **Python** (ms-python.python)
2. **Pylance** (ms-python.vscode-pylance)
3. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
4. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
5. **ESLint** (dbaeumer.vscode-eslint)
6. **Prettier** (esbenp.prettier-vscode)

---

## Environment Summary

### Backend (Python 3.13.7)

- **Location**: `backend/`
- **Virtual Environment**: `backend/venv/`
- **Dependencies**: `backend/requirements.txt`
- **Config**: `backend/.env` (not committed)
- **Run**: `uvicorn app.main:app --reload`
- **Port**: 8000

### Frontend (React + Vite)

- **Location**: `frontend/`
- **Dependencies**: `frontend/package.json`
- **Config**: `frontend/.env` (not committed)
- **Run**: `npm run dev`
- **Port**: 5173

---

## Need Help?

- Check `backend/README.md` for backend-specific docs
- Check `frontend/README.md` for frontend-specific docs
- Check `docs/` folder for API documentation
- Ask the team on Slack/Discord/Teams

---

## Quick Reference Commands

### Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1        # Activate venv
pip install -r requirements.txt    # Install deps
uvicorn app.main:app --reload      # Run server
deactivate                         # Exit venv
```

### Frontend
```powershell
cd frontend
npm install                        # Install deps
npm run dev                        # Run dev server
npm run build                      # Build for production
```

### Git
```powershell
git pull origin main               # Get latest
git checkout -b feature/name       # New branch
git add .                          # Stage changes
git commit -m "message"            # Commit
git push origin branch-name        # Push
```

---

**Happy Coding! 🚀**
