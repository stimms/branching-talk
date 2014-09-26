@start /min PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0httpd.ps1"
@start http://localhost:8080/presenter.html
