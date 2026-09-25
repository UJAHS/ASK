# ASK Community Portal - copy supplied gallery photos
$ErrorActionPreference = "Stop"

Set-Location "D:\Projects\ASK\ask-community-portal"

$source = Join-Path (Get-Location) "incoming-gallery"
$target = Join-Path (Get-Location) "public\community-gallery"

if (-not (Test-Path -LiteralPath $source)) {
    throw "Create .\incoming-gallery and place the 9 supplied JPEG files there first."
}

New-Item -ItemType Directory -Force -Path $target | Out-Null

Get-ChildItem -LiteralPath $source -File -Filter "*.jpeg" |
    Copy-Item -Destination $target -Force

Write-Host ""
Write-Host "Gallery assets copied to:" -ForegroundColor Green
Write-Host $target -ForegroundColor Green
Write-Host ""
Get-ChildItem -LiteralPath $target -File | Select-Object Name, Length
