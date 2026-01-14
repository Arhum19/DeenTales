from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from beanie import PydanticObjectId
from datetime import datetime, timezone

from app.models.chat import Chat
from app.models.message import Message
from app.models.user import User
from app.schemas.chat import ChatCreate, ChatUpdate, ChatResponse, ChatListResponse
from app.schemas.message import MessageCreate, MessageResponse, ChatMessagesResponse
from app.dependencies.auth import get_current_user
from app.services.ai_service import get_ai_response, generate_story_images, detect_image_request, generate_direct_image

router = APIRouter(prefix="/chat", tags=["Chat"])


# ==================== Chat Endpoints ====================

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ChatResponse)
async def create_chat(
    chat_data: ChatCreate = None,
    current_user: User = Depends(get_current_user)
):
    """Create a new chat session"""
    new_chat = Chat(
        user_id=current_user.id,
        title=chat_data.title if chat_data else "New Chat"
    )
    await new_chat.insert()
    
    return ChatResponse(
        id=str(new_chat.id),
        user_id=str(new_chat.user_id),
        title=new_chat.title,
        created_at=new_chat.created_at,
        updated_at=new_chat.updated_at
    )


@router.get("/", response_model=List[ChatListResponse])
async def get_user_chats(current_user: User = Depends(get_current_user)):
    """Get all chats for the current user (for sidebar)"""
    chats = await Chat.find(Chat.user_id == current_user.id).sort(-Chat.updated_at, -Chat.created_at).to_list()
    
    return [
        ChatListResponse(
            id=str(chat.id),
            title=chat.title,
            created_at=chat.created_at,
            updated_at=chat.updated_at
        )
        for chat in chats
    ]


@router.get("/{chat_id}", response_model=ChatMessagesResponse)
async def get_chat_messages(
    chat_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get all messages in a chat"""
    # Validate chat exists and belongs to user
    chat = await Chat.get(PydanticObjectId(chat_id))
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Get messages
    messages = await Message.find(Message.chat_id == PydanticObjectId(chat_id)).sort(Message.created_at).to_list()
    
    return ChatMessagesResponse(
        chat_id=str(chat.id),
        chat_title=chat.title,
        messages=[
            MessageResponse(
                id=str(msg.id),
                chat_id=str(msg.chat_id),
                user_message=msg.user_message,
                ai_message=msg.ai_message,
                ai_images=msg.ai_images,
                ai_references=msg.ai_references,
                created_at=msg.created_at
            )
            for msg in messages
        ]
    )


@router.patch("/{chat_id}", response_model=ChatResponse)
async def update_chat(
    chat_id: str,
    chat_data: ChatUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update chat title"""
    chat = await Chat.get(PydanticObjectId(chat_id))
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    chat.title = chat_data.title
    chat.updated_at = datetime.now(timezone.utc)
    await chat.save()
    
    return ChatResponse(
        id=str(chat.id),
        user_id=str(chat.user_id),
        title=chat.title,
        created_at=chat.created_at,
        updated_at=chat.updated_at
    )


@router.delete("/{chat_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_chat(
    chat_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete a chat and all its messages"""
    chat = await Chat.get(PydanticObjectId(chat_id))
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Delete all messages in this chat
    await Message.find(Message.chat_id == PydanticObjectId(chat_id)).delete()
    
    # Delete the chat
    await chat.delete()


# ==================== Message Endpoints ====================

@router.post("/{chat_id}/message", response_model=MessageResponse)
async def send_message(
    chat_id: str,
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Send a message and get AI response
    
    This is the main endpoint for the chat functionality.
    It sends the user's message to the AI and returns the response.
    """
    # Validate chat exists and belongs to user
    chat = await Chat.get(PydanticObjectId(chat_id))
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Get chat history for context
    history_messages = await Message.find(
        Message.chat_id == PydanticObjectId(chat_id)
    ).sort(-Message.created_at).limit(10).to_list()
    
    # Reverse to get chronological order
    history = [
        {"user_message": msg.user_message, "ai_message": msg.ai_message}
        for msg in reversed(history_messages)
    ]
    
    try:
        # Check if user is directly requesting an image
        is_direct_image_request, image_subject = detect_image_request(message_data.user_message)
        
        # Get AI response
        ai_text, references, image_prompts = await get_ai_response(
            message_data.user_message,
            chat_history=history
        )
        
        # Generate images
        images = []
        if message_data.generate_images:
            if is_direct_image_request:
                # Direct image request - generate specific image
                print(f"[IMAGE] Direct request detected: {image_subject}")
                images = await generate_direct_image(image_subject)
            elif image_prompts:
                # Story with image prompts
                images = await generate_story_images(ai_text, num_images=4)
        
        # Create message document
        new_message = Message(
            chat_id=PydanticObjectId(chat_id),
            user_message=message_data.user_message,
            ai_message=ai_text,
            ai_images=images,
            ai_references=references
        )
        await new_message.insert()
        
        # Update chat title if this is the first message
        if len(history) == 0:
            # Use first 50 chars of user message as title
            new_title = message_data.user_message[:50]
            if len(message_data.user_message) > 50:
                new_title += "..."
            chat.title = new_title
            chat.updated_at = datetime.now(timezone.utc)
            await chat.save()
        else:
            # Update the chat's updated_at timestamp
            chat.updated_at = datetime.now(timezone.utc)
            await chat.save()
        
        return MessageResponse(
            id=str(new_message.id),
            chat_id=str(new_message.chat_id),
            user_message=new_message.user_message,
            ai_message=new_message.ai_message,
            ai_images=new_message.ai_images,
            ai_references=new_message.ai_references,
            created_at=new_message.created_at
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get AI response: {str(e)}"
        )


@router.post("/{chat_id}/message/{message_id}/regenerate-images", response_model=MessageResponse)
async def regenerate_images(
    chat_id: str,
    message_id: str,
    current_user: User = Depends(get_current_user)
):
    """Regenerate images for an existing message"""
    # Validate chat
    chat = await Chat.get(PydanticObjectId(chat_id))
    if not chat or chat.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Get message
    message = await Message.get(PydanticObjectId(message_id))
    if not message or message.chat_id != PydanticObjectId(chat_id):
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Generate new images
    images = await generate_story_images(message.ai_message or "", num_images=4)
    
    # Update message
    message.ai_images = images
    await message.save()
    
    return MessageResponse(
        id=str(message.id),
        chat_id=str(message.chat_id),
        user_message=message.user_message,
        ai_message=message.ai_message,
        ai_images=message.ai_images,
        ai_references=message.ai_references,
        created_at=message.created_at
    )
