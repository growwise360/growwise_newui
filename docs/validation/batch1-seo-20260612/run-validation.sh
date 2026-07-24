#!/bin/bash
set -euo pipefail

EVID="$(dirname "$0")"
BASE="${BASE:-http://localhost:3000}"

echo "Validation BASE=$BASE" | tee "$EVID/validation-log.txt"

# --- 404 checks ---
{
  echo "=== HARD 404 (DEV) ==="
  for path in /random-test-url /abc123 /academic/not-real-page; do
    echo "--- $path ---"
    /usr/bin/curl -sI "$BASE$path" | /usr/bin/grep -iE 'HTTP|content-type'
    body=$(/usr/bin/curl -s "$BASE$path")
    echo "$body" | head -c 300
    echo ""
    if echo "$body" | /usr/bin/grep -qi "Page not found"; then echo "HAS: Page not found"; fi
    if echo "$body" | /usr/bin/grep -qi "K-12 Online Tutoring"; then echo "HAS: Homepage title (BAD)"; else echo "NO homepage title"; fi
    echo ""
  done
} > "$EVID/404-checks.txt"

# --- Sitemap ---
/usr/bin/curl -sI "$BASE/sitemap.xml" | /usr/bin/grep -iE 'HTTP|content-type' > "$EVID/sitemap-headers.txt"
/usr/bin/curl -s "$BASE/sitemap.xml" > "$EVID/sitemap-index.xml"
/usr/bin/curl -s "$BASE/sitemap-pages.xml" > "$EVID/sitemap-pages.xml"
/usr/bin/curl -s "$BASE/sitemap-blogs.xml" > "$EVID/sitemap-blogs.xml"

# --- Robots + llms ---
/usr/bin/curl -s "$BASE/robots.txt" > "$EVID/robots.txt"
/usr/bin/curl -sI "$BASE/robots.txt" | /usr/bin/grep -iE 'HTTP|content-type' > "$EVID/robots-headers.txt"
/usr/bin/curl -s "$BASE/llms.txt" > "$EVID/llms.txt"
/usr/bin/curl -sI "$BASE/llms.txt" | /usr/bin/grep -iE 'HTTP|content-type' > "$EVID/llms-headers.txt"

# --- OG image ---
/usr/bin/curl -sI "$BASE/og-image.jpg" > "$EVID/og-image-headers.txt"

# --- Internal link static audit ---
cd "$(dirname "$0")/../../.."
/usr/bin/grep -rn "academic/reading\|math-tutoring-dublin-ca/elementary" src/ public/ --include='*.tsx' --include='*.ts' --include='*.json' 2>/dev/null > "$EVID/static-link-audit.txt" || true
if [ ! -s "$EVID/static-link-audit.txt" ]; then echo "ZERO matches for deprecated paths" > "$EVID/static-link-audit.txt"; fi

# --- Metadata rendered ---
check_meta() {
  local path="$1"
  html=$(/usr/bin/curl -s "$BASE$path")
  echo "URL: $BASE$path"
  echo "$html" | /usr/bin/grep -o '<title>[^<]*</title>' | head -1
  echo "$html" | /usr/bin/grep -oi 'name="description"[^>]*content="[^"]*"' | head -1
  echo "$html" | /usr/bin/grep -oi 'rel="canonical"[^>]*href="[^"]*"' | head -1
  echo "$html" | /usr/bin/grep -oi 'property="og:title"[^>]*content="[^"]*"' | head -1
  echo "$html" | /usr/bin/grep -oi 'property="og:description"[^>]*content="[^"]*"' | head -1
  echo "$html" | /usr/bin/grep -oi 'property="og:image"[^>]*content="[^"]*"' | head -1
  echo "---"
}

{
  for p in / /readinesschecklist /academic/english /workshop-calendar /resources/tutoring-dublin-ca /enroll /game-dev /camps/academic-summer-programs-dublin-ca /camps/winter/calendar; do
    check_meta "$p"
  done
} > "$EVID/metadata-rendered.txt"

# --- Content check ---
check_content() {
  local path="$1"
  html=$(/usr/bin/curl -s "$BASE$path")
  h1=$(echo "$html" | /usr/bin/grep -oi '<h1[^>]*>[^<]*</h1>' | head -3 | tr '\n' ' ')
  words=$(echo "$html" | sed 's/<[^>]*>//g' | wc -w | tr -d ' ')
  echo "$path | H1: $h1 | words: $words"
}

{
  for p in /enroll /game-dev /camps/academic-summer-programs-dublin-ca /camps/winter/calendar; do
    check_content "$p"
  done
} > "$EVID/content-check.txt"

# --- Readiness redirect ---
{
  for path in /readinesschecklist /resources/readiness-checklist; do
    echo "=== $path ==="
    /usr/bin/curl -sI -L "$BASE$path" | /usr/bin/grep -iE 'HTTP|location'
    /usr/bin/curl -s "$BASE$path" | /usr/bin/grep -oi 'rel="canonical"[^>]*href="[^"]*"' | head -1
    echo ""
  done
} > "$EVID/readiness-redirect.txt"

# --- JSON-LD extract ---
{
  for p in / /readinesschecklist /camps/summer /academic/math /workshop-calendar; do
    echo "=== $p ==="
    /usr/bin/curl -s "$BASE$p" | /usr/bin/grep -o '<script type="application/ld+json">[^<]*</script>' | head -2
    echo ""
  done
} > "$EVID/jsonld-extract.txt"

# --- Sitemap analysis ---
{
  echo "=== Index structure ==="
  /usr/bin/grep -c 'sitemapindex' "$EVID/sitemap-index.xml" || echo "0"
  echo "=== Pages urlset ==="
  /usr/bin/grep -c 'urlset' "$EVID/sitemap-pages.xml" || echo "0"
  echo "=== Blogs urlset ==="
  /usr/bin/grep -c 'urlset' "$EVID/sitemap-blogs.xml" || echo "0"
  echo "=== www in sitemaps ==="
  /usr/bin/grep 'www\.' "$EVID/sitemap-"*.xml || echo "none"
  echo "=== /resources in pages ==="
  /usr/bin/grep -c '/resources</loc>' "$EVID/sitemap-pages.xml" || echo "0"
  echo "=== /resources in blogs ==="
  /usr/bin/grep -c '/resources</loc>' "$EVID/sitemap-blogs.xml" || echo "0"
  echo "=== readinesschecklist in sitemap ==="
  /usr/bin/grep 'readiness' "$EVID/sitemap-"*.xml || echo "none"
  echo "=== Duplicate URLs ==="
  /usr/bin/grep -oh '<loc>[^<]*</loc>' "$EVID/sitemap-pages.xml" "$EVID/sitemap-blogs.xml" | sort | uniq -d
} > "$EVID/sitemap-analysis.txt"

echo "Validation complete" >> "$EVID/validation-log.txt"
