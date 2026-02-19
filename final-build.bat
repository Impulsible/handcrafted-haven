@echo off
echo ?? FINAL BUILD ATTEMPT...
echo ========================
echo.

echo 1. Clearing cache...
if exist .next rmdir /s /q .next
echo ? Cache cleared
echo.

echo 2. Building project...
call pnpm run build

if %errorlevel% equ 0 (
    echo.
    echo ? BUILD SUCCESSFUL!
    echo.
    echo You can now run: pnpm start
) else (
    echo.
    echo ? BUILD FAILED
    echo.
    echo Please run: node debug-search-params.js
    echo This will show any pages still missing Suspense boundaries
)

pause
