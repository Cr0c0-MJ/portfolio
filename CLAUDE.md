# Portfolio — Claude Code Guide

## Stack
- **Monorepo:** Turborepo + npm workspaces
- **Frontend:** Next.js 14 (App Router, standalone output)
- **Backend:** NestJS 10 + Prisma + PostgreSQL
- **Infra:** Docker Compose + Traefik (Let's Encrypt)
- **CI/CD:** GitHub Actions → GHCR → SSH deploy to VPS

## Layout
```
apps/
  web/        # Next.js — port 3000
  api/        # NestJS — port 4000, prefix /api
packages/
  ui/         # shared React components (@portfolio/ui)
  tsconfig/   # shared tsconfigs (base / nextjs / nestjs / react-library)
  eslint-config/
docker/
  traefik/    # dynamic config + acme storage
compose.yml         # local dev
compose.prod.yml    # production (pulls images from GHCR)
```

## Common commands
| Task                          | Command                                 |
| ----------------------------- | --------------------------------------- |
| Install deps                  | `npm install`                           |
| Dev (all apps)                | `npm run dev`                           |
| Dev (single app)              | `npm run dev -w @portfolio/web`         |
| Build all                     | `npm run build`                         |
| Lint / Typecheck              | `npm run lint` / `npm run typecheck`    |
| Local stack (Docker)          | `docker compose up`                     |
| Stop stack                    | `docker compose down`                   |
| Prisma migrate (dev)          | `npm run prisma:migrate -w @portfolio/api` |
| Prisma deploy (prod)          | runs automatically in api container CMD |

## Conventions
- TypeScript strict everywhere. New apps/packages must extend `@portfolio/tsconfig`.
- API routes are prefixed with `/api` (set in `apps/api/src/main.ts`).
- Public env vars in Next.js MUST be prefixed `NEXT_PUBLIC_`.
- Shared React code goes in `packages/ui` and is consumed via `@portfolio/ui`.
- Prisma schema lives at `apps/api/prisma/schema.prisma`. Re-run `prisma generate` after edits.

## Production deploy
Pushes to `main` trigger `.github/workflows/deploy.yml`:
1. Build `web` + `api` images, push to `ghcr.io/<owner>/portfolio-{web,api}`.
2. SSH into VPS, `git pull`, `docker compose -f compose.prod.yml pull && up -d`.

### Required GitHub secrets
- `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT` (optional, default 22)
- `VPS_APP_DIR` — absolute path on the VPS where the repo is cloned
- GitHub Environment: `production`

### Required `.env` on the VPS (next to `compose.prod.yml`)
```
DOMAIN=example.com
ACME_EMAIL=you@example.com
GHCR_OWNER=<your-github-username>
IMAGE_TAG=latest
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=<strong-password>
POSTGRES_DB=portfolio
DATABASE_URL=postgresql://portfolio:<strong-password>@db:5432/portfolio?schema=public
```

### Domain DNS
Point `A` records for `@`, `www`, `api` to the VPS IP. Traefik auto-provisions Let's Encrypt certs via TLS-ALPN challenge.

## Traefik notes
- Routers: `web` → `${DOMAIN}` & `www.${DOMAIN}`; `api` → `api.${DOMAIN}`
- HTTPS redirect from :80 is enforced at the entrypoint level
- ACME storage: `docker/traefik/letsencrypt/acme.json` (must be `chmod 600` on first run)

## Troubleshooting
- **`acme.json` permission error**: `touch acme.json && chmod 600 acme.json` inside `docker/traefik/letsencrypt/`.
- **Prisma client missing in container**: Dockerfile runs `prisma generate` in the builder stage; confirm `apps/api/prisma/` was copied.
- **`@prisma/client did not initialize yet` (dev)**: `prisma generate`가 실행되지 않은 상태. `npm run prisma:migrate -w @portfolio/api` 실행 후 dev 서버 재시작. 또는 `npx prisma generate --schema=apps/api/prisma/schema.prisma` 단독 실행.
- **Standalone Next.js can't find files**: ensure `next.config.mjs` has `output: 'standalone'` (already set).
