# Security Best Practices

This document defines security expectations for the landing page, Cloudflare Functions edge layer, and backend sync integration.

## Scope and Threat Model

The application handles:

- User identity/session data from Google OAuth.
- Financial transaction metadata proxied to backend services.
- Public exchange-rate endpoint that can be abused for scraping/flooding.

Primary risks:

- Session forgery or hijacking
- Input injection and payload tampering
- Abuse of public or debug endpoints
- Secret leakage/misconfiguration

## Security Controls Already Implemented

### Edge session hardening

- `lba_session` cookie is `HttpOnly`, `Secure`, `SameSite=Lax`.
- Session payloads are HMAC-signed and expiry-checked (`build/functions/_middleware.js`).

### API abuse mitigation

- `/api/rate` uses sliding-window rate limiting with clear retry headers (`build/functions/api/rate.ts`, `build/utils/rateLimiter.ts`).

### Input hygiene helpers

- Shared validation and sanitization utilities:
  - `sanitizeText`
  - `escapeHtml`
  - `validateEmail`
  - `validateAmount`
  - `validateBankAccountNumber`
  - `normalizeClientKey`
- Source: `build/utils/validation.ts`.

### Signed backend sync requests

- Sensitive sync requests include `X-Timestamp` and HMAC `X-Signature`.
- Signature computed from `timestamp + "." + body`.

### Config hygiene tooling

- Environment validation script: `scripts/check_env_vars.js`.
- `.env.example` groups variables by criticality.

## Required Production Baseline

Before every production release:

1. `SESSION_SECRET` is strong and rotated when needed.
2. OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) are set via Cloudflare secrets.
3. `EXCHANGE_RATE_API_KEY` is set and not hardcoded in source.
4. Debug endpoints are removed or gated.
5. CI tests and build pass.
6. Security scan job (`npm audit --omit=dev`) reviewed.

## Secure Coding Rules

## 1) Never trust client input

- Re-validate all payloads in edge functions before forwarding to backend.
- Prefer allowlists and strict schemas over permissive parsing.
- Normalize untrusted identifiers (IP, user IDs) before using them as keys.

## 2) Keep auth decisions server-side

- Do not trust frontend auth flags.
- Use middleware-verified session data (`context.data.user`) for authorization.
- Reject unauthenticated access with explicit `401` responses.

## 3) Protect secrets

- Store secrets in Cloudflare/GitHub secret managers only.
- Never log raw secrets, OAuth tokens, or signed session payloads.
- Avoid default fallback secrets in production code paths.

## 4) Minimize endpoint exposure

- Remove temporary debug endpoints from production deployments.
- Restrict any operational/debug route with strong auth + short TTL.
- Add explicit route ownership and documentation for each new endpoint.

## 5) Defensive response behavior

- Return structured, minimal error messages.
- Avoid stack traces or internal service URLs in public responses.
- Use consistent cache and CORS policies for API responses.

## Cloudflare-Specific Recommendations

- Use separate environment variables for preview vs production when practical.
- Keep compatibility date updated intentionally and test before bumping.
- Monitor edge function behavior after deploy using synthetic endpoint checks (`/api/rate`, `/api/auth/me`).

## Queue-Aligned Hardening Roadmap

| Queue | Focus | Security outcome |
|---|---|---|
| Queue 1 | Input validation & sanitization rollout | All sensitive endpoints enforce shared validation helpers |
| Queue 1 | Extended rate limiting | Protect auth/sync endpoints from brute-force/burst abuse |
| Queue 2 | Test infrastructure | Regression tests for validation, auth, and limiter behavior |
| Queue 3 | Feature enhancements | Real-time and anti-fraud additions shipped with security checks by default |

## Incident Response (Minimum)

If a security issue is suspected:

1. Triage affected endpoint(s) and disable unsafe route if needed.
2. Rotate relevant secrets (`SESSION_SECRET`, OAuth credentials, API keys).
3. Review recent deployments and rollback to last known safe version if required.
4. Add regression test that reproduces the incident class.
5. Record a post-incident note in `docs/security/` for future prevention.

## Pre-Release Security Checklist

- [ ] No hardcoded production secrets.
- [ ] Debug endpoints disabled/restricted.
- [ ] Rate limiting enabled where required.
- [ ] Input validation applied to all write paths.
- [ ] CI test/build workflow green.
- [ ] `npm audit` output reviewed for high/critical issues.

_Last updated: March 2026_
