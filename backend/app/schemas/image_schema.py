"""
Image generation Pydantic schemas
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ImageGenerateRequest(BaseModel):
    """Schema for image generation request"""
    prompt: str = Field(..., min_length=1, max_length=1000)
    size: str = Field(default="1024x1024", pattern="^(256x256|512x512|1024x1024)$")
    style: Optional[str] = Field(default=None, max_length=100)


class ImageResponse(BaseModel):
    """Schema for image response"""
    id: str
    image_url: str
    prompt: str
    created_at: datetime
    size: Optional[str] = None
    style: Optional[str] = None
    
    class Config:
        from_attributes = True


class ImageUpdate(BaseModel):
    """Schema for updating image metadata"""
    prompt: Optional[str] = None


class ImageEditRequest(BaseModel):
    """Schema for image editing request"""
    image_url: str
    prompt: str = Field(..., min_length=1, max_length=1000)
    mask_url: Optional[str] = None
