"""
User routes - User profile management
"""
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user_schema import UserResponse, UserUpdate
from app.core.security import get_current_user
from app.database.crud import get_user_by_id, update_user

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Get current user information
    """
    user = await get_user_by_id(current_user["id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update current user information
    """
    updated_user = await update_user(current_user["id"], user_update)
    return updated_user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    """
    Get user by ID (public profile)
    """
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
