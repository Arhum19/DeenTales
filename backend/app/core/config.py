"""
Configuration settings for the application
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # App settings
    APP_NAME: str = "DeenTales API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # CORS settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database settings
    DATABASE_URL: str = "sqlite:///./deentales.db"
    # For PostgreSQL: postgresql://user:password@localhost/dbname
    # For MongoDB: mongodb://localhost:27017/deentales
    
    # OpenAI API settings
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-3.5-turbo"
    
    # Image generation settings
    IMAGE_GENERATION_SERVICE: str = "openai"  # or "stability"
    STABILITY_API_KEY: str = ""
    
    # File upload settings
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_FOLDER: str = "./uploads"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
