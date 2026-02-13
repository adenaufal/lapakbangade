# Analytics Tracking Plan - Lapak Bang Ade

**Last Updated:** February 13, 2026
**Tools:** Google Analytics 4 (GA4) + Meta Pixel
**Property IDs:**
- GA4: `G-ZTR1QX14YK`
- Meta Pixel: `837636162306241`

---

## Executive Summary

This document defines the complete analytics tracking strategy for Lapak Bang Ade, a PayPal-to-IDR conversion service. The implementation uses dual tracking (GA4 + Meta Pixel) to optimize both organic discovery and paid advertising performance.

### Key Business Objectives
1. **Track conversion funnel** - From landing page → rate check → transaction initiation
2. **Optimize Meta ads** - Track high-value leads for Facebook campaign optimization
3. **Measure engagement** - Monitor user behavior across all sections
4. **Attribution tracking** - Understand traffic sources and campaign performance

---

## Current Implementation Status

### ✅ Already Implemented

| Component | Status | File Location |
|-----------|--------|---------------|
| Analytics Service | ✅ Complete | `/services/analytics.ts` |
| Cookie Consent | ✅ Complete | `/components/CookieConsent.tsx` |
| GA4 Integration | ✅ Active | Dynamic lazy-load |
| Meta Pixel | ✅ Active | Dynamic lazy-load |
| Hero CTA Tracking | ✅ Complete | `/components/Hero.tsx` |
| FAQ Tracking | ✅ Complete | `/components/FAQ.tsx` |
| Social Follow | ✅ Complete | `/components/SocialFollow.tsx` |
| Scroll Depth (50%) | ✅ Complete | `/components/LandingPage.tsx` |

### ⚠️ Partially Implemented / Needs Enhancement

| Component | Current State | Recommended Action |
|-----------|---------------|-------------------|
| Transaction Wizard | No tracking | Add full funnel tracking |
| Navigation Clicks | Not tracked | Track menu interactions |
| Footer Links | Limited tracking | Track all footer actions |
| Rate Calculator | Basic tracking | Enhanced calculator events |
| Trust Badges | Not tracked | Track badge clicks |
| Payment Methods | Not tracked | Track method selection |
| How It Works | Not tracked | Track step interactions |

---

## Event Tracking Architecture

### Standard Events (GA4 + Meta Pixel)

| Event Name | GA4 Event | Meta Event | Purpose |
|------------|-----------|------------|---------|
| PageView | `page_view` | `PageView` | Automatic pageview tracking |
| ViewContent | `view_item` | `ViewContent` | User views content/section |
| InitiateCheckout | `begin_checkout` | `InitiateCheckout` | Starts conversion flow |
| Lead | `generate_lead` | `Lead` | High-value conversion action |

### Custom Events (Current)

| Event Name | Properties | Trigger | Implemented |
|------------|------------|---------|-------------|
| `rate_viewed` | `base_rate`, `source` | User checks exchange rate | ✅ Yes |
| `cta_hero_click` | `transaction_type`, `amount` | Hero CTA clicked | ✅ Yes |
| `cta_footer_click` | - | Footer CTA clicked | ✅ Yes |
| `social_follow_click` | `platform` | Social media link clicked | ✅ Yes |
| `faq_open_question` | `question_index` | FAQ accordion opened | ✅ Yes |
| `scroll_depth` | `percentage: 50` | User scrolls 50% | ✅ Yes |
| `click_sticky_mobile_cta` | - | Mobile sticky CTA clicked | ✅ Yes |

---

## Recommended Event Additions

### High Priority - Conversion Funnel

| Event Name | Properties | Trigger | Business Value |
|------------|------------|---------|----------------|
| `wizard_opened` | `transaction_type` | Transaction wizard modal opens | Track funnel entry |
| `wizard_step_completed` | `step_number`, `step_name`, `type` | User completes wizard step | Identify drop-off points |
| `amount_calculated` | `amount_usd`, `amount_idr`, `rate`, `fee`, `type` | Amount calculation done | Track transaction sizes |
| `bank_selected` | `bank_name`, `type` | User selects bank/wallet | Understand preferences |
| `transaction_submitted` | `amount_usd`, `amount_idr`, `type`, `bank` | Final submit click | Key conversion metric |
| `transaction_error` | `error_type`, `step` | Validation/server error | Fix friction points |

### Medium Priority - Engagement

