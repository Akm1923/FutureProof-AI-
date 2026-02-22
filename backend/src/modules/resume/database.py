from typing import Dict, Any
import uuid
from datetime import datetime
from shared.database import get_db

class ResumeDatabase:
    def __init__(self):
        self.client = get_db()
    
    def store_resume(self, data: Dict[str, Any], user_id: str = None) -> Dict[str, Any]:
        """Store parsed resume data in Supabase"""
        
        # Create the record with proper structure
        record = {
            "data": data,
            "created_at": datetime.now().isoformat()
        }
        
        # Add user_id if provided (required for RLS)
        if user_id:
            record["user_id"] = user_id
            print(f"Storing with user_id: {user_id}")
        else:
            print("Warning: No user_id provided, RLS may block this")
        
        print(f"Inserting record into Supabase...")
        result = self.client.table("resumes").insert(record).execute()
        print(f"Insert result: {result}")
        
        if result.data and len(result.data) > 0:
            return result.data[0]
        else:
            return {"id": str(uuid.uuid4())}
    
    def get_resume(self, candidate_id: str) -> Dict[str, Any]:
        """Retrieve resume by candidate ID"""
        result = self.client.table("resumes").select("*").eq("metadata->>candidate_id", candidate_id).execute()
        
        if not result.data:
            raise Exception("Resume not found")
        
        return result.data[0]
    
    def update_resume(self, candidate_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update resume data"""
        result = self.client.table("resumes").update(data).eq("metadata->>candidate_id", candidate_id).execute()
        return result.data[0] if result.data else {}
    
    def list_resumes(self, limit: int = 50) -> list:
        """List all resumes"""
        result = self.client.table("resumes").select("*").limit(limit).execute()
        return result.data
