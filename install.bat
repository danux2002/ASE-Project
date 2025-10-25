@echo off
echo Installing Software Engineering Workbench...
echo.

echo Installing Backend Dependencies...
cd Backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Frontend Dependencies...
cd ..\Frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
echo IMPORTANT: Please add your Gemini API key to Backend\.env file
echo Visit: https://makersuite.google.com/app/apikey to get your API key
echo.
echo To start the application:
echo 1. Run 'start-backend.bat' to start the backend server
echo 2. Run 'start-frontend.bat' to start the frontend server
echo.
pause