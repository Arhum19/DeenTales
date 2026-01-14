from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ==================== Message Schemas ====================

class MessageCreate(BaseModel):
    """Schema for sending a new message"""
    user_message: str = Field(..., min_length=1, max_length=5000)
    generate_images: bool = Field(default=False, description="Whether to generate images for this response")


class MessageResponse(BaseModel):
    """Schema for message response"""
    id: str
    chat_id: str
    user_message: str
    ai_message: Optional[str] = None
    ai_images: List[str] = []
    ai_references: List[str] = []
    created_at: datetime

    class Config:
        from_attributes = True


class ChatMessagesResponse(BaseModel):
    """Schema for getting all messages in a chat"""
    chat_id: str
    chat_title: str
    messages: List[MessageResponse]


class AIResponse(BaseModel):
    """Internal schema for AI service response"""
    text: str
    references: List[str] = []
    image_prompts: List[str] = []
