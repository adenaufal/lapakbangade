# Cloudflare Deployment Guide

This guide describes how to deploy the React landing page and Cloudflare Functions to Cloudflare Pages, both manually and through CI/CD.

## Deployment Model

- Frontend app is built from `build/` using Vite.
- Static output directory: `build/dist`.
- Cloudflare Functions live in `build/functions/`.
- Wrangler config: `build/wrangler.toml`.
- CI/CD workflow: `.github/workflows/ci-cd.yml`.

## Prerequisites

- Cloudflare account with Pages enabled.
- Node.js 20+.
- npm available in CI and local environment.
- Repository secrets in GitHub:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

## Required Runtime Variables

Set in Cloudflare Pages > Settings > Variables and Secrets:

- `EXCHANGE_RATE_API_KEY`
- `SESSION_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `API_URL`
- `RATE_LIMIT_PER_MINUTE` (recommended)
- `RATE_LIMIT_WINDOW_SECONDS` (recommended)
- `FALLBACK_BASE_RATE` (optional)

Reference template: `.env.example`.

## One-Time Project Setup

1. Create a Cloudflare Pages project named `lapakbangade`.
2. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `build`
3. Configure Functions compatibility date/flags through `build/wrangler.toml`.
4. Add environment variables/secrets before first production release.

## Local Development and Preview

From repository root:

```bash
# Frontend dev server
npm --prefix build run dev

# Cloudflare Pages local preview (uses dist + functions)
npm --prefix build run preview:cf
```

Optional build verification:

```bash
bash scripts/verify-build.sh
```

## Manual Deploy

From repository root:

```bash
npm --prefix build run deploy
```

This runs build + `wrangler pages deploy dist`.

## CI/CD Flow (Current)

Workflow triggers:

- `push` to `main`, `develop`
- `pull_request` to `main`, `develop`

Jobs:

1. `quality-and-tests`
   - `npm ci --legacy-peer-deps`
   - `npm run ci:check` (Vitest suite)
   - `npm run build`
2. `security-scan`
   - `npm audit --omit=dev --audit-level=high` (non-blocking currently)
3. `deploy-preview`
   - Pull requests only
   - Deploys branch: `pr-<number>`
4. `deploy-production`
   - Push to `main` only
   - Deploys branch: `main`

Important: `npm ci --legacy-peer-deps` is required currently due peer dependency mismatch (`react@19` with `react-helmet-async@2.x` constraints).

## Release Verification Checklist

After each deploy:

1. Open landing page and verify key sections render.
2. Verify programmatic routes (bank/e-wallet/use-case) resolve.
3. Test `/api/rate` for valid response and rate-limit headers.
4. Validate OAuth start endpoint (`/auth/google`) if auth is configured.
5. Confirm no debug endpoints are exposed in production (or keep behind strict controls).

## Rollback Strategy

If deployment fails or introduces regression:

1. Re-deploy latest known good commit from GitHub Actions history.
2. In Cloudflare Pages dashboard, promote previous deployment to production.
3. If issue is secret/config related, restore previous variable values first, then redeploy.

## Common Deployment Pitfalls

- Missing Cloudflare secrets in GitHub -> deploy jobs are skipped.
- Missing `EXCHANGE_RATE_API_KEY` -> `/api/rate` will always return fallback.
- Missing `SESSION_SECRET` -> auth/session verification and sync signing fail.
- Running plain `npm ci` without legacy peer flag in CI -> install failure.

_Last updated: March 2026_
