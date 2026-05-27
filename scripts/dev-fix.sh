#!/usr/bin/env bash
# Stop ALL Next instances for this repo, clear .next, start exactly one webpack dev server.
set -euo pipefail
cd "$(dirname "$0")/.."

bash scripts/dev-kill.sh

echo "==> Clearing .next and caches..."
rm -rf .next node_modules/.cache

echo "==> Starting ONE dev server (webpack) at http://localhost:3000"
echo "    If you still see 500/ENOENT, use: npm run dev:preview"
exec npx next dev --webpack
