## Multi-stage Dockerfile for Next.js
## Stage 1: install dependencies (includes libvips for sharp)
FROM node:20-bullseye AS deps
WORKDIR /app

# Copy package manifests first for efficient caching
COPY package.json package-lock.json* ./

RUN apt-get update \
  && apt-get install -y python3 make g++ libvips-dev --no-install-recommends \
  && npm ci --production=false \
  && apt-get purge -y --auto-remove python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

## Stage 2: build
FROM node:20-bullseye AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

## Stage 3: run
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
