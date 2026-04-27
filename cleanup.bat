@echo off
echo Cleaning Prefetch and Temp files...

:: Delete Prefetch files (requires admin)
del /q /f /s %SystemRoot%\Prefetch\* 2>nul

:: Delete user temp files
del /q /f /s %TEMP%\* 2>nul

:: Delete Windows temp files
del /q /f /s %SystemRoot%\Temp\* 2>nul

:: Remove empty folders
for /d %%x in (%TEMP%\*) do rd /s /q "%%x" 2>nul
for /d %%x in (%SystemRoot%\Temp\*) do rd /s /q "%%x" 2>nul

echo Done.
pause