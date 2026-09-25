@echo off
REM Build batch script for Windows
REM Runs the Node.js build script

echo.
echo Temp-FE Build Script
echo ====================
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error installing dependencies
        exit /b 1
    )
)

echo Running Next.js build...
echo.

call node build.js
if errorlevel 1 (
    echo Build failed
    exit /b 1
)

echo.
echo Build completed successfully!
echo.
