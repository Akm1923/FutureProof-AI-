import json
from groq import Groq
from typing import List, Dict
from duckduckgo_search import DDGS

class RoadmapGenerator:
    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile"
    
    def web_search_technologies(self, interests: List[str]) -> List[str]:
        """Search web for latest technologies related to interests"""
        try:
            ddgs = DDGS()
            search_query = f"{' '.join(interests)} latest technologies tools frameworks 2026"
            results = ddgs.text(search_query, max_results=10)
            
            # Extract technology names from search results
            tech_mentions = []
            for result in results:
                content = result.get('body', '') + ' ' + result.get('title', '')
                tech_mentions.append(content)
            
            return tech_mentions
        except Exception as e:
            print(f"Web search error: {e}")
            return []
    
    async def suggest_techstacks(self, interests: List[str], user_skills: List[str] = None) -> List[Dict]:
        """Generate comprehensive tech stack suggestions with web search"""
        
        # Get web search results for latest tech
        web_results = self.web_search_technologies(interests)
        web_context = "\n".join(web_results[:5]) if web_results else ""
        
        user_skills_str = ", ".join(user_skills) if user_skills else "None"
        
        prompt = f"""Based on user interests: {', '.join(interests)}

User's existing skills: {user_skills_str}

Latest industry trends (from web search):
{web_context}

Generate 15-20 comprehensive technology recommendations covering:
- Core frameworks and libraries
- Cloud platforms (AWS, Azure, GCP)
- Databases (SQL, NoSQL, Vector DBs like Redis, Pinecone)
- AI/ML tools (LangChain, LangGraph, CrewAI, AutoGen)
- DevOps tools (Docker, Kubernetes, CI/CD)
- MCP servers and agentic frameworks
- Memory systems and caching
- API technologies
- Monitoring and observability tools

For EACH technology, provide:
- name: Technology name
- description: Clear 1-2 sentence description
- category: One of [AI/ML, Backend, Frontend, Cloud, Database, DevOps, Tools, Framework]
- difficulty: beginner, intermediate, or advanced
- relevance_score: 1-10 based on user interests
- already_known: true if user already has this skill, false otherwise
- prerequisites: List of 2-3 prerequisite skills
- use_cases: 2-3 real-world use cases

Return ONLY valid JSON array. Be comprehensive and include cutting-edge technologies.

Example format:
[
  {{
    "name": "LangGraph",
    "description": "Framework for building stateful, multi-actor applications with LLMs using graph-based workflows",
    "category": "AI/ML",
    "difficulty": "intermediate",
    "relevance_score": 10,
    "already_known": false,
    "prerequisites": ["Python", "LangChain", "Graph Theory"],
    "use_cases": ["Multi-agent systems", "Complex AI workflows", "Stateful chatbots"]
  }}
]"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert tech advisor with deep knowledge of latest technologies, frameworks, and industry trends. Provide comprehensive, actionable recommendations."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=4000
            )
            
            content = response.choices[0].message.content.strip()
            
            # Extract JSON
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            suggestions = json.loads(content)
            
            # Mark skills user already has
            if user_skills:
                user_skills_lower = [s.lower() for s in user_skills]
                for tech in suggestions:
                    tech_name_lower = tech['name'].lower()
                    # Exact match or very close match only
                    tech['already_known'] = tech_name_lower in user_skills_lower or any(
                        tech_name_lower == skill.lower() for skill in user_skills
                    )
            
            return suggestions
            
        except Exception as e:
            print(f"Error generating suggestions: {e}")
            return self._get_fallback_suggestions()
    
    def _get_fallback_suggestions(self) -> List[Dict]:
        """Fallback comprehensive suggestions"""
        return [
            {"name": "LangChain", "description": "Framework for LLM applications", "category": "AI/ML", "difficulty": "intermediate", "relevance_score": 9, "already_known": False, "prerequisites": ["Python", "APIs"], "use_cases": ["Chatbots", "RAG systems"]},
            {"name": "LangGraph", "description": "Stateful multi-actor LLM applications", "category": "AI/ML", "difficulty": "advanced", "relevance_score": 10, "already_known": False, "prerequisites": ["LangChain", "Graph Theory"], "use_cases": ["Multi-agent systems", "Complex workflows"]},
            {"name": "CrewAI", "description": "Framework for orchestrating AI agents", "category": "AI/ML", "difficulty": "intermediate", "relevance_score": 9, "already_known": False, "prerequisites": ["Python", "LLMs"], "use_cases": ["Agent collaboration", "Task automation"]},
            {"name": "Redis", "description": "In-memory data store for caching and real-time apps", "category": "Database", "difficulty": "beginner", "relevance_score": 8, "already_known": False, "prerequisites": ["Databases", "Caching concepts"], "use_cases": ["Session storage", "Real-time analytics"]},
            {"name": "AWS", "description": "Amazon Web Services cloud platform", "category": "Cloud", "difficulty": "intermediate", "relevance_score": 9, "already_known": False, "prerequisites": ["Cloud concepts", "Linux"], "use_cases": ["Hosting", "Serverless", "ML deployment"]},
            {"name": "Azure", "description": "Microsoft cloud computing platform", "category": "Cloud", "difficulty": "intermediate", "relevance_score": 8, "already_known": False, "prerequisites": ["Cloud concepts"], "use_cases": ["Enterprise apps", "AI services"]},
            {"name": "Docker", "description": "Containerization platform", "category": "DevOps", "difficulty": "beginner", "relevance_score": 9, "already_known": False, "prerequisites": ["Linux basics"], "use_cases": ["App deployment", "Microservices"]},
            {"name": "Kubernetes", "description": "Container orchestration system", "category": "DevOps", "difficulty": "advanced", "relevance_score": 8, "already_known": False, "prerequisites": ["Docker", "Networking"], "use_cases": ["Scaling", "Production deployment"]},
            {"name": "MCP Servers", "description": "Model Context Protocol for AI integrations", "category": "AI/ML", "difficulty": "intermediate", "relevance_score": 10, "already_known": False, "prerequisites": ["APIs", "LLMs"], "use_cases": ["Tool integration", "Agent systems"]},
            {"name": "Vector Databases", "description": "Databases optimized for embeddings", "category": "Database", "difficulty": "intermediate", "relevance_score": 9, "already_known": False, "prerequisites": ["Databases", "Embeddings"], "use_cases": ["Semantic search", "RAG"]},
            {"name": "FastAPI", "description": "Modern Python web framework", "category": "Backend", "difficulty": "beginner", "relevance_score": 8, "already_known": False, "prerequisites": ["Python", "REST APIs"], "use_cases": ["APIs", "Microservices"]},
            {"name": "React", "description": "JavaScript library for UIs", "category": "Frontend", "difficulty": "intermediate", "relevance_score": 7, "already_known": False, "prerequisites": ["JavaScript", "HTML/CSS"], "use_cases": ["Web apps", "SPAs"]},
        ]
    
    async def generate_roadmap(self, tech_stack: str, duration_days: int, skill_level: str, user_skills: List[str] = None) -> Dict:
        """Generate detailed DAY-BY-DAY learning roadmap with projects"""
        
        user_skills_context = f"\nUser already knows: {', '.join(user_skills)}" if user_skills else ""
        
        prompt = f"""Create a detailed day-by-day learning roadmap for {tech_stack}.

