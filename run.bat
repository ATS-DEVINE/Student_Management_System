@echo off
echo ========================================
echo   Student Management System
echo   Compiling and Running...
echo ========================================
echo.

REM Create bin directory if not exists
if not exist bin mkdir bin

REM Compile SimpleMain (no database required)
echo Compiling Java files...
javac -d bin src\SimpleMain.java

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Compilation failed!
    pause
    exit /b 1
)

echo.
echo Compilation successful!
echo.
echo Running application...
echo.

REM Run the application
java -cp bin SimpleMain

pause
