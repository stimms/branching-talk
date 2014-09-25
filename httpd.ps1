
[CmdletBinding()]
param(
    [string]$Root = '.',
    [int]$Port = 8080,
    [string]$HostName = 'localhost'
)

$ErrorActionPreference = 'Stop'

$Here = Split-Path $MyInvocation.MyCommand.Path
$Root = $PSCmdlet.GetUnresolvedProviderPathFromPSPath($Root)
if (![System.IO.Directory]::Exists($Root)) {Write-Error "Missing directory '$Root'."}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://${HostName}:${Port}/")

Write-Output "Start $(@($listener.Prefixes)[0]) at $Root"
$listener.Start()

Write-Output 'Enter Ctrl-Break to stop.'
for() {
    $context = $listener.GetContext()
    $url = $context.Request.Url.LocalPath.TrimStart('/')
    Write-Output "Getting $url"

    $res = $context.Response
    try {
        # first try root
        $path = Join-Path $Root $url
        if (![System.IO.File]::Exists($path)) {
            # second try here
            $path = Join-Path $Here $url
            if (![System.IO.File]::Exists($path)) {
                Write-Output "Missing $url"
                $res.StatusCode = 404
                continue
            }
        }

        Write-Output "Reading $path"
        $content = [IO.File]::ReadAllBytes($path)
        $res.OutputStream.Write($content, 0, $content.Length)
    }
    finally {
        $res.Close()
    }
}