Duration: {duration_days} days
User's skill level: {skill_level}{user_skills_context}

IMPORTANT: Return ONLY valid JSON. Use simple descriptions without complex quotes or special characters.

Create a {duration_days}-day learning plan with:
- Daily breakdown with specific tasks
- Hands-on exercises and projects
- Clear learning objectives
- Resource recommendations
- Milestone checkpoints

Return valid JSON with this structure:
{{
  "tech_stack": "{tech_stack}",
  "duration_days": {duration_days},
  "skill_level": "{skill_level}",
  "overview": "Brief overview of what the learner will master",
  "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
  "daily_plan": [
    {{
      "day": 1,
      "title": "Day 1: Setup and Introduction",
      "focus": "Getting started with the basics",
      "topics": [
        "Setting up development environment and installing required tools",
        "Understanding core concepts and why this technology is useful",
        "Running your first example to verify everything works"
      ],
      "learning_objectives": [
        "Have a working development environment",
        "Understand the fundamental concepts"
      ],
      "hands_on_tasks": [
        "Install and configure the technology",
        "Run a hello world example",
        "Explore the official documentation"
      ],
      "practice_exercises": [
        "Modify the example to add custom functionality",
        "Experiment with different configurations"
      ],
      "resources": [
        "Official documentation",
        "Getting started tutorial"
      ],
      "estimated_hours": 3,
      "checkpoint": "You should have the technology installed and running with a basic understanding of its purpose"
    }}
  ],
  "projects": [
    {{
      "day_range": "Days 3-5",
      "title": "Mini Project: Build a Simple Application",
      "description": "Apply what you learned to create a functional project",
      "objectives": ["Apply core concepts", "Build something real"],
      "technologies_used": ["Tech 1", "Tech 2"],
      "estimated_hours": 6
    }}
  ],
  "capstone_project": {{
    "title": "Final Project: Comprehensive Application",
    "description": "Build a complete application showcasing all learned skills",
    "features": ["Feature 1", "Feature 2", "Feature 3"],
    "technologies": ["All technologies learned"],
    "estimated_hours": 15,
    "deliverables": ["Working application", "Documentation", "Deployment"]
  }},
  "milestones": [
    {{
      "day": 5,
      "title": "Milestone 1: Fundamentals Complete",
      "achievement": "You have mastered the basics and built your first project"
    }}
  ],
  "resources": {{
    "documentation": ["Official docs"],
    "tutorials": ["Tutorial links"],
    "videos": ["Video courses"],
    "books": ["Recommended books"],
    "communities": ["Community links"]
  }},
  "next_steps": [
    "Explore advanced topics",
    "Build more complex projects",
    "Join the community"
  ]
}}

Make descriptions clear and actionable. Keep it professional but encouraging."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a passionate, encouraging technical educator who makes learning exciting and approachable. Write in a warm, conversational tone that motivates learners. Explain concepts clearly with real-world context and analogies. Make technical topics feel accessible and fun! CRITICAL: Always return valid JSON with properly escaped quotes and newlines."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,  # Reduced from 0.8 for more consistent JSON
                max_tokens=4000,
                response_format={"type": "json_object"}  # Force JSON mode
            )
            
            content = response.choices[0].message.content.strip()
            
            # Extract JSON if wrapped in code blocks
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            # Try to parse JSON
            try:
                roadmap = json.loads(content)
            except json.JSONDecodeError as json_err:
                print(f"JSON parsing error: {json_err}")
                print(f"Content preview: {content[:500]}...")
                # Try to fix common JSON issues
                import re
                # Remove any trailing commas before closing brackets
                content = re.sub(r',(\s*[}\]])', r'\1', content)
                roadmap = json.loads(content)
            
            return roadmap
            
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON from AI response: {e}")
            print(f"Response content: {content[:1000]}...")
            raise Exception(f"AI returned invalid JSON format. Please try again.")
        except Exception as e:
            print(f"Error generating roadmap: {e}")
            raise Exception(f"Failed to generate roadmap: {str(e)}")