| Event Name | Properties | Trigger | Business Value |
|------------|------------|---------|----------------|
| `nav_click` | `link_name`, `destination` | Navigation menu clicked | Understand navigation patterns |
| `trust_badge_click` | `badge_type` | Trust section badge clicked | Measure trust engagement |
| `how_it_works_expand` | `step_number` | How it works step expanded | Content engagement |
| `payment_method_view` | `method_category` | Payment methods section viewed | Feature awareness |
| `calculator_interaction` | `mode`, `amount` | Calculator used (non-CTA) | Engagement signal |
| `promo_banner_click` | `promo_type` | Friday discount banner clicked | Promo effectiveness |

### Low Priority - Additional Insights

| Event Name | Properties | Trigger | Business Value |
|------------|------------|---------|----------------|
| `footer_link_click` | `link_text`, `link_url` | Footer link clicked | Navigation analysis |
| `testimonial_viewed` | `testimonial_id` | Testimonial scrolled into view | Social proof impact |
| `login_clicked` | `source` | Login button clicked | Auth funnel |
| `dashboard_viewed` | `has_transactions` | Dashboard page viewed | User retention |
| `scroll_depth_75` | `percentage: 75` | User scrolls 75% | Deeper engagement |
| `scroll_depth_100` | `percentage: 100` | User scrolls to bottom | Content completion |

---

## Event Property Standards

### Universal Properties (Auto-tracked by GA4/Meta)

- `page_location` - Full URL
- `page_title` - Document title
- `page_referrer` - Previous page
- `utm_source` - Campaign source
- `utm_medium` - Campaign medium
- `utm_campaign` - Campaign name
- `utm_content` - Ad content identifier
- `utm_term` - Paid keywords

### Custom Properties Convention

| Property Name | Type | Example | Usage |
|---------------|------|---------|-------|
| `transaction_type` | string | `'convert'`, `'topup'` | Differentiate service type |
| `amount_usd` | number | `100` | Transaction amount USD |
| `amount_idr` | number | `1535000` | Transaction amount IDR |
| `rate` | number | `15350` | Exchange rate used |
| `fee` | number | `5` | Fee charged |
| `bank_name` | string | `'BCA'`, `'DANA'` | Selected bank/wallet |
| `step_number` | number | `1`, `2`, `3` | Wizard step index |
| `step_name` | string | `'type_selection'` | Human-readable step |
| `platform` | string | `'facebook'`, `'instagram'` | Social platform |
| `question_index` | number | `0`, `1`, `2` | FAQ position |
| `error_type` | string | `'validation'`, `'network'` | Error category |

---

## Implementation Guide

### 1. Transaction Wizard Tracking

**File:** `/components/TransactionWizard.tsx`

```typescript
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';

// When wizard opens
trackEvent('wizard_opened', { transaction_type: selectedType });

// Step completion
trackEvent('wizard_step_completed', {
  step_number: currentStep,
  step_name: stepNames[currentStep],
  type: transactionType
});

// Amount calculated
trackEvent('amount_calculated', {
  amount_usd: usdAmount,
  amount_idr: idrAmount,
  rate: exchangeRate,
  fee: calculatedFee,
  type: transactionType
});

// Bank selected
trackEvent('bank_selected', {
  bank_name: selectedBank,
  type: transactionType
});

// Transaction submitted
trackEvent('transaction_submitted', {
  amount_usd: finalAmount,
  amount_idr: finalIDR,
  type: transactionType,
  bank: selectedBank
});
trackLeadWithValue({
  value: finalAmount,
  currency: 'USD',
  mode: transactionType,
  rate: exchangeRate
});
```

### 2. Navigation Tracking

**File:** `/components/Navbar.tsx`

```typescript
import { trackEvent } from '../services/analytics';

// Nav link click
onClick={() => trackEvent('nav_click', {
  link_name: link.name,
  destination: link.href
})}
```

### 3. Enhanced Calculator Tracking

**File:** `/components/Hero.tsx`

```typescript
// Add calculator interaction (non-CTA usage)
const handleCalculatorChange = (mode: string, amount: number) => {
  trackEvent('calculator_interaction', { mode, amount });
};
```

### 4. How It Works Tracking

**File:** `/components/HowItWorks.tsx`

```typescript
// If accordion/expandable
trackEvent('how_it_works_expand', { step_number: stepIndex });
```

### 5. Scroll Depth Enhancement

**File:** `/components/LandingPage.tsx`

