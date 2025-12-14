from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.config import settings
from app.models.user import User


async def init_db():
    """Initialize database connection and Beanie ODM"""
    
    # Create Motor client
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Get database
    database = client[settings.DATABASE_NAME]
    
    # Initialize Beanie with the User document model
    # Add more document models to the list as you create them
    await init_beanie(
        database=database,
        document_models=[User]
    )
    
    print(f"Connected to MongoDB: {settings.DATABASE_NAME}")
