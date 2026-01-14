from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ==================== Chat Schemas ====================

class ChatCreate(BaseModel):
    """Schema for creating a new chat"""
    title: Optional[str] = Field(default="New Chat", max_length=200)


class ChatUpdate(BaseModel):
    """Schema for updating a chat (e.g., renaming)"""
    title: str = Field(..., max_length=200)


class ChatResponse(BaseModel):
    """Schema for chat response"""
    id: str
    user_id: str
    title: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ChatListResponse(BaseModel):
    """Schema for list of chats (sidebar)"""
    id: str
    title: str
    created_at: datetime
    updated_at: Optional[datetime] = None
