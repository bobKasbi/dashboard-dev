#!/bin/bash
set -e

echo "[TEST] Installing dependencies..."
rm -rf node_modules
npm ci

echo "[TEST] Rebuilding binaries..."
npm rebuild

echo "[TEST] Run unit tests..."
npm run test

echo "[TEST] ✅ Tests completed successfully."
