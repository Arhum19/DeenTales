from beanie import Document
from beanie.odm.fields import Indexed
from pydantic import EmailStr, Field
from typing import Optional, Annotated
from datetime import datetime, timezone


class User(Document):
    """
    User Document Model for MongoDB
    
    Fields:
        - id: Auto-generated MongoDB ObjectId (serves as User_ID / Primary Key)
        - username: User's display name
        - password: Hashed password (never store plain text!)
        - email: User's email address (unique, indexed)
        - created_at: Timestamp when user was created
        - updated_at: Timestamp when user was last updated
    """
    
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)  # Will store hashed password
    email: Annotated[EmailStr, Indexed(unique=True)] = Field(...)  # Unique index on email
    
    # Optional timestamps
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None

    class Settings:
        # MongoDB collection name
        name = "users"
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "username": "john_doe",
                "password": "hashedpassword123",
                "email": "john@example.com"
            }
        }
    }