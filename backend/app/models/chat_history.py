"""
Chat history database model
"""
from datetime import datetime
from typing import Optional


class ChatHistory:
    """Chat history model"""
    
    def __init__(
        self,
        id: str,
        conversation_id: str,
        user_id: str,
        role: str,  # 'user' or 'assistant'
        content: str,
        created_at: Optional[datetime] = None
    ):
        self.id = id
        self.conversation_id = conversation_id
        self.user_id = user_id
        self.role = role
        self.content = content
        self.created_at = created_at or datetime.utcnow()
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "user_id": self.user_id,
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at
        }


class Conversation:
    """Conversation model"""
    
    def __init__(
        self,
        id: str,
        user_id: str,
        title: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
