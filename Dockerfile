# ----------------------------
# Build stage
# ----------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy only dependency files first (max cache efficiency)
COPY package.json package-lock.json ./

# 2. Install deps (cached unless package files change)
RUN npm ci --prefer-offline --no-audit --progress=false || \
    npm install --legacy-peer-deps --prefer-offline --no-audit --progress=false

# 3. Copy rest of project AFTER deps are installed
COPY . .

# 4. Inject build version (kept after copy to avoid cache break)
ARG APP_VERSION
RUN echo ">>> APP_VERSION RECEIVED BY DOCKER: '${APP_VERSION}'"
RUN echo "Forcing cache break => $APP_VERSION"
RUN sed -i "s|__APP_VERSION__|${APP_VERSION}|g" src/environments/environment.ts && \
    sed -i "s|__APP_VERSION__|${APP_VERSION}|g" src/environments/environment.prod.ts

# 5. Build production bundle
RUN npm run build -- --configuration production


# ----------------------------
# Runtime stage
# ----------------------------
FROM nginx:alpine

# Clean default nginx content
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/sinc-shop/browser /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
