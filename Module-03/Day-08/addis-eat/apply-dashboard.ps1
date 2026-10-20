$ErrorActionPreference = 'Stop'

$projectRoot = $PSScriptRoot
$dbPath = Join-Path $projectRoot 'db.js'

if (-not (Test-Path -LiteralPath $dbPath)) {
  throw "Could not find db.js in '$projectRoot'. Extract this patch directly into the existing Addis Eats project folder, then run this script again."
}

$dbSource = Get-Content -LiteralPath $dbPath -Raw
if ($dbSource -match '(?m)export\s+(?:async\s+)?function\s+getOrders\b' -or $dbSource -match '(?m)export\s+\{[^}]*\bgetOrders\b') {
  Write-Host 'db.js already exports getOrders; no database change needed.' -ForegroundColor Yellow
  return
}

if ($dbSource -notmatch '(?m)^\s*(?:const|let|var)\s+orders\s*=\s*\[') {
  throw "Could not safely identify a top-level orders array in db.js. No changes were made. Find the array used by createOrder() and add the read-only getOrders() export from db-orders-export.txt manually."
}

$addition = @'

/**
 * Read-only order snapshot for the server-rendered dashboard and order list.
 * The application uses an in-memory demo store, so this data is not persistent.
 */
export async function getOrders() {
  return orders.map((order) => ({
    ...order,
    items: Array.isArray(order?.items)
      ? order.items.map((item) => ({ ...item }))
      : [],
  }));
}
'@

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($dbPath, $dbSource.TrimEnd() + $addition + "`r`n", $utf8NoBom)
Write-Host 'Added the read-only getOrders() export to db.js.' -ForegroundColor Green
Write-Host 'Next: run npm run build, then test the verification URLs in DASHBOARD-VERIFICATION.md.'
