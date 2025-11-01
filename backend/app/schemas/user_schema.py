"""
User Pydantic schemas
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)


class UserCreate(UserBase):
    """Schema for creating a new user"""
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """Schema for updating user information"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None


class UserResponse(UserBase):
    """Schema for user response"""
    id: str
    created_at: datetime
    is_active: bool
    is_verified: bool
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for authentication token"""
    access_token: str
    token_type: str
    user: Optional[UserResponse] = None


class TokenData(BaseModel):
    """Schema for token data"""
    email: Optional[str] = None
