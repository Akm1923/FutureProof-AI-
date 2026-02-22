from pydantic import BaseModel
from typing import Optional, Dict, Any

class ResumeParseResponse(BaseModel):
    success: bool
    data: Dict[str, Any]
    candidate_id: Optional[str] = None

class ResumeGetResponse(BaseModel):
    success: bool
    data: Dict[str, Any]

class ResumeUpdateResponse(BaseModel):
    success: bool
    data: Dict[str, Any]
