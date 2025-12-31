from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import HTTPException
from app.database import init_db
from app.routes.auth import router as auth_router
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events"""
    # Startup: Initialize database
    await init_db()
    yield
    # Shutdown: Add cleanup code here if needed


# Create FastAPI app
app = FastAPI(
    title="DeenTales API",
    description="Backend API for DeenTales application",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware - Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://localhost:3000"],  # Vite & React defaults
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "DeenTales API running"}

# signup


@app.post("/signup")
async def signup(user: UserCreate):

    existing_user = await User.find_one(User.email == user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    await new_user.insert()

    return {"message": "User registered successfully"}

# LOGIN

@app.post("/login")
async def login(user: UserLogin):

    db_user = await User.find_one(User.email == user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token(str(db_user.id))

    return {
        "access_token": token,
        "token_type": "bearer"
    }

app.include_router(auth_router)

# Routes will be added here by your teammate
# Example:
# from app.routes import auth_router
# app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
