@echo off
title Scamazon Storefront (Port 8080)
cd /d "%~dp0"
echo ========================================================
echo   Starting Scamazon Storefront & Fulfillment Engine
echo   Port: 8080 (http://localhost:8080)
echo ========================================================
echo.
if not exist node_modules (
    echo Installing dependencies...
    npm install
)
echo.
echo Launching server...
node src/server.js
pause
