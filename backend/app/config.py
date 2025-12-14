from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Application settings - automatically loaded from .env file!
    
    How it works:
    - Create a .env file with MONGODB_URL and DATABASE_NAME
    - pydantic-settings automatically reads it
    - Access values via: settings.MONGODB_URL, settings.DATABASE_NAME
    """
    
    MONGODB_URL: str = "mongodb://localhost:27017"  # Default if not in .env
    DATABASE_NAME: str = "deentales"  # Default if not in .env

    class Config:
        env_file = ".env"


# Create settings instance - automatically loads from .env
settings = Settings()

# Now your teammate just uses:
# settings.MONGODB_URL  → reads from .env or uses default
# settings.DATABASE_NAME → reads from .env or uses default
