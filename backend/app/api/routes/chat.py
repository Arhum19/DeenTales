"""
Chat routes - AI chatbot interactions
"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.chat_schema import ChatMessage, ChatResponse, Conversation, ConversationCreate
from app.services.chat_engine import generate_chat_response
from app.core.security import get_current_user
from app.database.crud import (
    create_conversation,
    get_user_conversations,
    get_conversation_history,
    save_chat_message,
    delete_conversation as db_delete_conversation
)

router = APIRouter()


@router.post("/message", response_model=ChatResponse)
async def send_message(
    message: ChatMessage,
    current_user: dict = Depends(get_current_user)
):
    """
    Send a message to the AI chatbot
    """
    try:
        # Generate AI response
        ai_response = await generate_chat_response(
            message.message,
            conversation_id=message.conversation_id
        )
        
        # Save user message and AI response to database
        if message.conversation_id:
            await save_chat_message(
                conversation_id=message.conversation_id,
                user_id=current_user["id"],
                role="user",
                content=message.message
            )
            await save_chat_message(
                conversation_id=message.conversation_id,
                user_id=current_user["id"],
                role="assistant",
                content=ai_response
            )
        
        return {
            "message": ai_response,
            "conversation_id": message.conversation_id
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating response: {str(e)}"
        )


@router.post("/conversation", response_model=Conversation)
async def create_new_conversation(
    conversation: ConversationCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new conversation
    """
    new_conversation = await create_conversation(
        user_id=current_user["id"],
        title=conversation.title
    )
    return new_conversation


@router.get("/conversations", response_model=list[Conversation])
async def get_conversations(current_user: dict = Depends(get_current_user)):
    """
    Get all conversations for the current user
    """
    conversations = await get_user_conversations(current_user["id"])
    return conversations


@router.get("/history/{conversation_id}")
async def get_chat_history(
    conversation_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get chat history for a specific conversation
    """
    history = await get_conversation_history(conversation_id, current_user["id"])
    return history


@router.delete("/conversation/{conversation_id}")
async def delete_conversation(
    conversation_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a conversation
    """
    await db_delete_conversation(conversation_id, current_user["id"])
    return {"message": "Conversation deleted successfully"}
