# DeenTales Backend

FastAPI backend with MongoDB for DeenTales application.

## Setup Instructions

### 1. Prerequisites

- Python 3.10 or higher
- MongoDB installed and running locally (or MongoDB Atlas URI)

### 2. Activate Virtual Environment

```bash
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Windows (CMD)
.\venv\Scripts\activate.bat

# Linux/Mac
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your MongoDB settings
```

**.env file content:**

```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=deentales
```

### 5. Run the Server

```bash
uvicorn app.main:app --reload
```

Server will run at: `http://localhost:8000`

API Docs: `http://localhost:8000/docs`

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Settings from environment
│   ├── database.py          # MongoDB connection
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py          # User document model
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py          # Pydantic validation schemas
│   └── utils/
│       ├── __init__.py
│       └── password.py      # Password hashing utilities
├── venv/                    # Virtual environment
├── .env                     # Environment variables (create from .env.example)
├── .env.example
├── requirements.txt
└── README.md
```

## User Model

| Field      | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| id         | ObjectId | Primary Key (auto-generated) |
| username   | String   | User's display name          |
| password   | String   | Hashed password              |
| email      | String   | Unique email address         |
| created_at | DateTime | Account creation timestamp   |
| updated_at | DateTime | Last update timestamp        |

## Dependencies

- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Motor** - Async MongoDB driver
- **Beanie** - MongoDB ODM (Object Document Mapper)
- **Pydantic** - Data validation
- **Passlib** - Password hashing (bcrypt)
- **python-dotenv** - Environment variables