```typescript
// Add 75% and 100% tracking
useEffect(() => {
  const handleScroll = () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrolled >= 75 && !window.hasTrackedScroll75) {
      trackEvent('scroll_depth', { percentage: 75 });
      window.hasTrackedScroll75 = true;
    }

    if (scrolled >= 100 && !window.hasTrackedScroll100) {
      trackEvent('scroll_depth', { percentage: 100 });
      window.hasTrackedScroll100 = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## UTM Parameter Strategy

### Campaign Naming Convention

**Format:** `utm_source={source}&utm_medium={medium}&utm_campaign={campaign_name}&utm_content={variation}`

### Examples

| Campaign Type | UTM String |
|---------------|------------|
| Facebook Ads (Convert) | `?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=image_ad_v1` |
| Facebook Ads (Topup) | `?utm_source=facebook&utm_medium=cpc&utm_campaign=topup_paypal_feb2026&utm_content=carousel_ad_v2` |
| Instagram Story | `?utm_source=instagram&utm_medium=story&utm_campaign=friday_promo_feb2026&utm_content=swipe_up` |
| Email Newsletter | `?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_update_feb2026&utm_content=cta_button` |
| WhatsApp Bio | `?utm_source=whatsapp&utm_medium=bio_link&utm_campaign=organic&utm_content=profile` |
| Messenger Auto-reply | `?utm_source=messenger&utm_medium=auto_reply&utm_campaign=organic&utm_content=bot_welcome` |

### UTM Best Practices

1. **Always lowercase** - `facebook` not `Facebook`
2. **Use underscores** - `convert_usd_idr` not `convert-usd-idr`
3. **Be specific** - `feb2026` includes timeframe
4. **Test variations** - Use `utm_content` to A/B test ad creative
5. **Document everything** - Maintain UTM spreadsheet

---

## Conversion Goals (GA4)

### Key Conversions to Mark

| Conversion Name | Event Trigger | Value |
|-----------------|---------------|-------|
| Lead | `generate_lead` | High |
| Transaction Submit | `transaction_submitted` | Critical |
| Initiate Checkout | `begin_checkout` | Medium |
| Calculator Used | `rate_viewed` | Low |

**Setup:** GA4 Admin → Events → Mark as conversion

---

## Meta Pixel Optimization

### Lead Value Strategy

Our implementation sends **actual USD transaction value** to Meta Pixel:

```typescript
fbq('track', 'Lead', {
  value: params.value,        // USD amount
  currency: params.currency,   // 'USD'
  content_name: 'Convert USD to IDR',
  content_category: 'PayPal Conversion'
});
```

**Why this matters:**
- Facebook optimizes for **high-value conversions**
- Sending value helps Meta find users more likely to transact larger amounts
- Improves ROAS (Return on Ad Spend)

### Campaign Optimization Events

Use these events in Facebook Ads Manager:

1. **Lead (Value-optimized)** - Primary conversion
2. **InitiateCheckout** - Upper-funnel optimization
3. **ViewContent** - Awareness campaigns

---

## Privacy & Compliance

### Cookie Consent Implementation

**Current Status:** ✅ Implemented via `/components/CookieConsent.tsx`

- Implicit consent model: Analytics loads unless user declines
- Persistent localStorage: `cookie_consent` (accepted/declined)
- Compliant with: GDPR (EU), Privacy Policy disclosure

### Data Collection Principles

1. **No PII in events** - Never send email, phone, account numbers
2. **Aggregate amounts only** - Transaction values are numeric, not personally identifiable
3. **IP anonymization** - GA4 automatically anonymizes IPs in EU
4. **Data retention** - Set to 14 months in GA4 settings

---

## Debugging & Validation

### Tools

| Tool | Purpose | How to Access |
|------|---------|---------------|
| GA4 DebugView | Real-time event monitoring | GA4 → Configure → DebugView |
| Meta Pixel Helper | Chrome extension for Pixel | [Chrome Web Store](https://chrome.google.com/webstore) |
| Google Tag Assistant | Validate gtag.js | Chrome extension |
| Browser DevTools | Check dataLayer & fbq calls | Console: `window.dataLayer`, `window.fbq` |

### Testing Checklist

- [ ] Events fire on correct triggers
- [ ] Properties populate with correct values
- [ ] Both GA4 and Meta receive events
- [ ] No duplicate events
- [ ] UTM parameters persist through session
- [ ] Cookie consent blocks/allows correctly
- [ ] Works on mobile and desktop
- [ ] No console errors

### How to Test

1. **Enable GA4 Debug Mode:**
   ```javascript
   // Add to browser console
   window.gtag('config', 'G-ZTR1QX14YK', { debug_mode: true });
   ```

2. **Check Meta Pixel:**
   - Install Meta Pixel Helper extension
   - Look for green checkmark
   - Verify events in "Events" tab

3. **Manual Event Test:**
   ```javascript
   // Fire test event from console
   trackEvent('test_event', { test_property: 'test_value' });

   // Check dataLayer
   console.log(window.dataLayer);

   // Check Meta queue
   console.log(window.fbq.queue);
   ```

---

## Performance Optimization

### Current Strategy ✅

Our analytics implementation is **performance-optimized**:

1. **Lazy Loading** - Scripts load on user interaction or idle
2. **Async/Defer** - Non-blocking script loading
3. **DNS Prefetch** - Pre-resolve DNS for analytics domains
4. **Idle Callback** - Uses `requestIdleCallback` for deferred load

```typescript
// From analytics.ts
const runOnIdle = (cb: () => void, timeout = 1500) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(cb, { timeout });
  } else {
    window.setTimeout(cb, timeout);
  }
};
```

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Load Impact | < 100ms | ✅ Deferred |
| Time to Interactive | < 3s | ✅ No blocking |
| Analytics Load | After user interaction | ✅ Yes |

---

## Dashboard Setup

### GA4 Custom Reports

**Recommended Reports:**

1. **Conversion Funnel**
   - Events: `page_view` → `rate_viewed` → `begin_checkout` → `generate_lead`

2. **Transaction Analysis**
   - Custom dimension: `transaction_type`
   - Metrics: Event count, Avg `amount_usd`

3. **Social Traffic**
   - Source/Medium: `facebook/cpc`, `instagram/story`
   - Landing page: `/`
   - Conversions: `generate_lead`

4. **Campaign Performance**
   - Group by: `utm_campaign`
   - Metrics: Users, Lead events, Avg value

### Meta Events Manager

**Events to Monitor:**

1. **Lead** - Total count, value, cost per lead
2. **InitiateCheckout** - Upper-funnel volume
3. **PageView** - Baseline traffic

---

## Maintenance Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Review event data quality | Weekly | Marketing |
| Check for tracking errors | Weekly | Dev |
| Update UTM parameters | Per campaign | Marketing |
| Audit conversion rates | Monthly | Marketing + Dev |
| Review GA4/Meta setup | Quarterly | Dev |
| Update tracking plan | As needed | Dev |

---

## Quick Reference

### Import Analytics

```typescript
import {
  trackEvent,
  trackViewContent,
  trackInitiateCheckout,
  trackLeadWithValue
} from '../services/analytics';
```

### Common Patterns

```typescript
// Simple event
trackEvent('button_clicked');

