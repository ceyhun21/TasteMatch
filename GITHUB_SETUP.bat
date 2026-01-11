@echo off
REM GitHub Setup Script für TasteMatch
REM Führt automatisch Git Init und Remote Setup durch

setlocal enabledelayedexpansion

echo.
echo ==================================================================
echo   TASTEMATCH - GITHUB SETUP SCRIPT
echo ==================================================================
echo.

REM Farben definieren
echo Initializing TasteMatch Git Repository...
echo.

REM 1. Git überprüfen
echo [1/5] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git ist nicht installiert!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Git found: 
git --version
echo.

REM 2. Repository-Status überprüfen
echo [2/5] Checking repository status...
if exist .git (
    echo ⚠ Git repository already exists.
    echo Current status:
    git status
    echo.
    set /p continue="Continue with push? (y/n): "
    if /i not "!continue!"=="y" (
        echo Abgebrochen.
        pause
        exit /b 0
    )
) else (
    echo ✓ Initializing new repository...
    git init
    echo.
)

REM 3. Git Config
echo [3/5] Configuring Git...
echo.
set /p gitname="Enter your GitHub username (or name): "
set /p gitemail="Enter your GitHub email: "

git config user.name "!gitname!"
git config user.email "!gitemail!"
echo ✓ Git configured
echo.

REM 4. Remote Setup
echo [4/5] Setting up GitHub remote...
echo.
echo Your GitHub URL should be:
echo https://github.com/[YOUR_USERNAME]/tastematch.git
echo.
set /p giturl="Enter your GitHub repository URL: "

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo Removing existing remote...
    git remote remove origin
)

git remote add origin !giturl!
echo ✓ Remote added:
git remote -v
echo.

REM 5. .gitignore
echo [5/5] Creating .gitignore...
(
echo # Dependencies
echo node_modules/
echo npm-debug.log
echo yarn-error.log
echo package-lock.json
echo.
echo # Environment
echo .env
echo .env.local
echo.env.*.local
echo.
echo # Build
echo dist/
echo build/
echo *.tsbuildinfo
echo.
echo # IDE
echo .vscode/
echo .idea/
echo *.swp
echo.
echo # OS
echo Thumbs.db
echo .DS_Store
echo.
echo # Firebase
echo .firebaserc
echo firebase-debug.log
echo.
echo # Testing
echo coverage/
echo.
echo # Temp
echo *.tmp
echo *.temp
) > .gitignore
echo ✓ .gitignore created
echo.

REM 6. Git Add & Commit
echo.
echo ================================================
echo Git Status:
echo ================================================
git status
echo.
echo.
set /p doadd="Add all files? (y/n): "
if /i "!doadd!"=="y" (
    git add .
    echo.
    set /p commitmsg="Enter commit message (default: 'Initial commit'): "
    if "!commitmsg!"=="" set commitmsg=Initial commit: TasteMatch v1.0.0
    
    git commit -m "!commitmsg!"
    echo ✓ Commit created
    echo.
)

REM 7. Branch Management
echo [Branch Management]
echo.
git branch
echo.
set /p rebrand="Rename master to main? (y/n): "
if /i "!rebrand!"=="y" (
    git branch -M main
    echo ✓ Branch renamed to 'main'
    echo.
)

REM 8. Final Push
echo.
echo ================================================
echo Ready to push to GitHub!
echo ================================================
echo.
git log -1 --oneline
echo.
set /p dopush="Push to GitHub now? (y/n): "
if /i "!dopush!"=="y" (
    echo Pushing to GitHub...
    git push -u origin main
    if %errorlevel% equ 0 (
        echo.
        echo ✓✓✓ Successfully pushed to GitHub! ✓✓✓
        echo.
        echo Your repository: !giturl!
        echo.
    ) else (
        echo.
        echo ⚠ Push failed. Please check:
        echo - GitHub URL is correct
        echo - Authentication (Personal Access Token)
        echo - Internet connection
        echo.
        echo Try manually:
        echo   git push -u origin main
        echo.
    )
) else (
    echo Push abgebrochen.
    echo.
    echo Später manuell pushen:
    echo   git push -u origin main
    echo.
)

REM 9. Summary
echo.
echo ================================================
echo SUMMARY
echo ================================================
echo.
echo Git Config:
git config user.name
git config user.email
echo.
echo Remote:
git remote -v
echo.
echo Branches:
git branch -a
echo.
echo Recent Commits:
git log -3 --oneline
echo.
echo ================================================
echo.
echo Nächste Schritte:
echo.
echo 1. Repository auf GitHub überprüfen:
echo    https://github.com/[YOUR_USERNAME]/tastematch
echo.
echo 2. Optional: GitHub Actions für Auto-Deploy
echo    siehe: GITHUB_SETUP.md
echo.
echo 3. Optional: Branch Protection aktivieren
echo    https://github.com/[YOUR_USERNAME]/tastematch/settings/branches
echo.
echo ================================================
echo.
pause
