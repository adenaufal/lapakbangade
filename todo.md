# TODO - Lapak Bang Ade Landing Page

> Last Updated: March 2026
>
> **Priority:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## 🔴 CRITICAL - Security & Performance

### 1. Environment Variables Configuration
**Import from:** `lapakbangade-bot/.env.example`
**Priority:** 🔴 Critical

- [ ] Create comprehensive `.env.example` with documented variables
- [ ] Add environment validation script (`scripts/check_env_vars.js`)
- [ ] Categorize vars: [CRITICAL], [HIGHLY RECOMMENDED], [OPTIONAL]
- [ ] Document how to generate secure values

**Files to create:**
- `.env.example` (based on bot's template)
- `scripts/check_env_vars.js`
- `scripts/generate_secrets.js`

### 2. Rate Limiting Implementation
**Import from:** `lapakbangade-bot/app/utils/rate_limiter.py`
**Priority:** 🔴 Critical

- [ ] Create TypeScript rate limiter utility (`build/utils/rateLimiter.ts`)
- [ ] Add rate limiting to API endpoints (`/api/rate`, `/api/auth/*`)
- [ ] Implement sliding window algorithm
- [ ] Add thread-safe request tracking

**Files to create:**
- `build/utils/rateLimiter.ts`
- `build/functions/api/rate.ts` (add rate limiting)

### 3. Input Validation & Sanitization
**Priority:** 🔴 Critical

- [ ] Add validation for all form inputs (transaction amounts, email, account numbers)
- [ ] Implement client-side validation helpers
- [ ] Add server-side validation in Cloudflare Functions
- [ ] Prevent XSS in user-generated content

**Files to create:**
- `build/utils/validation.ts`
- `build/functions/api/validators.ts`

---

## 🟠 HIGH - Testing & CI/CD

### 4. Testing Infrastructure
**Import from:** `lapakbangade-bot/tests/`
**Priority:** 🟠 High

- [ ] Set up Vitest for React component testing
- [ ] Create test utilities and mocks
- [ ] Write unit tests for services (rates, analytics)
- [ ] Add integration tests for API endpoints
- [ ] Implement E2E tests with Playwright

**Files to create:**
- `build/vitest.config.ts`
- `build/__tests__/` folder structure
- `build/__tests__/utils/test-helpers.ts`
- `build/__tests__/services/rates.test.ts`
- `build/__tests__/components/Hero.test.tsx`

### 5. CI/CD Pipeline
**Import from:** `lapakbangade-bot/.github/workflows/ci-cd.yml`
**Priority:** 🟠 High

- [ ] Create GitHub Actions workflow for automated testing
- [ ] Add code quality checks (ESLint, Prettier)
- [ ] Implement security scanning
- [ ] Add deployment automation for Cloudflare Pages
- [ ] Set up preview deployments for PRs

**Files to create:**
- `.github/workflows/ci-cd.yml`
- `.github/workflows/deploy.yml`
- `.github/dependabot.yml`

### 6. Pre-commit Hooks
**Priority:** 🟠 High

- [ ] Set up Husky for git hooks
- [ ] Add pre-commit linting
- [ ] Add pre-commit security checks
- [ ] Format code automatically on commit

**Files to create:**
- `.husky/pre-commit`
- `.husky/commit-msg`
- `scripts/verify-commit.js`

---

## 🟡 MEDIUM - Features & UX

### 7. Real-time Transaction Updates
**Import from:** `lapakbangade-bot/app/services/transaction_service.py`
**Priority:** 🟡 Medium

- [ ] Implement WebSocket/polling for live transaction status
- [ ] Add notification system for status changes
- [ ] Create transaction history display
- [ ] Add push notifications (optional)

**Files to create:**
- `build/hooks/useTransactionUpdates.ts`
- `build/components/TransactionNotifications.tsx`
- `build/services/transactionSync.ts`

### 8. Dashboard Improvements
**Priority:** 🟡 Medium

- [ ] Add export transaction history (PDF/CSV)
- [ ] Implement search and filtering
- [ ] Add date range picker
- [ ] Create summary statistics/cards
- [ ] Add transaction category badges

**Files to modify:**
- `build/components/Dashboard.tsx`
- `build/components/TransactionDetailModal.tsx`

### 9. Anti-Fraud Indicators
**Import from:** `lapakbangade-bot/app/services/anti_fraud.py`
**Priority:** 🟡 Medium

- [ ] Add transaction velocity checks
- [ ] Implement suspicious activity detection
- [ ] Create trust score display
- [ ] Add verification badges for verified users

**Files to create:**
- `build/utils/fraudDetection.ts`
- `build/components/TrustIndicators.tsx`

### 10. Referral Program Enhancement
**Priority:** 🟡 Medium

Current: Basic referral component exists
**Improvements needed:**
- [ ] Add referral link generation with QR code
- [ ] Track referral conversions
- [ ] Display referral statistics
- [ ] Implement referral rewards tier
- [ ] Add leaderboard with filters

**Files to modify:**
- `build/components/ReferralProgram.tsx`
- `build/components/ReferralLeaderboard.tsx`

---

## 🟢 LOW - Documentation & Polish

### 11. Documentation Improvements
**Import from:** `lapakbangade-bot/docs/`
**Priority:** 🟢 Low

- [ ] Create architecture documentation
- [ ] Add API documentation
- [ ] Write deployment guides
- [ ] Create troubleshooting guide
- [ ] Add security best practices doc

**Files to create:**
- `docs/architecture/overview.md`
- `docs/api/endpoints.md`
- `docs/deployment/cloudflare.md`
- `docs/troubleshooting/common-issues.md`
- `docs/security/best-practices.md`

### 12. Developer Experience
**Priority:** 🟢 Low

- [ ] Add VS Code settings for consistent development
- [ ] Create component storybook
- [ ] Add API mocking for development
- [ ] Create dev container configuration

**Files to create:**
- `.vscode/settings.json`
- `.devcontainer/devcontainer.json`
- `scripts/dev-server.js`

### 13. Analytics Enhancement
**Import from:** `lapakbangade-bot/app/monitoring/`
**Priority:** 🟢 Low

- [ ] Add custom analytics events for user behavior
- [ ] Implement funnel tracking
- [ ] Create analytics dashboard (admin)
- [ ] Add conversion attribution tracking

**Files to create:**
- `build/services/analytics-enhanced.ts`
- `build/components/AdminAnalytics.tsx`

---

## 📋 WORK QUEUES

### Queue 1: Security First (Week 1-2)
1. Environment Variables Configuration
2. Rate Limiting Implementation
3. Input Validation & Sanitization

### Queue 2: Testing & Quality (Week 3-4)
4. Testing Infrastructure
5. CI/CD Pipeline
6. Pre-commit Hooks

### Queue 3: Feature Enhancement (Week 5-6)
7. Real-time Transaction Updates
8. Dashboard Improvements
9. Anti-Fraud Indicators

### Queue 4: Polish & Documentation (Week 7-8)
10. Referral Program Enhancement
11. Documentation Improvements
12. Developer Experience
13. Analytics Enhancement

---

## 🎯 QUICK WINS (Can be done in parallel)

- [ ] Verify `.gitignore` includes `.env` files
- [ ] Update `README.md` with setup instructions
- [ ] Add error boundaries to React components
- [ ] Create loading skeleton components
- [ ] Add TypeScript strict mode

---

## 📝 NOTES

### Files to Import from lapakbangade-bot:
1. `.env.example` - Comprehensive environment template
2. `app/utils/rate_limiter.py` - Convert to TypeScript
3. `app/services/anti_fraud.py` - Convert fraud detection logic
4. `app/utils/error_messages.py` - Error handling patterns
5. `tests/` structure - Testing patterns and organization
6. `.github/workflows/ci-cd.yml` - CI/CD pipeline
7. `docs/architecture/` - Documentation structure

### Patterns to Adopt:
1. Repository pattern for data access
2. Service layer for business logic
3. Centralized error handling
4. Context managers for resources
5. Dependency injection

### Things NOT to Import:
1. Facebook Messenger bot code (irrelevant for landing page)
2. Discord bot integration
3. MongoDB-specific code (using Cloudflare D1/Workers)
4. Python-specific utilities
