from pydantic_settings import BaseSettings
from pydantic import model_validator
from typing import Any


class Settings(BaseSettings):
    """
    Application settings - automatically loaded from .env file!

    How it works:
    - Create a .env file with MONGODB_URL and DATABASE_NAME
    - pydantic-settings automatically reads it
    - Access values via: settings.MONGODB_URL, settings.DATABASE_NAME etc.
    """

    # Default if not in .env
    # insert your own MongoDB URL if needed
    MONGODB_URL: str = "mongodb://localhost:27017/"
    DATABASE_NAME: str = "Deentalesdb"  # Default if not in .env
    # JWT Secret Key
    SECRET_KEY: str = "dc1b2f311beedcc6ed53b8bcc4c3b63c6352f52408355e66061732546bf4b2a3"
    ALGORITHM: str = "HS256"  # JWT Algorithm
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # Token expiry time in minutes
    User_Collection_Name: str = "users"  # Default user collection name
    
    # AI Configuration
    OPENROUTER_API_KEY: str = ""  # Your OpenRouter API key
    PBSE: str = ""  # OpenRouter API key (alternative name)
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1/chat/completions"
    AI_MODEL: str = "openai/gpt-3.5-turbo"
    
    # Hugging Face Image Generation
    HF_TOKEN: str = ""  # Hugging Face API token
    HF_IMAGE_MODEL: str = "Tongyi-MAI/Z-Image-Turbo"  # Fast, high-quality model
    HF_PROVIDER: str = "fal-ai"  # Provider for HF inference

    @model_validator(mode='after')
    def set_api_keys_from_aliases(self) -> 'Settings':
        """Use PBSE as fallback for OPENROUTER_API_KEY"""
        if not self.OPENROUTER_API_KEY and self.PBSE:
            object.__setattr__(self, 'OPENROUTER_API_KEY', self.PBSE)
        return self

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields in .env


# Create settings instance - automatically loads from .env
settings = Settings()

# Debug: Print loaded keys (remove in production)
print(f"[CONFIG] OPENROUTER_API_KEY loaded: {'Yes' if settings.OPENROUTER_API_KEY else 'No'}")
print(f"[CONFIG] HF_TOKEN loaded: {'Yes' if settings.HF_TOKEN else 'No'}")
