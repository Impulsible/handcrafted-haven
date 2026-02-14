@echo off
echo Stopping any Node processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM next.exe 2>nul

echo Clearing caches...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo Starting Next.js with webpack...
set NEXT_TURBOPACK_PERSISTENT_CACHING=false
set NODE_OPTIONS=--max-old-space-size=4096
next dev

pause
