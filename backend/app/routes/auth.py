from fastapi import APIRouter, HTTPException, status, Depends
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    # Check if user already exists
    existing_user = await User.find_one(User.email == user.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create new user with hashed password
    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    # Insert into database
    await new_user.insert()

    return {
        "message": "User created successfully",
        "email": new_user.email
    }


@router.post("/login")
async def login(user: UserLogin):
    db_user = await User.find_one(User.email == user.email)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(str(db_user.id))

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
async def read_me(current_user: User = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "username": current_user.username,
        "email": current_user.email,
    }
