"""
Authentication routes - Login, Signup, Google OAuth
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.schemas.user_schema import UserCreate, UserLogin, UserResponse, Token
from app.core.security import create_access_token, verify_password, get_password_hash
from app.database.crud import create_user, get_user_by_email
from datetime import timedelta
from app.core.config import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = await create_user(user)
    return new_user


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """
    Login user and return access token
    """
    # Get user from database
    db_user = await get_user_by_email(user.email)
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login
    """
    db_user = await get_user_by_email(form_data.username)
    
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/google", response_model=Token)
async def google_auth(token: dict):
    """
    Google OAuth authentication
    """
    # TODO: Implement Google OAuth verification
    # Verify the token with Google
    # Create or get user from database
    # Return access token
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Google OAuth not implemented yet"
    )
