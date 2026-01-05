from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import init_db
from app.routes.auth import router as auth_router


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

# Authentication routes are provided by `app.routes.auth` (mounted below).

app.include_router(auth_router)

# Routes will be added here by your teammate
# Example:
# from app.routes import auth_router
# app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
