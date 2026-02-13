#!/bin/bash

# Quick Build Verification Script
# Usage: bash scripts/verify-build.sh

echo "========================================"
echo "🔍 PROGRAMMATIC SEO - BUILD VERIFICATION"
echo "========================================"
echo ""

cd build

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist/ folder not found"
    echo "   Run: npm run build"
    exit 1
fi

echo "✅ dist/ folder exists"
echo ""

# Check critical files
echo "📁 Checking critical files..."

FILES=(
    "dist/index.html"
    "dist/sitemap.xml"
    "dist/robots.txt"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - MISSING!"
    fi
done

echo ""

# Check programmatic page bundles
echo "📦 Checking programmatic page bundles..."

if ls dist/assets/*BankPage*.js 1> /dev/null 2>&1; then
    SIZE=$(du -h dist/assets/*BankPage*.js | cut -f1)
    echo "  ✅ BankPage.js ($SIZE)"
else
    echo "  ❌ BankPage.js - MISSING!"
fi

if ls dist/assets/*EWalletPage*.js 1> /dev/null 2>&1; then
    SIZE=$(du -h dist/assets/*EWalletPage*.js | cut -f1)
    echo "  ✅ EWalletPage.js ($SIZE)"
else
    echo "  ❌ EWalletPage.js - MISSING!"
fi

if ls dist/assets/*UseCasePage*.js 1> /dev/null 2>&1; then
    SIZE=$(du -h dist/assets/*UseCasePage*.js | cut -f1)
    echo "  ✅ UseCasePage.js ($SIZE)"
else
    echo "  ❌ UseCasePage.js - MISSING!"
fi

echo ""

# Count sitemap URLs
echo "🗺️  Checking sitemap..."
URL_COUNT=$(grep -c "<url>" dist/sitemap.xml)
echo "  Total URLs: $URL_COUNT"

if [ "$URL_COUNT" -ge 40 ]; then
    echo "  ✅ Sitemap has sufficient URLs (expected: 44)"
else
    echo "  ⚠️  Sitemap might be incomplete (found: $URL_COUNT, expected: 44)"
fi

echo ""

# Check robots.txt
echo "🤖 Checking robots.txt..."
if grep -q "convert-paypal-ke-" dist/robots.txt; then
    echo "  ✅ Programmatic pages allowed"
else
    echo "  ⚠️  Programmatic pages not found in robots.txt"
fi

if grep -q "Sitemap:" dist/robots.txt; then
    echo "  ✅ Sitemap reference present"
else
    echo "  ❌ Sitemap reference missing"
fi

echo ""

# Bundle size check
echo "📊 Bundle sizes:"
MAIN_JS=$(ls dist/assets/index-*.js 2>/dev/null | head -1)
MAIN_CSS=$(ls dist/assets/index-*.css 2>/dev/null | head -1)

if [ -f "$MAIN_JS" ]; then
    SIZE=$(du -h "$MAIN_JS" | cut -f1)
    echo "  Main JS: $SIZE"
fi

if [ -f "$MAIN_CSS" ]; then
    SIZE=$(du -h "$MAIN_CSS" | cut -f1)
    echo "  Main CSS: $SIZE"
fi

echo ""
echo "========================================"
echo "✅ BUILD VERIFICATION COMPLETE"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Test locally: npm run dev"
echo "  2. Test URLs in browser (see TEST_SEO_PAGES.md)"
echo "  3. Deploy: npm run deploy"
echo ""
