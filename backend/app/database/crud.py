"""
CRUD operations for database
"""
from typing import Optional, List
from app.schemas.user_schema import UserCreate, UserUpdate
from app.core.security import get_password_hash
from app.core.utils import generate_uuid, get_current_timestamp


# Mock database storage (replace with actual database)
users_db = {}
conversations_db = {}
messages_db = {}
images_db = {}


# User CRUD operations
async def create_user(user: UserCreate) -> dict:
    """Create a new user"""
    user_id = generate_uuid()
    hashed_password = get_password_hash(user.password)
    
    new_user = {
        "id": user_id,
        "email": user.email,
        "name": user.name,
        "hashed_password": hashed_password,
        "created_at": get_current_timestamp(),
        "is_active": True,
        "is_verified": False
    }
    
    users_db[user_id] = new_user
    return {k: v for k, v in new_user.items() if k != "hashed_password"}


async def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email"""
    for user in users_db.values():
        if user["email"] == email:
            return user
    return None


async def get_user_by_id(user_id: str) -> Optional[dict]:
    """Get user by ID"""
    user = users_db.get(user_id)
    if user:
        return {k: v for k, v in user.items() if k != "hashed_password"}
    return None


async def update_user(user_id: str, user_update: UserUpdate) -> dict:
    """Update user information"""
    if user_id not in users_db:
        return None
    
    user = users_db[user_id]
    update_data = user_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        if key in user:
            user[key] = value
    
    return {k: v for k, v in user.items() if k != "hashed_password"}


# Conversation CRUD operations
async def create_conversation(user_id: str, title: str) -> dict:
    """Create a new conversation"""
    conversation_id = generate_uuid()
    conversation = {
        "id": conversation_id,
        "user_id": user_id,
        "title": title,
        "created_at": get_current_timestamp(),
        "updated_at": get_current_timestamp()
    }
    conversations_db[conversation_id] = conversation
    return conversation


async def get_user_conversations(user_id: str) -> List[dict]:
    """Get all conversations for a user"""
    return [
        conv for conv in conversations_db.values()
        if conv["user_id"] == user_id
    ]


async def delete_conversation(conversation_id: str, user_id: str):
    """Delete a conversation"""
    if conversation_id in conversations_db:
        if conversations_db[conversation_id]["user_id"] == user_id:
            del conversations_db[conversation_id]
            # Also delete associated messages
            messages_to_delete = [
                msg_id for msg_id, msg in messages_db.items()
                if msg["conversation_id"] == conversation_id
            ]
            for msg_id in messages_to_delete:
                del messages_db[msg_id]


# Chat message CRUD operations
async def save_chat_message(
    conversation_id: str,
    user_id: str,
    role: str,
    content: str
) -> dict:
    """Save a chat message"""
    message_id = generate_uuid()
    message = {
        "id": message_id,
        "conversation_id": conversation_id,
        "user_id": user_id,
        "role": role,
        "content": content,
        "created_at": get_current_timestamp()
    }
    messages_db[message_id] = message
    return message


async def get_conversation_history(
    conversation_id: str,
    user_id: str
) -> List[dict]:
    """Get chat history for a conversation"""
    return [
        msg for msg in messages_db.values()
        if msg["conversation_id"] == conversation_id
    ]


# Image CRUD operations
async def save_generated_image(
    user_id: str,
    prompt: str,
    image_url: str,
    size: str,
    style: Optional[str] = None
) -> dict:
    """Save a generated image"""
    image_id = generate_uuid()
    image = {
        "id": image_id,
        "user_id": user_id,
        "prompt": prompt,
        "image_url": image_url,
        "size": size,
        "style": style,
        "created_at": get_current_timestamp()
    }
    images_db[image_id] = image
    return image


async def get_user_images(user_id: str) -> List[dict]:
    """Get all images for a user"""
    return [
        img for img in images_db.values()
        if img["user_id"] == user_id
    ]


async def delete_image(image_id: str, user_id: str):
    """Delete an image"""
    if image_id in images_db:
        if images_db[image_id]["user_id"] == user_id:
            del images_db[image_id]
