"""
User database model
"""
from datetime import datetime
from typing import Optional


class User:
    """User model"""
    
    def __init__(
        self,
        id: str,
        email: str,
        name: str,
        hashed_password: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
        is_active: bool = True,
        is_verified: bool = False
    ):
        self.id = id
        self.email = email
        self.name = name
        self.hashed_password = hashed_password
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
        self.is_active = is_active
        self.is_verified = is_verified
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_active": self.is_active,
            "is_verified": self.is_verified
        }
