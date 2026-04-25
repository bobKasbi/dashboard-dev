#!/bin/sh
set -e  # 👉 stop on first error

MODE="${1:-all}"  # default to "all" if no argument is given

echo "[BUILD] Logging into Docker registry: $CI_REGISTRY"
echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "$CI_REGISTRY"

# ────────────────────────────────────────────────────────────────────────────────
# 🔹 1. BUILD & PUSH MAIN IMAGE
# ────────────────────────────────────────────────────────────────────────────────
build_main_image() {
  echo "[BUILD] Building main image..."
  docker build --no-cache -t "$IMAGE_REPO:$IMAGE_TAG" .
  echo "[BUILD] Pushing main image..."
  docker push "$IMAGE_REPO:$IMAGE_TAG"
}

# ────────────────────────────────────────────────────────────────────────────────
# 🔹 2. BUILD & PUSH INIT IMAGE
# ────────────────────────────────────────────────────────────────────────────────
build_init_image() {
  echo "[INIT] Building dist-only init image from source..."
  INIT_REPO="${IMAGE_REPO%/main}/init"

  # clean any old build output
  rm -rf dist

  echo "[INIT] Installing dependencies..."
  export npm_config_legacy_peer_deps=true
  npm ci --prefer-offline

  echo "[INIT] Running Angular build..."
  npm run build || {
    echo "[INIT] ❌ Angular build failed — check Node version (>=20.19 required)."
    exit 1
  }

  echo "[INIT] Creating Dockerfile for init image..."
  cat > Dockerfile.init <<'EOF'
FROM alpine:3.20
WORKDIR /dist
COPY dist/ .
EOF

  # ✅ TEMPORARILY allow dist in Docker context for init image
  cp .dockerignore .dockerignore.bak
  sed -i '' '/^dist$/d' .dockerignore

  echo "[INIT] Building init image..."
  docker build --no-cache -f Dockerfile.init -t "$INIT_REPO:$IMAGE_TAG" .

  # ✅ Restore original dockerignore
  mv .dockerignore.bak .dockerignore

  echo "[INIT] Pushing init image..."
  docker push "$INIT_REPO:$IMAGE_TAG"

  echo "[INIT] Cleaning temporary files..."
  rm -f Dockerfile.init

  echo "[INIT] ✅ Init image pushed successfully: $INIT_REPO:$IMAGE_TAG"
}

# ────────────────────────────────────────────────────────────────────────────────
# 🔹 Execution logic
# ────────────────────────────────────────────────────────────────────────────────
if [ "$MODE" = "--init-only" ]; then
  build_init_image
elif [ "$MODE" = "--main-only" ]; then
  build_main_image
else
  build_init_image
  build_main_image
fi

echo "[DONE] ✅ Build completed successfully."
