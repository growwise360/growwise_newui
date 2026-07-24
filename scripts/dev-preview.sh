#!/usr/bin/env bash
# Stable local preview: kill all servers, clean, production build, next start (no HMR).
set -euo pipefail
cd "$(dirname "$0")/.."

bash scripts/dev-kill.sh

rm -rf .next node_modules/.cache

echo "==> Production build..."
npm run build

echo "==> Starting http://localhost:3000 (next start)..."
exec npx next start -p 3000
