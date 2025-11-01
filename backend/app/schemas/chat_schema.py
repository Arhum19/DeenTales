"""
Chat Pydantic schemas
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ChatMessage(BaseModel):
    """Schema for sending a chat message"""
    message: str = Field(..., min_length=1)
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Schema for chat response"""
    message: str
    conversation_id: Optional[str] = None


class ConversationCreate(BaseModel):
    """Schema for creating a conversation"""
    title: str = Field(default="New Conversation", max_length=200)


class Conversation(BaseModel):
    """Schema for conversation"""
    id: str
    user_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class MessageHistory(BaseModel):
    """Schema for message history"""
    id: str
    role: str  # 'user' or 'assistant'
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class ConversationHistory(BaseModel):
    """Schema for conversation with messages"""
    conversation: Conversation
    messages: List[MessageHistory]
