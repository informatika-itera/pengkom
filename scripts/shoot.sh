#!/usr/bin/env bash
# Start the dev server on its own port, screenshot a deck, stop the server.
# Usage: scripts/shoot.sh <deck number> <outDir> [indexes]      (env: PORT, QUERY, VIEWPORT, FRAG=0)
set -e
cd "$(dirname "$0")/.."
PORT="${PORT:-8940}"
bunx vite --port "$PORT" --strictPort > /dev/null 2>&1 &
VP=$!
trap 'kill $VP 2>/dev/null' EXIT
for _ in $(seq 1 30); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.5; done
BROWSER_BIN="${BROWSER_BIN:-brave}" node scripts/shot.mjs "http://127.0.0.1:$PORT/pertemuan-$1.html${QUERY:-}" "$2" "${3:-all}"
