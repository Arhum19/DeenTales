from pydantic_settings import BaseSettings


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
    User_Collection_Name: str = "Users"  # Default user collection name

    class Config:
        env_file = ".env"


# Create settings instance - automatically loads from .env
settings = Settings()

# Now your teammate just uses:
# settings.MONGODB_URL  → reads from .env or uses default
# settings.DATABASE_NAME → reads from .env or uses default
