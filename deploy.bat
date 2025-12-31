@echo off
setlocal enabledelayedexpansion

REM GitHub Pages Deployment Script for SvelteKit (Windows)
REM This script builds and deploys your SvelteKit site to GitHub Pages

echo 🚀 Starting GitHub Pages deployment...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not in a git repository. Please run this script from your project root.
    exit /b 1
)

REM Check if gh-pages is installed
npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing gh-pages...
    npm install --save-dev gh-pages
)

REM Get the current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo 📍 Current branch: !CURRENT_BRANCH!

REM Check for uncommitted changes
git status --porcelain | findstr . >nul
if not errorlevel 1 (
    echo ⚠️  Warning: You have uncommitted changes. Consider committing them first.
    set /p "REPLY=Continue anyway? (y/N): "
    if /i not "!REPLY!"=="y" (
        echo ❌ Deployment cancelled.
        exit /b 1
    )
)

REM Build the site
echo 🔨 Building the site...
npm run build

if errorlevel 1 (
    echo ❌ Build failed. Please fix the errors and try again.
    exit /b 1
)

REM Deploy to GitHub Pages
echo 📤 Deploying to GitHub Pages...
npx gh-pages -d build -t true

if errorlevel 1 (
    echo ❌ Deployment failed. Please check the error messages above.
    exit /b 1
) else (
    echo ✅ Deployment successful!
    echo 🌐 Your site will be available at your GitHub Pages URL
    echo 📝 Note: It may take a few minutes for changes to appear.
)

echo 🎉 Done!
pause