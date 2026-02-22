from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from shared.config.settings import settings
from modules.resume.routes import router as resume_router
from modules.roadmap.routes import router as roadmap_router

# Create single unified FastAPI application
app = FastAPI(
    title="FutureProof AI API",
    description="Unified API for Resume Parsing and Learning Roadmap Generation",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register module routes with prefixes
app.include_router(resume_router, prefix="/api/resume", tags=["Resume"])
app.include_router(roadmap_router, prefix="/api/roadmap", tags=["Roadmap"])

@app.get("/")
async def root():
    return {
        "message": "FutureProof AI API",
        "version": "2.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=True
    )
