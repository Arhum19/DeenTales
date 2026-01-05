from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import settings
from app.models.user import User


async def init_db():
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URL)

    await init_beanie(
        database=client[settings.DATABASE_NAME],
        document_models=[User]
    )

    print(f"Connected to MongoDB: {settings.DATABASE_NAME}")
