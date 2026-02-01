from beanie import Document, PydanticObjectId
from pydantic import Field
from typing import Optional, List
from datetime import datetime, timezone


class Message(Document):
    """
    Message Document Model for MongoDB
    
    Represents a single message exchange in a chat (user message + AI response).
    
    Fields:
        - id: Auto-generated MongoDB ObjectId (Primary Key)
        - chat_id: Reference to the Chat this message belongs to
        - user_message: The message sent by the user
        - ai_message: The AI's text response
        - ai_images: List of generated image URLs (from Pollinations AI)
        - ai_references: Quranic/Hadith references in the response
        - created_at: Timestamp when message was created
    """
    
    chat_id: PydanticObjectId = Field(..., description="Reference to Chat ID")
    user_message: str = Field(..., min_length=1, max_length=5000)
    ai_message: Optional[str] = Field(default=None, max_length=50000)
    ai_images: List[str] = Field(default_factory=list, description="List of generated image URLs")
    ai_references: List[str] = Field(default_factory=list, description="Quranic/Hadith references")
    
    # Timestamps
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "messages"
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "chat_id": "507f1f77bcf86cd799439011",
                "user_message": "Tell me about Prophet Yunus",
                "ai_message": "Prophet Yunus (Jonah) is mentioned in the Quran...",
                "ai_images": ["https://image.pollinations.ai/prompt/..."],
                "ai_references": ["Quran 37:139-148", "Quran 21:87-88"]
            }
        }
    }
