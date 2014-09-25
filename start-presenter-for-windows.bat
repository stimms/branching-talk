@start /min powershell -NoProfile -ExecutionPolicy unrestricted -Command ". '%~dp0httpd.ps1'"
@start http://localhost:8080/presenter.html
