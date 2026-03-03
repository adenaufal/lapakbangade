# API Endpoints Reference

This document covers the HTTP surface used by the landing page today, including Cloudflare Pages Functions (primary runtime) and local Express-compatible routes (secondary/legacy runtime).

## Runtime Base URLs

- Production (Cloudflare Pages): `https://lapakbangade.com`
- Local frontend dev (Vite): `http://localhost:3000`
- Optional local Node server: `http://localhost:3000` via `server.js`

## Authentication Models

### Session Cookie (`lba_session`)

- Set by OAuth callback handlers.
- Verified in `build/functions/_middleware.js`.
- Cookie attributes: `HttpOnly`, `Secure`, `SameSite=Lax`, `Max-Age=7 days`.

### Request Signing for Backend Sync

Authenticated sync endpoints sign payloads with:

- Header `X-Timestamp`: unix timestamp (seconds)
- Header `X-Signature`: HMAC-SHA256 hex of `timestamp + "." + body`
- Secret: `SESSION_SECRET`

## Endpoint Catalog

### Primary Cloudflare Functions

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/rate` | Public | Get USD->IDR base rate with fallback + rate limiting |
| `GET` | `/api/auth/me` | Optional | Return current auth state and user object |
| `GET` | `/api/transactions/list` | Required | Proxy transaction list from backend sync API |
| `GET` | `/api/user/refresh` | Required | Sync/refresh linked user account data |
| `POST` | `/api/link/generate` | Required | Generate account linking code through backend |
| `GET` | `/auth/google` | Public | Start Google OAuth flow |
| `GET` | `/auth/google/callback` | Public | Handle OAuth callback + set session cookie |
| `GET` | `/auth/logout` | Public | Clear session cookie and redirect |

### Local/Legacy Express Routes

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/rate` | Public | Local fallback implementation of rate endpoint |
| `POST` | `/api/transaction/rate` | Required | Local proxy to backend transaction rate API |
| `POST` | `/api/transaction/create` | Required | Local proxy to backend transaction create API |
| `GET` | `/api/auth/status` | Optional | Session auth status helper |

### Debug Endpoints (non-production use)

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/debug/env` | Exposes presence of sensitive env vars (not values) |
| `GET` | `/api/debug/session` | Creates test session token output |
| `GET` | `/api/debug/setcookie` | Sets test cookie for browser diagnostics |
| `GET` | `/api/debug/checkcookie` | Echoes received cookies |

## Detailed Examples

## `GET /api/rate`

Returns latest base exchange rate used by the frontend calculator.

### Successful API response

```http
GET /api/rate HTTP/1.1
Host: lapakbangade.com
```

```json
{
  "baseRate": 17025,
  "source": "api"
}
```

### Fallback response (missing key)

```json
{
  "baseRate": 16500,
  "source": "fallback_no_key"
}
```

### Rate-limited response

Status: `429`

```json
{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Please retry after the specified delay."
}
```

Headers include:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`
- `Retry-After` (when limited)

## `GET /api/auth/me`

```json
{
  "authenticated": true,
  "user": {
    "id": "google-sub-id",
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://..."
  }
}
```

Unauthenticated:

```json
{
  "authenticated": false,
  "user": null
}
```

## `GET /api/transactions/list`

Requires valid session cookie.

Unauthenticated response:

```json
{
  "error": "Unauthorized"
}
```

Authenticated response shape is proxied from backend sync endpoint and typically includes:

```json
{
  "success": true,
  "transactions": []
}
```

## `POST /api/link/generate`

Request body: none (session-based user identity).

Success response example:

```json
{
  "success": true,
  "code": "ABCD1234",
  "expires_in_seconds": 300
}
```

## Error Behavior

- Cloudflare function proxy errors return `500` with `{ error: string }`.
- Auth-gated endpoints return `401` when `context.data.user` is missing.
- `/api/rate` intentionally returns `200` for fallback business responses and reserves `429` for rate-limit hard failures.

## CORS and Caching

- `OPTIONS` requests are handled in middleware with permissive CORS headers.
- `/api/rate` sets `Cache-Control: public, max-age=300`.
- Local Express runtime applies cache headers for `/api/*`.

## Planned Additions (Queue-aligned)

- Expanded server-side validation for transaction and account payloads (using `build/utils/validation.ts` patterns).
- Additional rate limiting on sensitive authenticated write operations.
- Consolidation/removal of debug endpoints from production paths.

_Last updated: March 2026_
