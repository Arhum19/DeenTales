from beanie import Document, Link, PydanticObjectId
from pydantic import Field
from typing import Optional, TYPE_CHECKING
from datetime import datetime, timezone

if TYPE_CHECKING:
    from app.models.user import User


class Chat(Document):
    """
    Chat Document Model for MongoDB
    
    Represents a chat session/conversation between user and AI.
    
    Fields:
        - id: Auto-generated MongoDB ObjectId (Chat_ID / Primary Key)
        - user_id: Reference to the User who owns this chat
        - title: Chat title (auto-generated from first message or user-defined)
        - created_at: Timestamp when chat was created
        - updated_at: Timestamp when chat was last updated
    """
    
    user_id: PydanticObjectId = Field(..., description="Reference to User ID")
    title: str = Field(default="New Chat", max_length=200)
    
    # Timestamps
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None

    class Settings:
        name = "chats"
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "title": "Story of Prophet Yunus"
            }
        }
    }
