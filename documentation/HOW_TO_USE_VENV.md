# 📋 How to Use Virtual Environment (venv) in This Project

## ✅ You're All Set!

Your backend virtual environment is **already created and configured** with all dependencies installed at:
```
d:\deentales\backend\venv\
```

---

## 🚀 Daily Usage

### Every time you work on the backend:

**1. Navigate to backend folder:**
```powershell
cd d:\deentales\backend
```

**2. Activate the virtual environment:**
```powershell
.\venv\Scripts\Activate.ps1
```

**3. You'll see `(venv)` in your prompt:**
```powershell
(venv) PS D:\deentales\backend>
```

**4. Now you can run Python commands:**
```powershell
# Run the server
uvicorn app.main:app --reload

# Run Python scripts
python script.py

# Install new packages
pip install package-name

# List packages
pip list
```

**5. When done, deactivate:**
```powershell
deactivate
```

Or just close the terminal!

---

## 🔧 What's Already Installed

Your venv currently has **33 packages** including:

### Core Framework
- ✅ FastAPI 0.115.0
- ✅ Uvicorn 0.32.0
- ✅ Pydantic 2.9.2
- ✅ Starlette 0.38.6

### Authentication
- ✅ Python-JOSE 3.3.0 (JWT)
- ✅ Passlib 1.7.4 (password hashing)
- ✅ Bcrypt 5.0.0
- ✅ Cryptography 46.0.3

### Utilities
- ✅ Aiofiles 24.1.0
- ✅ Python-Multipart 0.0.12
- ✅ Email-Validator 2.2.0
- ✅ Python-Dotenv 1.0.1

### Web Server
- ✅ Uvicorn with standard extras (httptools, watchfiles, websockets)

**Full list:** Run `pip list` with venv activated

---

## 👥 For Your Teammates

Share this with new team members:

### First-Time Setup for New Teammate

```powershell
# 1. Clone the repo
git clone https://github.com/Arhum19/DeenTales.git
cd DeenTales\backend

# 2. Create virtual environment
py -3.13 -m venv venv

# 3. Activate it
.\venv\Scripts\Activate.ps1

# 4. Install all dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 5. Configure environment
copy .env.example .env
# Edit .env with actual API keys

# 6. Verify installation
python -c "import fastapi, uvicorn; print('✓ Ready!')"
```

**That's it!** They now have the exact same environment as you.

---

## 📦 Managing Dependencies

### Adding a New Package

```powershell
# 1. Make sure venv is active
.\venv\Scripts\Activate.ps1

# 2. Install the package
pip install requests

# 3. Update requirements.txt so teammates can install it
pip freeze > requirements.txt

# 4. Commit requirements.txt
git add requirements.txt
git commit -m "Add requests package"
git push
```

### When Teammate Adds a Package

```powershell
# 1. Pull latest code
git pull origin main

# 2. Activate venv
.\venv\Scripts\Activate.ps1

# 3. Install new dependencies
pip install -r requirements.txt
```

---

## 🔍 VS Code Integration

### Current Setup
✅ VS Code is configured to use: `d:\deentales\backend\venv\Scripts\python.exe`

### Check/Change Python Interpreter

1. Press `Ctrl+Shift+P`
2. Type: "Python: Select Interpreter"
3. Select: `.\backend\venv\Scripts\python.exe`

You'll see in the bottom-left corner:
```
🐍 3.13.7 ('venv')
```

### IntelliSense & Auto-completion
With venv selected, VS Code will:
- ✅ Auto-complete imports from installed packages
- ✅ Show function signatures and documentation
- ✅ Highlight import errors
- ✅ Use the correct Python version

---

## ⚠️ Important Rules

### ✅ DO:
- Activate venv before running Python code
- Commit `requirements.txt` to Git
- Update `requirements.txt` when adding packages
- Keep `.env` outside venv (it's in `backend/.env`)

### ❌ DON'T:
- Commit the `venv/` folder (it's in `.gitignore`)
- Install packages globally without venv active
- Share your `.env` file (contains secrets)
- Edit files inside `venv/` folder

---

## 🐛 Troubleshooting

### "Scripts is disabled on this system"

**Windows PowerShell execution policy error.**

Fix:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### "Module not found" errors

Make sure venv is activated!

Check:
```powershell
# Should show (venv) prefix
(venv) PS D:\deentales\backend>

# Verify Python path
python -c "import sys; print(sys.executable)"
# Should output: D:\deentales\backend\venv\Scripts\python.exe
```

If not activated:
```powershell
.\venv\Scripts\Activate.ps1
```

---

### Need to start fresh?

Delete and recreate venv:
```powershell
# Deactivate first
deactivate

# Delete venv folder
Remove-Item -Recurse -Force venv

# Recreate
py -3.13 -m venv venv

# Activate
.\venv\Scripts\Activate.ps1

# Reinstall everything
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 📂 Project Structure

```
deentales/
├── backend/
│   ├── venv/                    ← Virtual environment (DO NOT commit!)
│   │   ├── Include/
│   │   ├── Lib/
│   │   │   └── site-packages/  ← Installed packages live here
│   │   ├── Scripts/
│   │   │   ├── Activate.ps1    ← Activation script
│   │   │   ├── python.exe      ← Python interpreter
│   │   │   └── pip.exe         ← Package installer
│   │   └── pyvenv.cfg
│   ├── app/                     ← Your code
│   ├── requirements.txt         ← Dependencies list (DO commit!)
│   └── .env                     ← Secrets (DO NOT commit!)
└── .gitignore                   ← Ignores venv/ and .env
```

---

## 🎯 Quick Reference

### Activate venv
```powershell
cd d:\deentales\backend
.\venv\Scripts\Activate.ps1
```

### Run backend server
```powershell
cd d:\deentales\backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

### Install new package
```powershell
.\venv\Scripts\Activate.ps1
pip install package-name
pip freeze > requirements.txt
```

### Update after git pull
```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## 📚 More Help

- **Complete Setup Guide**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **All Commands**: See [COMMANDS.md](COMMANDS.md)
- **Detailed venv Info**: See [VENV_GUIDE.md](VENV_GUIDE.md)
- **Backend Docs**: See [backend/README.md](backend/README.md)

---

## ✨ Summary

**You already have everything set up!**

Your virtual environment at `backend/venv/` contains all 33 required packages.

**To start working:**
1. `cd backend`
2. `.\venv\Scripts\Activate.ps1`
3. `uvicorn app.main:app --reload`

**Your teammates** just need to:
1. Clone the repo
2. Run the setup commands above
3. They'll have the same environment!

The venv ensures everyone on your team has **identical Python environments** and there are **no conflicts** between projects. 🎉
