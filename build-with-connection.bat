@echo off
echo ?? BUILDING WITH CONNECTION API...
echo =================================
echo.

echo 1. Building project...
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
    echo Running debug build...
    call next build --debug-prerender
)

pause
