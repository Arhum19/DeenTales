"""
Utility functions
"""
import uuid
from datetime import datetime


def generate_uuid() -> str:
    """Generate a unique identifier"""
    return str(uuid.uuid4())


def get_current_timestamp() -> datetime:
    """Get current UTC timestamp"""
    return datetime.utcnow()


def format_datetime(dt: datetime) -> str:
    """Format datetime to ISO string"""
    return dt.isoformat()


def sanitize_filename(filename: str) -> str:
    """Sanitize a filename for safe storage"""
    # Remove any directory path and special characters
    import re
    filename = filename.split("/")[-1].split("\\")[-1]
    filename = re.sub(r'[^\w\s.-]', '', filename)
    return filename
