#!/usr/bin/env bash
# Playwright webServer for local E2E.
# - next start when .next/BUILD_ID exists (stable, CI-like)
# - next dev when no build (starts immediately, no 5-min build wait)
# - E2E_USE_DEV=1 always forces dev; E2E_USE_PROD=1 requires a prior build
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ "${E2E_USE_DEV:-}" == "1" ]]; then
  echo "[e2e] Starting next dev..."
  exec npm run dev
fi

if [[ "${E2E_USE_PROD:-}" == "1" && ! -f .next/BUILD_ID ]]; then
  echo "[e2e] ERROR: E2E_USE_PROD=1 but no production build. Run: npm run build" >&2
  exit 1
fi

if [[ -f .next/BUILD_ID ]]; then
  echo "[e2e] Starting next start..."
  exec npm run start
fi

echo "[e2e] No .next/BUILD_ID — starting next dev (run npm run build for production E2E)"
exec npm run dev
