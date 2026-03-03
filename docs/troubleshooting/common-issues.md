# Common Issues Troubleshooting

This guide covers recurring issues for the landing page stack (React + Cloudflare Pages Functions + optional backend sync APIs).

## Quick Diagnosis Commands

```bash
# Run frontend tests
npm --prefix build run test

# Build locally
npm --prefix build run build

# Local Cloudflare Pages preview
npm --prefix build run preview:cf

# Validate environment variables
node scripts/check_env_vars.js
node scripts/check_env_vars.js --strict
```

## 1) `npm ci` fails with peer dependency errors

### Symptoms

- CI or local install fails with `ERESOLVE`.
- Error references `react-helmet-async` and React version mismatch.

### Cause

Current dependency graph requires installing with legacy peer resolution.

### Fix

```bash
npm --prefix build ci --legacy-peer-deps
```

CI workflow already uses this flag in `.github/workflows/ci-cd.yml`.

## 2) `/api/rate` always returns fallback

### Symptoms

- API response source is `fallback_no_key` or `fallback_error`.
- Hero calculator never shows source `API`.

### Checks

```bash
curl -s https://your-domain.com/api/rate
```

### Likely causes

- `EXCHANGE_RATE_API_KEY` is missing/invalid in Cloudflare Pages secrets.
- External exchange-rate provider is unavailable.

### Fix

1. Set/update `EXCHANGE_RATE_API_KEY` in Cloudflare Pages secrets.
2. Redeploy.
3. Re-test endpoint.

## 3) `/api/rate` returns `429 Too many requests`

### Symptoms

- Frontend fails to refresh rate for same client/IP.
- Response includes `Retry-After`.

### Cause

Sliding-window limiter in `build/functions/api/rate.ts` is rejecting burst traffic.

### Fix

1. Respect `Retry-After` on client side.
2. Tune limits:
   - `RATE_LIMIT_PER_MINUTE`
   - `RATE_LIMIT_WINDOW_SECONDS`
3. Redeploy after configuration update.

## 4) OAuth login fails (`invalid_state`, `token_failed`, `callback_failed`)

### Symptoms

- Redirects to `/?error=invalid_state` or similar.
- `/dashboard` not accessible after Google login.

### Checks

- Ensure callback URL in Google Console matches deployment domain:
  - `https://<domain>/auth/google/callback`
- Confirm secrets exist:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `SESSION_SECRET`

### Fix

1. Align callback URL exactly (scheme/domain/path).
2. Clear old cookies and retry login.
3. Verify `SESSION_SECRET` is present and stable.

## 5) Dashboard API calls return `401 Unauthorized`

### Symptoms

- `/api/transactions/list`, `/api/user/refresh`, or `/api/link/generate` returns 401.

### Cause

No valid `lba_session` cookie is available or session verification failed in middleware.

### Fix

1. Re-authenticate via `/auth/google`.
2. Check cookie flags and domain.
3. Confirm `SESSION_SECRET` is configured and unchanged.
4. Ensure browser is using HTTPS in production (`Secure` cookie requirement).

## 6) CI passes tests but deploy jobs are skipped

### Symptoms

- `deploy-preview` / `deploy-production` did not run.

### Cause

Workflow condition requires both secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Fix

Set both secrets in GitHub repository settings and re-run workflow.

## 7) Build succeeds locally but pages/functions behavior differs in production

### Symptoms

- Static pages work but API routes fail in production.

### Checks

1. Verify `build/functions/` files are included and deployed.
2. Confirm `build/wrangler.toml` is valid.
3. Validate all required environment variables are configured in Cloudflare Pages.

### Fix

- Rebuild + redeploy after correcting secret/config mismatch.

## 8) Debug endpoints visible in production

### Symptoms

- `/api/debug/*` responds on production environment.

### Risk

Information leakage and unnecessary attack surface.

### Fix

1. Remove or gate debug routes by environment.
2. Restrict access with auth and IP allowlist when temporary diagnostics are required.
3. Add validation in release checklist to confirm debug routes are disabled.

## Escalation Checklist

When an issue cannot be resolved quickly:

1. Capture exact request/response payload and status code.
2. Capture current env snapshot with `check_env_vars.js` (without exposing secret values).
3. Identify failing layer: frontend, Cloudflare function, external provider, or backend sync API.
4. Open incident note with:
   - failing endpoint
   - first seen timestamp
   - recent deployment hash
   - rollback candidate

_Last updated: March 2026_
