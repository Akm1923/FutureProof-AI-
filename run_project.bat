@echo off
echo ========================================
echo   FutureProof AI - Starting Services
echo ========================================
echo.

REM Start Unified Backend (Single FastAPI App)
echo [1/2] Starting Backend API (Port 8000)...
start "Backend API - Port 8000" cmd /k "cd backend\src && python main.py"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend
echo [2/2] Starting Frontend (Port 5173)...
start "Frontend - Port 5173" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo   Backend API:  http://localhost:8000
echo   API Docs:     http://localhost:8000/docs
echo   Frontend:     http://localhost:5173
echo.
echo   Press any key to exit (services will keep running)
echo ========================================
pause > nul
