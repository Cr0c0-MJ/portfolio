# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
# Stage 1: deps — install workspace deps
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /repo
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/ ./packages/ui/
COPY packages/tsconfig/ ./packages/tsconfig/
COPY packages/eslint-config/package.json ./packages/eslint-config/

RUN npm ci

# ─────────────────────────────────────────────────────────────
# Stage 2: builder — build Next.js standalone output
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npx turbo run build --filter=@portfolio/web...

# ─────────────────────────────────────────────────────────────
# Stage 3: runner — minimal production image
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
