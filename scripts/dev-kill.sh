#!/usr/bin/env bash
# Kill every Next dev/start process tied to this repo and free ports 3000–3002.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "Killing processes on ports 3000–3002..."
lsof -ti:3000,3001,3002 2>/dev/null | xargs kill -9 2>/dev/null || true

echo "Killing next dev / start for ${ROOT}..."
pkill -9 -f "${ROOT}/node_modules/.bin/next dev" 2>/dev/null || true
pkill -9 -f "${ROOT}/node_modules/.bin/next start" 2>/dev/null || true
pkill -9 -f "next dev --turbo" 2>/dev/null || true
pkill -9 -f "next dev --webpack" 2>/dev/null || true
pkill -9 -f "npm exec next dev" 2>/dev/null || true

sleep 2

if pgrep -fl "next dev" 2>/dev/null | grep -q growwise_newui; then
  echo "Still running:"
  pgrep -fl "next dev" 2>/dev/null | grep growwise_newui || true
  exit 1
fi

echo "Done. Ports clear. Run: npm run dev:fix  OR  npm run dev:preview"
