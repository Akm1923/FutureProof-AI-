from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class InterestsRequest(BaseModel):
    interests: List[str]
    user_id: str
    user_skills: Optional[List[str]] = []

class TechStackSelection(BaseModel):
    tech_stack: str
    duration_days: int
    skill_level: str  # beginner, intermediate, advanced

class RoadmapRequest(BaseModel):
    user_id: str
    selections: List[TechStackSelection]
    user_skills: Optional[List[str]] = []

class ProgressUpdate(BaseModel):
    tech_stack: str
    day: int
    completed: bool

class TechStackSuggestion(BaseModel):
    name: str
    description: str
    category: str
    difficulty: str
    relevance_score: int
    already_known: bool
    prerequisites: List[str]
    use_cases: List[str]

class RoadmapResponse(BaseModel):
    roadmap_id: str
    roadmaps: List[Dict[str, Any]]
