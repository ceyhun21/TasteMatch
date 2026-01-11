@echo off
REM TasteMatch - Start Script
REM Startet den lokalen HTTP Server und öffnet die App

echo.
echo ====================================
echo   TasteMatch - Restaurant Discovery
echo   🌍 Online: https://tastematch.vercel.app
echo ====================================
echo.

REM Menu
echo Was möchten Sie tun?
echo.
echo 1) App lokal öffnen (Port 8000)
echo 2) Admin-Panel öffnen
echo 3) Deployment-Guide öffnen
echo 4) Beenden
echo.

set /p choice="Wählen Sie eine Option (1-4): "

if "%choice%"=="1" (
    echo Starte App auf Port 8000...
    python --version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Python nicht gefunden!
        echo Bitte installieren Sie Python von https://www.python.org
        pause
        exit /b 1
    )
    start http://localhost:8000
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Öffne Admin-Panel...
    start http://localhost:8000/admin.html
    python -m http.server 8000
) else if "%choice%"=="3" (
    echo Öffne Deployment-Guide...
    start DEPLOY.html
    exit /b 0
) else if "%choice%"=="4" (
    echo Auf Wiedersehen!
    exit /b 0
) else (
    echo Ungültige Eingabe
    pause
    exit /b 1
)

REM Start HTTP Server
echo Starting HTTP Server on port 8000...
cd /d "%~dp0"

REM Kill any existing server on port 8000
taskkill /F /IM python.exe >nul 2>&1

REM Start the server
python -m http.server 8000

pause
