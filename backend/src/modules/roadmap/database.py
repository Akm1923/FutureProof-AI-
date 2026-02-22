from supabase import create_client, Client
from datetime import datetime
from typing import List, Dict, Optional
import json

class LearningRoadmapDB:
    def __init__(self, supabase_url: str, supabase_key: str):
        self.client: Client = create_client(supabase_url, supabase_key)
    
    def store_roadmap(self, user_id: str, roadmaps: List[Dict]) -> str:
        """Store learning roadmap in database"""
        try:
            from datetime import datetime
            
            record = {
                "user_id": user_id,
                "roadmaps": roadmaps,
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat(),
                "start_date": datetime.now().date().isoformat()  # Store when roadmap starts
            }
            
            result = self.client.table("learning_roadmaps").insert(record).execute()
            return result.data[0]["id"]
            
        except Exception as e:
            print(f"Error storing roadmap: {e}")
            raise Exception(f"Failed to store roadmap: {str(e)}")
    
    def get_user_roadmap(self, user_id: str) -> Optional[Dict]:
        """Get user's latest learning roadmap"""
        try:
            result = self.client.table("learning_roadmaps")\
                .select("*")\
                .eq("user_id", user_id)\
                .order("created_at", desc=True)\
                .limit(1)\
                .execute()
            
            if result.data:
                return result.data[0]
            return None
            
        except Exception as e:
            print(f"Error fetching roadmap: {e}")
            return None
    
    def update_progress(self, roadmap_id: str, tech_stack: str, day: int, completed: bool):
        """Update progress for a specific day in the roadmap"""
        try:
            # Get current progress and roadmap data
            result = self.client.table("learning_roadmaps")\
                .select("progress, roadmaps, user_id")\
                .eq("id", roadmap_id)\
                .single()\
                .execute()
            
            current_progress = result.data.get("progress", {})
            roadmaps = result.data.get("roadmaps", [])
            user_id = result.data.get("user_id")
            
            # Update progress for this tech stack and day
            if tech_stack not in current_progress:
                current_progress[tech_stack] = {}
            
            current_progress[tech_stack][str(day)] = completed
            
            # Update in database
            self.client.table("learning_roadmaps")\
                .update({"progress": current_progress})\
                .eq("id", roadmap_id)\
                .execute()
            
            # Check if this tech stack is now 100% complete
            roadmap_data = next((r for r in roadmaps if r.get("tech_stack") == tech_stack), None)
            if roadmap_data:
                daily_plan = roadmap_data.get("daily_plan", [])
                total_days = len(daily_plan)
                completed_days = sum(1 for v in current_progress.get(tech_stack, {}).values() if v)
                
                # If 100% complete, add skill to user's resume
                if total_days > 0 and completed_days == total_days:
                    self._add_skill_to_resume(user_id, tech_stack)
            
            return True
        except Exception as e:
            print(f"Error updating progress: {e}")
            return False
    
    def _add_skill_to_resume(self, user_id: str, skill: str):
        """Add completed skill to user's resume"""
        try:
            # Get user's resume
            result = self.client.table("resumes")\
                .select("data")\
                .eq("user_id", user_id)\
                .order("created_at", desc=True)\
                .limit(1)\
                .execute()
            
            if result.data:
                resume_data = result.data[0]["data"]
                
                # Initialize skills structure if it doesn't exist
                if "skills" not in resume_data:
                    resume_data["skills"] = {"technical": [], "tools": [], "domain": []}
                
                # Add to technical skills if not already there
                technical_skills = resume_data["skills"].get("technical", [])
                if skill not in technical_skills:
                    technical_skills.append(skill)
                    resume_data["skills"]["technical"] = technical_skills
                    
                    # Update resume in database
                    self.client.table("resumes")\
                        .update({"data": resume_data})\
                        .eq("user_id", user_id)\
                        .execute()
                    
                    print(f"Added skill '{skill}' to user {user_id}'s resume")
        except Exception as e:
            print(f"Error adding skill to resume: {e}")
    
    def get_active_roadmap(self, user_id: str) -> Optional[Dict]:
        """Get user's active learning roadmap"""
        try:
            result = self.client.table("learning_roadmaps")\
                .select("*")\
                .eq("user_id", user_id)\
                .eq("is_active", True)\
                .order("last_accessed", desc=True)\
                .limit(1)\
                .execute()
            
            if result.data:
                return result.data[0]
            return None
        except Exception as e:
            print(f"Error fetching active roadmap: {e}")
            return None
    
    def get_calendar_events(self, user_id: str, month: int, year: int) -> List[Dict]:
        """Get calendar events for a specific month"""
        try:
            from datetime import datetime, timedelta
            
            # Get all active roadmaps
            result = self.client.table("learning_roadmaps")\
                .select("*")\
                .eq("user_id", user_id)\
                .eq("is_active", True)\
                .execute()
            
            events = []
            for roadmap_data in result.data:
                roadmaps = roadmap_data.get("roadmaps", [])
                progress = roadmap_data.get("progress", {})
                
                # Get start date (when roadmap was created)
                start_date_str = roadmap_data.get("start_date") or roadmap_data.get("created_at")
                if start_date_str:
                    start_date = datetime.fromisoformat(start_date_str.replace('Z', '+00:00')).date()
                else:
                    start_date = datetime.now().date()
                
                for roadmap in roadmaps:
                    tech_stack = roadmap.get("tech_stack")
                    daily_plan = roadmap.get("daily_plan", [])
                    projects = roadmap.get("projects", [])
                    
                    # Add daily tasks with actual calendar dates
                    for day_info in daily_plan:
                        day_num = day_info.get("day")
                        # Calculate actual calendar date: start_date + (day_num - 1) days
                        actual_date = start_date + timedelta(days=day_num - 1)
                        
                        # Only include if this date is in the requested month/year
                        if actual_date.month == month and actual_date.year == year:
                            is_completed = progress.get(tech_stack, {}).get(str(day_num), False)
                            
                            events.append({
                                "roadmap_id": roadmap_data["id"],
                                "tech_stack": tech_stack,
                                "day": actual_date.day,  # Calendar day (1-31)
                                "roadmap_day": day_num,  # Roadmap day (1-7, etc.)
                                "date": actual_date.isoformat(),
                                "title": day_info.get("title"),
                                "type": "task",
                                "completed": is_completed,
                                "estimated_hours": day_info.get("estimated_hours", 0)
                            })
                    
                    # Add project events with actual dates
                    for project in projects:
                        # Parse day range (e.g., "Days 3-5" -> days 3 to 5)
                        day_range = project.get("day_range", "")
                        if day_range:
                            try:
                                # Extract numbers from "Days X-Y" or "Day X"
                                import re
                                numbers = re.findall(r'\d+', day_range)
                                if numbers:
                                    project_day = int(numbers[0])
                                    project_date = start_date + timedelta(days=project_day - 1)
                                    
                                    if project_date.month == month and project_date.year == year:
                                        events.append({
                                            "roadmap_id": roadmap_data["id"],
                                            "tech_stack": tech_stack,
                                            "day": project_date.day,
                                            "date": project_date.isoformat(),
                                            "title": project.get("title"),
                                            "type": "project",
                                            "day_range": day_range,
                                            "estimated_hours": project.get("estimated_hours", 0)
                                        })
                            except:
                                pass
            
            return events
        except Exception as e:
            print(f"Error fetching calendar events: {e}")
            return []
    
    def delete_roadmap(self, roadmap_id: str) -> bool:
        """Delete a roadmap by ID"""
        try:
            self.client.table("learning_roadmaps")\
                .delete()\
                .eq("id", roadmap_id)\
                .execute()
            return True
        except Exception as e:
            print(f"Error deleting roadmap: {e}")
            return False
