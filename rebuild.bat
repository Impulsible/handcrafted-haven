@echo off
echo ?? Rebuilding project...
echo.

echo 1. Installing dependencies...
call pnpm install
echo ? Dependencies installed
echo.

echo 2. Building project...
call pnpm run build

if %errorlevel% equ 0 (
    echo.
    echo ? Build successful!
) else (
    echo.
    echo ? Build failed. Common fixes:
    echo   - Make sure "use client" is first line in all component files
    echo   - Check internet connection for Google Fonts
    echo   - Run: pnpm install --force
)

pause
