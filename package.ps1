$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $root "dist"
$unpacked = Join-Path $dist "unpacked"
$zipName = "fbclid-cleaner-0.2.0.zip"
$zipPath = Join-Path $dist $zipName

if (-not (Test-Path $dist)) {
  New-Item -ItemType Directory -Path $dist | Out-Null
}

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

$files = @(
  "manifest.json",
  "rules-safe.json",
  "rules-strict.json",
  "background.js",
  "popup.html",
  "popup.css",
  "popup.js",
  "README.md"
)

if (Test-Path $unpacked) {
  Remove-Item $unpacked -Recurse -Force
}
New-Item -ItemType Directory -Path $unpacked | Out-Null

foreach ($file in $files) {
  Copy-Item (Join-Path $root $file) -Destination (Join-Path $unpacked $file) -Force
}

Compress-Archive -Path (Join-Path $unpacked "*") -DestinationPath $zipPath -CompressionLevel Optimal

Write-Output "Created zip: $zipPath"
Write-Output "Created unpacked folder: $unpacked"
