$file = "src/app/marketplace/MarketplaceContent.tsx"
Write-Host "Fixing $file..." -ForegroundColor Green

# Read the file
$content = Get-Content $file -Raw

# 1. Fix missing image property in mockProducts
# This regex looks for the mockProducts array and adds image property to each object
$pattern = '(const mockProducts:?.*?=\s*\[)(.*?)(\];)'
$matches = [regex]::Match($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

if ($matches.Success) {
    $arrayContent = $matches.Groups[2].Value
    
    # Check if image property exists
    if ($arrayContent -notmatch 'image:') {
        Write-Host "Adding image property to mockProducts..." -ForegroundColor Yellow
        
        # Add image property to each product object
        $fixedArray = $arrayContent -replace '(\{)([^}]+)(\})', '$1$2, image: "/images/placeholder.jpg"$3'
        
        # Replace in content
        $content = $content -replace $pattern, ('$1' + $fixedArray + '$3')
    }
}

# 2. Fix date parsing errors (line 641)
$content = $content -replace 'new Date\((\w+)\)(?!\?)', 'new Date($1 ?? new Date())'

# 3. Fix unused parameters (line 1180)
$content = $content -replace '\((\w+),\s*(\w+)\)\s*=>', '(_$1, _$2) =>'

# 4. Comment out unused variables at lines 9 and 14
$lines = $content -split "`n"
if ($lines.Count -gt 8 -and $lines[8] -match 'const safeDate') {
    $lines[8] = "// " + $lines[8]
}
if ($lines.Count -gt 13 -and $lines[13] -match 'const safeFormatDate') {
    $lines[13] = "// " + $lines[13]
}
$content = $lines -join "`n"

# Write back changes
$content | Set-Content $file

Write-Host "Fixes applied!" -ForegroundColor Green
Write-Host "Please verify the changes and run 'npm run typecheck' to confirm" -ForegroundColor Yellow
