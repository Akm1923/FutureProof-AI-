from fastapi import APIRouter, HTTPException
from typing import Optional
from .schemas import (
    InterestsRequest, RoadmapRequest, ProgressUpdate,
    TechStackSuggestion, RoadmapResponse
)
from .services.roadmap_generator import RoadmapGenerator
from .database import LearningRoadmapDB
from shared.config.settings import settings

router = APIRouter()

# Initialize services
roadmap_gen = RoadmapGenerator(settings.GROQ_API_KEY)
db = LearningRoadmapDB(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

@router.post("/suggest-techstacks")
async def suggest_techstacks(request: InterestsRequest):
    """Generate tech stack suggestions based on user interests"""
    try:
        suggestions = await roadmap_gen.suggest_techstacks(request.interests, request.user_skills)
        return {"techstacks": suggestions}
    except Exception as e:
        # Log the full error for debugging
        import traceback
        print(f"ERROR suggesting tech stacks: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to suggest tech stacks: {str(e)}")

@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap(request: RoadmapRequest):
    """Generate personalized learning roadmap for selected tech stacks"""
    try:
        roadmaps = []
        
        for selection in request.selections:
            roadmap = await roadmap_gen.generate_roadmap(
                tech_stack=selection.tech_stack,
                duration_days=selection.duration_days,
                skill_level=selection.skill_level,
                user_skills=request.user_skills
            )
            roadmaps.append(roadmap)
        
        # Store in database
        roadmap_id = db.store_roadmap(request.user_id, roadmaps)
        
        return {
            "roadmap_id": roadmap_id,
            "roadmaps": roadmaps
        }
    except Exception as e:
        # Log the full error for debugging
        import traceback
        print(f"ERROR generating roadmap: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to generate roadmap: {str(e)}")

@router.get("/{user_id}")
async def get_user_roadmap(user_id: str):
    """Get user's learning roadmap"""
    try:
        roadmap = db.get_user_roadmap(user_id)
        if not roadmap:
            raise HTTPException(status_code=404, detail="Roadmap not found")
        return roadmap
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{roadmap_id}/progress")
async def update_roadmap_progress(roadmap_id: str, update: ProgressUpdate):
    """Update progress for a specific day in the roadmap"""
    try:
        success = db.update_progress(
            roadmap_id=roadmap_id,
            tech_stack=update.tech_stack,
            day=update.day,
            completed=update.completed
        )
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update progress")
        return {"success": True, "message": "Progress updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/active/{user_id}")
async def get_active_roadmap(user_id: str):
    """Get user's active learning roadmap"""
    try:
        roadmap = db.get_active_roadmap(user_id)
        if not roadmap:
            return {"active": False, "roadmap": None}
        return {"active": True, "roadmap": roadmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/calendar/{user_id}")
async def get_calendar_events(user_id: str, month: Optional[int] = None, year: Optional[int] = None):
    """Get calendar events for user's learning roadmaps"""
    try:
        from datetime import datetime
        if not month or not year:
            now = datetime.now()
            month = now.month
            year = now.year
        
        events = db.get_calendar_events(user_id, month, year)
        return {"events": events, "month": month, "year": year}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{roadmap_id}")
async def delete_roadmap(roadmap_id: str):
    """Delete a learning roadmap"""
    try:
        success = db.delete_roadmap(roadmap_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete roadmap")
        return {"success": True, "message": "Roadmap deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
