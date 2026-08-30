@echo off
cd /d "%~dp0"
where python >nul 2>&1
if errorlevel 1 (echo Python is required for this local PWA server.&pause&exit /b 1)
start "" http://localhost:8765/index.html
python -m http.server 8765
