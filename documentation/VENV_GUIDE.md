# Python Virtual Environment (venv) Quick Reference

## What is a Virtual Environment?

A virtual environment is an isolated Python environment that keeps dependencies for different projects separate. Think of it as a bubble for your project's Python packages.

## Why Use venv?

✅ **Isolation**: Each project has its own packages
✅ **No conflicts**: Different projects can use different package versions
✅ **Clean**: Doesn't pollute your global Python installation
✅ **Reproducible**: Easy for teammates to match your setup
✅ **Safe**: Easy to delete and recreate if something breaks

---

## Basic Commands

### Windows (PowerShell)

```powershell
# Create venv
py -3.13 -m venv venv

# Activate venv
.\venv\Scripts\Activate.ps1

# Deactivate venv
deactivate

# Install packages
pip install package-name

# Install from requirements.txt
pip install -r requirements.txt

# Save installed packages to file
pip freeze > requirements.txt

# List installed packages
pip list

# Upgrade pip
python -m pip install --upgrade pip
```

### Linux/Mac

```bash
# Create venv
python3.13 -m venv venv

# Activate venv
source venv/bin/activate

# Deactivate venv
deactivate

# (Other commands same as Windows)
```

---

## Daily Workflow

### Starting Your Work Session

```powershell
# 1. Navigate to backend folder
cd D:\deentales\backend

# 2. Activate venv
.\venv\Scripts\Activate.ps1

# 3. (Optional) Check if all deps are installed
pip list

# 4. Start working!
```

### Ending Your Work Session

```powershell
# Just deactivate (or close terminal)
deactivate
```

### When You Pull New Code

```powershell
# 1. Activate venv
.\venv\Scripts\Activate.ps1

# 2. Install any new dependencies
pip install -r requirements.txt
```

---

## How to Know if venv is Active?

Look at your terminal prompt:

**Inactive:**
```
PS D:\deentales\backend>
```

**Active:**
```
(venv) PS D:\deentales\backend>
```

The `(venv)` prefix means you're in the virtual environment! ✅

---

## Common Issues & Solutions

### 1. "Cannot be loaded because running scripts is disabled"

**Windows PowerShell execution policy issue.**

**Fix:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try activating again.

---

### 2. "ModuleNotFoundError: No module named 'fastapi'"

**You forgot to activate venv OR didn't install dependencies.**

**Fix:**
```powershell
# Activate venv first
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

---

### 3. "python: command not found"

**Python not in PATH or using wrong command.**

**Fix (Windows):**
- Try `py` instead of `python`
- Or `python` if you added to PATH during install

**Fix (Linux/Mac):**
- Try `python3` or `python3.13`

---

### 4. Accidentally created venv in wrong folder

**Fix:**
```powershell
# Just delete it and recreate
Remove-Item -Recurse -Force venv
cd backend
py -3.13 -m venv venv
```

---

### 5. Want to start fresh with clean venv

**Fix:**
```powershell
# Deactivate first
deactivate

# Delete old venv
Remove-Item -Recurse -Force venv

# Create new venv
py -3.13 -m venv venv

# Activate it
.\venv\Scripts\Activate.ps1

# Reinstall everything
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Installing New Packages

### Individual Package

```powershell
# Activate venv first!
.\venv\Scripts\Activate.ps1

# Install package
pip install requests

# Add to requirements.txt for teammates
pip freeze > requirements.txt
```

### From requirements.txt

```powershell
# Activate venv
.\venv\Scripts\Activate.ps1

# Install all packages
pip install -r requirements.txt
```

---

## Project Structure

```
deentales/
├── backend/
│   ├── venv/              ← Virtual environment (NEVER commit this!)
│   │   ├── Include/
│   │   ├── Lib/
│   │   ├── Scripts/
│   │   │   ├── Activate.ps1
│   │   │   ├── python.exe
│   │   │   └── pip.exe
│   │   └── pyvenv.cfg
│   ├── app/               ← Your code
│   ├── requirements.txt   ← List of dependencies (DO commit this!)
│   └── .env               ← Secrets (NEVER commit this!)
└── .gitignore             ← Tells git to ignore venv/
```

---

## Team Collaboration Rules

### ✅ DO:

- Commit `requirements.txt`
- Activate venv before installing packages
- Update `requirements.txt` after adding packages: `pip freeze > requirements.txt`
- Tell teammates when you add new dependencies

### ❌ DON'T:

- Commit the `venv/` folder
- Install packages globally (without venv active)
- Share your `.env` file
- Forget to activate venv before coding

---

## VS Code Integration

### Set Python Interpreter

1. Open Command Palette: `Ctrl+Shift+P`
2. Type: "Python: Select Interpreter"
3. Choose: `.\backend\venv\Scripts\python.exe`

Now VS Code will automatically use your venv!

### Check Active Interpreter

Look at bottom-left of VS Code:
```
🐍 3.13.7 ('venv')
```

---

## Quick Sanity Checks

### Is venv active?
```powershell
# Should show path inside venv folder
python -c "import sys; print(sys.executable)"

# Example output (Windows):
# D:\deentales\backend\venv\Scripts\python.exe
```

### Are packages installed?
```powershell
pip list

# Should show ~33 packages including:
# fastapi, uvicorn, pydantic, etc.
```

### Can I import project modules?
```powershell
python -c "import fastapi, uvicorn; print('OK')"
# Should print: OK
```

---

## Useful Commands

```powershell
# Show where Python is running from
python -c "import sys; print(sys.executable)"

# Show installed package versions
pip list

# Show specific package info
pip show fastapi

# Check for outdated packages
pip list --outdated

# Upgrade a package
pip install --upgrade package-name

# Uninstall a package
pip uninstall package-name

# Show dependency tree
pip show -f package-name
```

---

## Environment Variables (.env)

The `.env` file is NOT part of venv, but they work together:

```bash
# .env contains configuration
SECRET_KEY=abc123
DEBUG=True
OPENAI_API_KEY=sk-...

# Python code reads it:
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    
    class Config:
        env_file = ".env"
```

**Remember**: `.env` is in `.gitignore` and should NEVER be committed!

---

## Cheat Sheet for Teammates

**First time setup:**
```powershell
cd backend
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
copy .env.example .env
```

**Every day:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
# ... do your work ...
deactivate  # when done
```

**After pulling code:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt  # in case new deps were added
```

**Run the server:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

---

## Additional Resources

- [Python venv documentation](https://docs.python.org/3/library/venv.html)
- [pip documentation](https://pip.pypa.io/en/stable/)
- [Python Packaging Guide](https://packaging.python.org/)

---

**Pro Tip**: Create a PowerShell alias for faster activation!

Add to your PowerShell profile:
```powershell
function Activate-Backend { & D:\deentales\backend\venv\Scripts\Activate.ps1 }
Set-Alias -Name venv -Value Activate-Backend
```

Then just type: `venv` to activate! 🚀
