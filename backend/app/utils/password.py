from passlib.context import CryptContext

# Password hashing context using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a plain text password (truncate to 72 bytes for bcrypt compatibility)"""
    # Bcrypt can only hash passwords up to 72 bytes
    # Truncate at the string level before encoding to preserve UTF-8 integrity
    truncated = password[:72]
    return pwd_context.hash(truncated)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain text password against a hashed password"""
    # Truncate to 72 bytes for bcrypt compatibility (same as hash_password)
    truncated = plain_password[:72]
    return pwd_context.verify(truncated, hashed_password)
