# 🚀 DeenTales - Quick Command Reference

**New team member? Start here:** Read `SETUP_GUIDE.md` first!

---

## 📦 Backend Commands (Python/FastAPI)

### First Time Setup
```powershell
cd backend
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your API keys
```

### Daily Use
```powershell
cd backend
.\venv\Scripts\Activate.ps1              # Activate venv
uvicorn app.main:app --reload            # Run server
# Ctrl+C to stop
deactivate                               # Deactivate venv
```

### Package Management
```powershell
pip list                                 # Show installed packages
pip install package-name                 # Install new package
pip install -r requirements.txt          # Install all dependencies
pip freeze > requirements.txt            # Save dependencies
```

---

## 🎨 Frontend Commands (React/Vite)

### First Time Setup
```powershell
cd frontend
npm install
copy .env.example .env
# Edit .env: VITE_API_URL=http://localhost:8000
```

### Daily Use
```powershell
cd frontend
npm run dev                              # Run dev server
# Ctrl+C to stop
npm run build                            # Build for production
npm run preview                          # Preview production build
```

### Package Management
```powershell
npm install                              # Install all dependencies
npm install package-name                 # Install new package
npm update                               # Update packages
```

---

## 🌳 Git Commands

### Daily Workflow
```powershell
git status                               # Check status
git pull origin main                     # Get latest changes
git checkout -b feature/name             # Create feature branch
git add .                                # Stage all changes
git commit -m "message"                  # Commit changes
git push origin branch-name              # Push to GitHub
```

### Branch Management
```powershell
git branch                               # List branches
git checkout branch-name                 # Switch branch
git checkout main                        # Back to main
git branch -d feature/name               # Delete local branch
```

---

## 🔧 Full Stack Development

### Run Both Servers (2 terminals)

**Terminal 1 - Backend:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Access Points
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🐍 Python venv Commands

```powershell
.\venv\Scripts\Activate.ps1              # Activate (Windows)
source venv/bin/activate                 # Activate (Linux/Mac)
deactivate                               # Deactivate
python --version                         # Check Python version
pip --version                            # Check pip version
python -m pip install --upgrade pip      # Upgrade pip
```

---

## 🔍 Troubleshooting Commands

### Backend
```powershell
# Check if FastAPI imports work
python -c "import fastapi, uvicorn; print('OK')"

# Check Python path (should be in venv)
python -c "import sys; print(sys.executable)"

# List all packages
pip list

# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend
```powershell
# Clear npm cache
npm cache clean --force

# Delete and reinstall node_modules
Remove-Item -Recurse -Force node_modules
npm install

# Check for outdated packages
npm outdated
```

---

## 📝 Environment Files

### Backend (.env)
```bash
SECRET_KEY=your-secret-key
OPENAI_API_KEY=sk-...
STABILITY_API_KEY=sk-...
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:5173"]
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000
```

**⚠️ NEVER commit .env files!**

---

## 🛠️ VS Code

### Useful Shortcuts
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+` ` - Toggle Terminal
- `Ctrl+B` - Toggle Sidebar
- `Ctrl+P` - Quick Open File
- `F5` - Start Debugging

### Select Python Interpreter
1. `Ctrl+Shift+P`
2. Type: "Python: Select Interpreter"
3. Choose: `.\backend\venv\Scripts\python.exe`

---

## 📚 Documentation

- **Full Setup Guide**: `SETUP_GUIDE.md`
- **venv Details**: `VENV_GUIDE.md`
- **Backend Docs**: `backend/README.md`
- **Frontend Docs**: `frontend/README.md`
- **API Reference**: `docs/api_docs.md`
- **Project Overview**: `readme.md`

---

## ✅ Pre-Commit Checklist

Before committing:
```powershell
# 1. Check what changed
git status

# 2. Make sure these are NOT in your commit:
#    - venv/ folder
#    - .env files
#    - node_modules/
#    - __pycache__/

# 3. Test your changes
cd backend
.\venv\Scripts\Activate.ps1
python -c "import app.main"    # Should not error

cd ../frontend
npm run build                  # Should build successfully
```

---

## 🚨 Emergency Commands

### Start Fresh - Backend
```powershell
cd backend
deactivate
Remove-Item -Recurse -Force venv
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```

### Start Fresh - Frontend
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Reset to Main Branch
```powershell
git fetch origin
git reset --hard origin/main
git clean -fd
```

---

**Need more help?** Check `SETUP_GUIDE.md` or ask the team!
