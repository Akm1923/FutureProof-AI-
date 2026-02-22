from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional, Dict, Any
from .services import ResumeParser
from .database import ResumeDatabase
from .schemas import ResumeParseResponse, ResumeGetResponse, ResumeUpdateResponse

router = APIRouter()

# Initialize services
parser = ResumeParser()
db = ResumeDatabase()

@router.post("/parse", response_model=ResumeParseResponse)
async def parse_resume(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None)
):
    """Parse uploaded resume file"""
    try:
        print(f"Received file: {file.filename}")
        print(f"User ID: {user_id}")
        contents = await file.read()
        print(f"File size: {len(contents)} bytes")
        
        # Parse resume
        print("Starting resume parsing...")
        parsed_data = await parser.parse_resume(contents, file.filename)
        print("Resume parsed successfully")
        
        # Store in Supabase
        print("Storing in Supabase...")
        result = db.store_resume(parsed_data, user_id)
        print(f"Stored successfully: {result}")
        
        return {
            "success": True,
            "data": parsed_data,
            "candidate_id": result.get("id")
        }
    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{candidate_id}", response_model=ResumeGetResponse)
async def get_resume(candidate_id: str):
    """Get resume by candidate ID"""
    try:
        data = db.get_resume(candidate_id)
        return {"success": True, "data": data}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{candidate_id}", response_model=ResumeUpdateResponse)
async def update_resume(candidate_id: str, data: Dict[str, Any]):
    """Update resume data"""
    try:
        result = db.update_resume(candidate_id, data)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
