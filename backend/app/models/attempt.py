"""
Attempt tracking model (for rate limiting, usage tracking)
"""
from datetime import datetime
from typing import Optional


class Attempt:
    """Attempt tracking model for rate limiting and usage"""
    
    def __init__(
        self,
        id: str,
        user_id: str,
        attempt_type: str,  # 'chat', 'image', 'login', etc.
        status: str,  # 'success', 'failed', 'limited'
        metadata: Optional[dict] = None,
        created_at: Optional[datetime] = None
    ):
        self.id = id
        self.user_id = user_id
        self.attempt_type = attempt_type
        self.status = status
        self.metadata = metadata or {}
        self.created_at = created_at or datetime.utcnow()
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "attempt_type": self.attempt_type,
            "status": self.status,
            "metadata": self.metadata,
            "created_at": self.created_at
        }