// Event with properties
trackEvent('calculator_used', { amount: 100, type: 'convert' });

// Standard event
trackViewContent({ page: 'landing', section: 'hero' });

// High-value conversion
trackLeadWithValue({
  value: 100,
  currency: 'USD',
  mode: 'convert',
  rate: 15350
});
```

---

## Appendix: Event Library

### Complete Event List (Current + Recommended)

| # | Event Name | Status | Priority |
|---|------------|--------|----------|
| 1 | page_view | ✅ Auto | - |
| 2 | rate_viewed | ✅ Implemented | High |
| 3 | cta_hero_click | ✅ Implemented | High |
| 4 | cta_footer_click | ✅ Implemented | Medium |
| 5 | social_follow_click | ✅ Implemented | Low |
| 6 | faq_open_question | ✅ Implemented | Low |
| 7 | scroll_depth | ✅ Partial (50%) | Medium |
| 8 | click_sticky_mobile_cta | ✅ Implemented | Medium |
| 9 | wizard_opened | ❌ Needed | High |
| 10 | wizard_step_completed | ❌ Needed | High |
| 11 | amount_calculated | ❌ Needed | High |
| 12 | bank_selected | ❌ Needed | High |
| 13 | transaction_submitted | ❌ Needed | Critical |
| 14 | transaction_error | ❌ Needed | High |
| 15 | nav_click | ❌ Needed | Medium |
| 16 | trust_badge_click | ❌ Needed | Low |
| 17 | how_it_works_expand | ❌ Needed | Low |
| 18 | payment_method_view | ❌ Needed | Low |
| 19 | calculator_interaction | ❌ Needed | Medium |
| 20 | promo_banner_click | ❌ Needed | Low |

---

**Questions or Issues?**
Contact: Developer Team
Document Version: 1.0
