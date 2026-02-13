# Testing Guide - Marketing Psychology Components
## Lapak Bang Ade

**Version:** 1.0.0
**Last Updated:** February 13, 2026

---

## Table of Contents

1. [Testing Overview](#testing-overview)
2. [Manual Testing Checklists](#manual-testing-checklists)
3. [Automated Testing](#automated-testing)
4. [User Acceptance Testing](#user-acceptance-testing)
5. [Performance Testing](#performance-testing)
6. [Analytics Validation](#analytics-validation)

---

## Testing Overview

### Testing Pyramid

```
        /\
       /  \  E2E Tests (10%)
      /____\
     /      \  Integration Tests (30%)
    /________\
   /          \  Unit Tests (60%)
  /__Component_\
```

### Test Environments

- **Development:** `localhost:5173`
- **Staging:** `staging.lapakbangade.com`
- **Production:** `lapakbangade.com`

---

## Manual Testing Checklists

### Sprint 1: Quick Wins

#### ✅ Charm Pricing

**Test Cases:**

- [ ] **TC-CP-001:** Verify FeeSection displays "Just $4.97"
  - Navigate to landing page
  - Scroll to Fee Section
  - Confirm text shows "Just $4.97" (not "Flat $5")

- [ ] **TC-CP-002:** Verify calculator uses $4.97 for amounts >=$50
  - Enter $50 in calculator
  - Check fee calculation
  - Expected: Fee = $4.97

- [ ] **TC-CP-003:** Verify constants.ts has correct value
  - Open `build/constants.ts`
  - Find `FEE_OVER_50_FLAT`
  - Confirm value is `4.97`

**Expected Results:**
- ✅ All displays show $4.97
- ✅ Calculations use 4.97
- ✅ No $5.00 references remain

---

#### ✅ Bank Dropdown Validation

**Test Cases:**

- [ ] **TC-BD-001:** Verify dropdown displays on load
  - Open TransactionWizard
  - Navigate to Step 3 (Details)
  - Confirm dropdown (not text input) appears

- [ ] **TC-BD-002:** Verify all banks are listed
  - Click bank dropdown
  - Expected options:
    - BCA
    - Mandiri
    - BNI
    - BRI
    - BSI

- [ ] **TC-BD-003:** Verify all e-wallets are listed
  - Click bank dropdown
  - Expected options under "E-Wallet":
    - DANA
    - OVO
    - GoPay
    - ShopeePay
    - LinkAja

- [ ] **TC-BD-004:** Verify dropdown prevents typos
  - Try to type free text
  - Expected: Only dropdown selection allowed

- [ ] **TC-BD-005:** Verify required validation
  - Leave dropdown empty
  - Try to proceed
  - Expected: Validation error

**Expected Results:**
- ✅ No text input visible
- ✅ All 5 banks + 5 wallets present
- ✅ No typo errors possible
- ✅ Required validation works

---

#### ✅ Friday Countdown Timer

**Test Cases:**

- [ ] **TC-FC-001:** Verify countdown on Friday
  - Set system date to Friday
  - Refresh page
  - Navigate to FeeSection
  - Expected: "Berakhir dalam HH:MM:SS"

- [ ] **TC-FC-002:** Verify countdown updates every second
  - Watch timer for 10 seconds
  - Expected: Seconds decrement continuously

- [ ] **TC-FC-003:** Verify non-Friday display
  - Set system date to Monday
  - Refresh page
  - Expected: "Promo berikutnya: X hari Y jam"

- [ ] **TC-FC-004:** Verify midnight transition
  - Set time to 23:59:50 Friday
  - Wait 15 seconds
  - Expected: Timer resets or changes to "Promo berikutnya"

**Expected Results:**
- ✅ Friday: Real-time countdown
- ✅ Non-Friday: Days remaining
- ✅ Updates every second
- ✅ Midnight transition smooth

---

### Sprint 2: Medium Impact

#### ✅ Real-Time Proof Notifications

**Test Cases:**

- [ ] **TC-RP-001:** Verify component renders
  - Load landing page
  - Look below "Admin Online" badge
  - Confirm green badge with pulsing dot

- [ ] **TC-RP-002:** Verify message rotation
  - Wait 5 seconds
  - Expected: Message changes
  - Wait 5 more seconds
  - Expected: Different message

- [ ] **TC-RP-003:** Verify all 4 messages display
  - Watch for 20+ seconds
  - Expected messages:
    1. "3 pengguna convert $50+..."
    2. "12 transaksi selesai hari ini"
    3. "5 pengguna baru bergabung..."
    4. "Rate terakhir diupdate..."

- [ ] **TC-RP-004:** Verify animation smooth
  - Watch transitions
  - Expected: Fade in/out (no jank)

**Expected Results:**
- ✅ Component visible
- ✅ Rotates every 5 seconds
- ✅ All 4 messages cycle
- ✅ Smooth animations

---

#### ✅ Milestone Badges

**Test Cases:**

- [ ] **TC-MB-001:** Verify badges section renders
  - Login to dashboard
  - Scroll to Achievements section
  - Confirm 6 badges displayed

- [ ] **TC-MB-002:** Verify locked badge appearance
  - New user with 0 transactions
  - Expected: All badges except "First Step" are grayscale

- [ ] **TC-MB-003:** Verify progress bars
  - User with 3 completed transactions
  - Check "Power User" badge (requires 5)
  - Expected: Progress bar shows "3 / 5"

- [ ] **TC-MB-004:** Verify unlocked badge
  - User with 5+ transactions
  - Expected: "Power User" badge has:
    - ✓ Checkmark in top-right
    - Full color (not grayscale)
    - No progress bar

- [ ] **TC-MB-005:** Verify volume-based badges
  - User with $150 volume
  - Check "$100 Milestone" badge
  - Expected: Unlocked & colored

**Expected Results:**
- ✅ 6 badges total
- ✅ Progress bars on locked badges
- ✅ Checkmarks on unlocked badges
- ✅ Color vs grayscale correct

---

#### ✅ Goal Progress Bars

**Test Cases:**

- [ ] **TC-GP-001:** Verify 3 goals display
  - Login to dashboard
  - Check "Target & Progress" section
  - Expected goals:
    1. Transaksi Bulanan
    2. Volume Bulanan
    3. Target Mingguan

- [ ] **TC-GP-002:** Verify progress calculation
  - User with 5 completed transactions
  - Monthly goal: 10 transactions
  - Expected: 50% progress

- [ ] **TC-GP-003:** Verify motivational text
  - User with 60% progress
  - Expected: "💪 Hampir sampai! Tinggal X lagi"

- [ ] **TC-GP-004:** Verify completion state
  - User with 10+ transactions
  - Expected: "✓ Selesai" green badge

- [ ] **TC-GP-005:** Verify shimmer animation
  - Watch progress bars
  - Expected: Subtle shimmer effect

**Expected Results:**
- ✅ All 3 goals visible
- ✅ Percentages accurate
- ✅ Motivational text at >50%
- ✅ Completion badges work

---

#### ✅ Social Proof Ticker

**Test Cases:**

- [ ] **TC-SP-001:** Verify ticker renders
  - Load landing page
  - Look below Hero section
  - Confirm horizontal scrolling ticker

- [ ] **TC-SP-002:** Verify scrolling animation
  - Watch ticker for 10 seconds
  - Expected: Continuous smooth scroll

- [ ] **TC-SP-003:** Verify pause on hover (desktop)
  - Hover over ticker
  - Expected: Scrolling pauses

- [ ] **TC-SP-004:** Verify event data
  - Read ticker events
  - Confirm format: "User dari [City] • $[Amount] • [Time] lalu"

- [ ] **TC-SP-005:** Verify gradient fade edges
  - Check left & right edges
  - Expected: Smooth fade to background color

**Expected Results:**
- ✅ Smooth scrolling
- ✅ Pause on hover
- ✅ Realistic event data
- ✅ Fade edges present

---

### Sprint 3: Advanced Features

#### ✅ Status Tier System

**Test Cases:**

- [ ] **TC-ST-001:** Verify Bronze tier (new user)
  - New user with 0 transactions
  - Expected tier: Bronze
  - Expected color: Amber gradient

- [ ] **TC-ST-002:** Verify Silver tier
  - User with 5 transactions, $250+ volume
  - Expected tier: Silver
  - Expected color: Gray gradient

- [ ] **TC-ST-003:** Verify progress to next tier
  - User with 3 transactions, $150 volume
  - Progress to Silver (requires 5 tx, $250):
    - Transaction progress: 60%
    - Volume progress: 60%
    - Overall: 60%

- [ ] **TC-ST-004:** Verify benefits display
  - Check current tier benefits
  - Expected: 3-4 bullet points with checkmarks

- [ ] **TC-ST-005:** Verify max tier state
  - User with 30+ transactions, $3000+ volume
  - Expected: Platinum tier, "Tier Tertinggi!" message

**Expected Results:**
- ✅ Correct tier assigned
- ✅ Gradient colors match
- ✅ Progress bars accurate
- ✅ Max tier celebrated

---

#### ✅ Pending Transaction Urgency

**Test Cases:**

- [ ] **TC-PT-001:** Verify component only shows when pending > 0
  - User with 0 pending transactions
  - Expected: Component hidden

- [ ] **TC-PT-002:** Verify low urgency (< 6 hours)
  - Create pending transaction
  - Expected: Blue theme, "Baru" badge

- [ ] **TC-PT-003:** Verify medium urgency (6-24 hours)
  - Transaction created 12 hours ago
  - Expected: Yellow theme, "Pending" badge

- [ ] **TC-PT-004:** Verify high urgency (24+ hours)
  - Transaction created 36 hours ago
  - Expected: Red theme, "Urgent!" badge, pulsing alert

- [ ] **TC-PT-005:** Verify circular progress
  - Check progress percentage
  - Expected: Increases over time (capped at 95%)

- [ ] **TC-PT-006:** Verify CTA button
  - Click "Chat Admin" or "Follow Up Sekarang"
  - Expected: Opens Messenger

**Expected Results:**
- ✅ Conditional rendering works
- ✅ Urgency levels correct
- ✅ Progress indicators accurate
- ✅ CTAs functional

---

#### ✅ Referral Program

**Test Cases:**

- [ ] **TC-RF-001:** Verify referral code generation
  - Login to dashboard
  - Check referral code
  - Expected format: `LBA-XXXXXXXX` (8 chars)

- [ ] **TC-RF-002:** Verify copy button
  - Click "Copy" button
  - Check clipboard
  - Expected: Full referral link copied

- [ ] **TC-RF-003:** Verify WhatsApp share
  - Click WhatsApp button
  - Expected: Opens WhatsApp with pre-filled message

- [ ] **TC-RF-004:** Verify Facebook share
  - Click Facebook button
  - Expected: Opens Facebook share dialog

- [ ] **TC-RF-005:** Verify stats display
  - Check stats grid
  - Expected metrics:
    - Total Referrals
    - Converted
    - Earned

**Expected Results:**
- ✅ Code generates correctly
- ✅ Copy works
- ✅ Share buttons functional
- ✅ Stats display (even if 0)

---

#### ✅ Rate Volatility Alerts

**Test Cases:**

- [ ] **TC-RV-001:** Verify no alert on first visit
  - Clear localStorage
  - Visit landing page
  - Expected: No alert (no previous rate)

- [ ] **TC-RV-002:** Verify rate increase alert
  - Set previous rate: 15,450
  - Set current rate: 15,500
  - Refresh page
  - Expected: Red alert "Rate Naik!"

- [ ] **TC-RV-003:** Verify rate decrease alert
  - Set previous rate: 15,500
  - Set current rate: 15,425
  - Refresh page
  - Expected: Green alert "Rate Turun!"

- [ ] **TC-RV-004:** Verify percentage calculation
  - Rate change: 50 Rp out of 15,450
  - Expected: "0.32%" displayed

- [ ] **TC-RV-005:** Verify dismissible
  - Click X button on alert
  - Expected: Alert disappears

- [ ] **TC-RV-006:** Verify threshold (0.5%)
  - Small change (< 0.5%)
  - Expected: No alert shown

**Expected Results:**
- ✅ Alert shows on significant change
- ✅ Colors match direction
- ✅ Percentage accurate
- ✅ Dismissible works

---

#### ✅ Saved Drafts

**Test Cases:**

- [ ] **TC-SD-001:** Verify save draft functionality
  - Start transaction
  - Fill amount: $75
  - Close wizard (don't complete)
  - Refresh dashboard
  - Expected: Draft appears in Saved Drafts

- [ ] **TC-SD-002:** Verify draft display
  - Check saved draft card
  - Expected info:
    - Type (Convert/Top-up)
    - Amount ($75)
    - Time ago
    - Bank/wallet (if filled)

- [ ] **TC-SD-003:** Verify resume draft
  - Click "Lanjutkan" button
  - Expected: Wizard opens with pre-filled data

- [ ] **TC-SD-004:** Verify delete draft
  - Click trash icon
  - Expected: Draft removed from list

- [ ] **TC-SD-005:** Verify 5-draft limit
  - Create 6 drafts
  - Expected: Only latest 5 shown

- [ ] **TC-SD-006:** Verify 7-day expiration warning
  - Check bottom of component
  - Expected: "Draft akan otomatis terhapus setelah 7 hari"

**Expected Results:**
- ✅ Drafts save to localStorage
- ✅ Display shows all info
- ✅ Resume works
- ✅ Delete works
- ✅ Limit enforced

---

## Automated Testing

### Unit Tests (Jest + React Testing Library)

```typescript
// Example: MilestoneBadges.test.tsx
import { render, screen } from '@testing-library/react';
import { MilestoneBadges } from './MilestoneBadges';

describe('MilestoneBadges', () => {
  it('renders 6 badges', () => {
    render(<MilestoneBadges completedCount={0} totalVolume={0} transactionCount={0} />);
    const badges = screen.getAllByRole('article'); // Assuming badges have role="article"
    expect(badges).toHaveLength(6);
  });

  it('unlocks First Step badge with 1 transaction', () => {
    render(<MilestoneBadges completedCount={1} totalVolume={0} transactionCount={1} />);
    const firstBadge = screen.getByText('First Step');
    expect(firstBadge).toHaveClass('unlocked'); // Check for unlocked styling
  });

  it('shows progress bar for locked badges', () => {
    render(<MilestoneBadges completedCount={3} totalVolume={50} transactionCount={3} />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests (Cypress)

```typescript
// Example: referral-program.cy.ts
describe('Referral Program', () => {
  beforeEach(() => {
    cy.login(); // Custom command
    cy.visit('/dashboard');
  });

  it('generates unique referral code', () => {
    cy.get('[data-testid="referral-code"]').should('contain', 'LBA-');
    cy.get('[data-testid="referral-code"]').invoke('text').should('have.length', 12); // LBA- + 8 chars
  });

  it('copies referral link to clipboard', () => {
    cy.get('[data-testid="copy-button"]').click();
    cy.window().its('navigator.clipboard').invoke('readText').should('contain', 'lapakbangade.com/?ref=');
  });

  it('opens WhatsApp share', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('[data-testid="share-whatsapp"]').click();
    cy.get('@windowOpen').should('be.calledWith', Cypress.sinon.match(/wa.me/));
  });
});
```

### E2E Tests (Playwright)

```typescript
// Example: complete-transaction.spec.ts
import { test, expect } from '@playwright/test';

test('complete transaction flow with all psychology components', async ({ page }) => {
  // 1. Land on page and see real-time proof
  await page.goto('/');
  await expect(page.locator('[data-testid="realtime-proof"]')).toBeVisible();

  // 2. See rate volatility alert (if applicable)
  const rateAlert = page.locator('[data-testid="rate-volatility-alert"]');
  if (await rateAlert.isVisible()) {
    await expect(rateAlert).toContainText(/Rate (Naik|Turun)/);
  }

  // 3. Interact with calculator
  await page.fill('input[type="number"]', '100');
  await page.click('button:has-text("Lanjut Convert")');

  // 4. Fill transaction wizard
  await page.click('button:has-text("Convert USD ke IDR")');
  await page.fill('input[placeholder*="50"]', '100');
  await page.click('button:has-text("Lanjut")');

  // 5. Select bank from dropdown
  await page.selectOption('select', 'BCA');
  await page.fill('input[placeholder*="1234567890"]', '1234567890');
  await page.fill('input[placeholder*="Nama sesuai"]', 'Test User');

  // 6. Verify charm pricing in breakdown
  await expect(page.locator('text=/\\$4\\.97/')).toBeVisible();

  // 7. Complete transaction
  await page.click('button:has-text("Buat Transaksi")');
  await expect(page.locator('text=/Transaksi Dibuat/')).toBeVisible();
});
```

---

## User Acceptance Testing

### UAT Scenarios

#### Scenario 1: New User First Transaction

**User Story:** As a new freelancer, I want to convert my PayPal balance to Rupiah easily.

**Steps:**
1. Visit landing page
2. Notice social proof ticker scrolling
3. See real-time proof: "3 users converted..."
4. Enter $50 in calculator
5. See $4.97 fee (charm pricing)
6. Click CTA
7. Fill transaction details with bank dropdown
8. Complete first transaction
9. Login to dashboard
10. See "First Step" badge unlocked
11. See Bronze tier status

**Expected Outcomes:**
- [ ] All psychology components visible
- [ ] Transaction completes successfully
- [ ] Badge unlocks immediately
- [ ] User understands tier system

---

#### Scenario 2: Returning User Tier Upgrade

**User Story:** As a returning user, I want to reach Silver tier for better rates.

**Steps:**
1. Login to dashboard (4 completed transactions, $200 volume)
2. See tier progress: "80% to Silver"
3. See goal: "Complete 10 transactions: 4/10"
4. See pending transaction urgency (if applicable)
5. Complete 1 more transaction
6. Tier upgrades to Silver
7. Celebrate upgrade with animation

**Expected Outcomes:**
- [ ] Progress bars accurate
- [ ] Tier upgrade triggers
- [ ] Visual celebration
- [ ] New benefits visible

---

#### Scenario 3: Rate Alert Urgency

**User Story:** As a user monitoring rates, I want to be alerted when rates become favorable.

**Steps:**
1. Visit page (previous rate: 15,500)
2. Current rate: 15,425 (dropped)
3. See green alert: "Rate Turun! Lock rate sekarang"
4. Click "Lock Rate Sekarang"
5. Navigate to calculator
6. Complete transaction

**Expected Outcomes:**
- [ ] Alert shows immediately
- [ ] Percentage calculated correctly
- [ ] CTA links to calculator
- [ ] Urgency messaging effective

---

## Performance Testing

### Load Time Benchmarks

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

**Test Tools:**
- Lighthouse CI
- WebPageTest
- GTmetrix

### Component Performance

**Heavy Components:**
1. Social Proof Ticker (infinite scroll)
2. Milestone Badges (animations)
3. Goal Progress (shimmer effects)

**Optimization Checklist:**
- [ ] Lazy load below-fold components
- [ ] Memoize expensive calculations
- [ ] Debounce localStorage writes
- [ ] Optimize images (WebP, lazy loading)
- [ ] Code splitting for dashboard

---

## Analytics Validation

### Event Tracking Tests

**Checklist:**
- [ ] All page views tracked
- [ ] CTA clicks fire events
- [ ] Badge unlocks tracked
- [ ] Tier upgrades tracked
- [ ] Referral shares tracked
- [ ] Draft saves tracked
- [ ] Rate alerts tracked

**Validation Steps:**

1. **Open Browser DevTools**
   - Network tab
   - Filter: `google-analytics.com` or `facebook.net`

2. **Trigger Event**
   - Example: Click "Chat Admin Sekarang"

3. **Verify Event Fires**
   - Check network request
   - Validate parameters:
     - Event name: `cta_footer_click`
     - Parameters: `{amount, mode, rate}`

4. **Check GA4 DebugView** (if enabled)
   - Real-time event validation

**Sample Validation Script:**
```javascript
// Run in browser console
window.dataLayer = window.dataLayer || [];
window.dataLayer.push = new Proxy(window.dataLayer.push, {
  apply: function(target, thisArg, argumentsList) {
    console.log('Analytics Event:', argumentsList[0]);
    return target.apply(thisArg, argumentsList);
  }
});
```

---

## Regression Testing

After each deployment, run:

- [ ] All Sprint 1 tests
- [ ] All Sprint 2 tests
- [ ] All Sprint 3 tests
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device (Desktop, Tablet, Mobile)
- [ ] Analytics validation
- [ ] Performance benchmarks

---

## Bug Reporting Template

```markdown
**Bug Title:** [Component] - Brief description

**Severity:** Critical | High | Medium | Low

**Environment:**
- Browser: Chrome 121
- OS: Windows 11
- Device: Desktop

**Steps to Reproduce:**
1. Navigate to...
2. Click on...
3. Observe...

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Screenshots/Video:**
[Attach evidence]

**Console Errors:**
[Paste any errors]

**Additional Context:**
[Anything else relevant]
```

---

## Conclusion

This testing guide ensures **comprehensive validation** of all marketing psychology components. Follow these procedures before each release to maintain quality and effectiveness.

**Key Testing Priorities:**
1. ✅ Psychology principles work as intended
2. ✅ User experience is smooth
3. ✅ Analytics tracking is accurate
4. ✅ Performance is optimal
5. ✅ Cross-browser compatibility

For questions, refer to the main implementation guide or contact QA team.
