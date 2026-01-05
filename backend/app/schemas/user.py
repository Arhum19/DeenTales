from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    """Schema for creating a new user (signup)"""

    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=72)
    email: EmailStr


class UserLogin(BaseModel):
    """Schema for user login"""

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for user response (excludes password)"""

    id: str
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
