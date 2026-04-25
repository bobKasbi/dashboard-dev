#!/bin/bash
set -e

echo "[TEST] Installing dependencies..."
npm ci

echo "[TEST] Installing Playwright browsers..."
npx playwright install --with-deps

echo "[TEST] Running E2E tests..."
npm run e2e:ci

echo "[TEST] ✅ E2E tests completed successfully."
