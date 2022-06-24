@echo off
reg query HKEY_CURRENT_USER\Software\OpenFin\RVM\Settings -v DesktopOwnerSettings 2>nul >nul

if %ERRORLEVEL% EQU 0 (
	echo Warning: You already have a desktop owner settings value as shown below. 
	echo If you choose to overwrite it will set this value, you will need to restore it later.
	echo If you are not sure what this means, please choose No at the prompt below and 
	echo Review https://developers.openfin.co/of-docs/docs/desktop-owner-settings
	echo.
	reg query HKEY_CURRENT_USER\Software\OpenFin\RVM\Settings -v DesktopOwnerSettings

)
reg add "HKCU\Software\OpenFin\RVM\Settings" -v "DesktopOwnerSettings" -d "http://localhost:8080/common/dos.json"
