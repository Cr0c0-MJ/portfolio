# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
# Stage 1: deps — install workspace deps
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /repo
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json* turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/tsconfig/ ./packages/tsconfig/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY apps/api/prisma ./apps/api/prisma

RUN npm ci

# ─────────────────────────────────────────────────────────────
# Stage 2: builder — compile NestJS + generate Prisma client
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /repo
RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npx turbo run build --filter=@portfolio/api...

# ─────────────────────────────────────────────────────────────
# Stage 3: runner — minimal production image
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production
ENV API_PORT=4000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /repo/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /repo/apps/api/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /repo/apps/api/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /repo/node_modules ./node_modules

USER nestjs
EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
