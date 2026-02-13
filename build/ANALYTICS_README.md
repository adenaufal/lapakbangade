# Analytics Tracking - Complete Guide

**Lapak Bang Ade Analytics Documentation**

This folder contains the complete analytics tracking setup for Lapak Bang Ade, a PayPal-to-IDR conversion service.

---

## 📚 Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| **QUICK_START_ANALYTICS.md** | ⚡ Implement critical events in 30 min | Developers (start here!) |
| **ANALYTICS_TRACKING_PLAN.md** | 📊 Complete tracking strategy | Marketing + Dev |
| **ANALYTICS_IMPLEMENTATION.md** | 💻 Detailed code examples | Developers |
| **UTM_CAMPAIGN_TEMPLATES.md** | 🔗 UTM parameter templates | Marketing |
| **This file (README)** | 🗺️ Overview & navigation | Everyone |

---

## 🎯 Quick Start (For Developers)

**Never set up analytics before?** Start here:

1. ✅ **Already done:** Basic analytics is working (GA4 + Meta Pixel)
2. 📖 **Read:** [QUICK_START_ANALYTICS.md](./QUICK_START_ANALYTICS.md) (10 min read)
3. 💻 **Implement:** Add 3 critical tracking updates (~30 min)
4. 🧪 **Test:** Use GA4 DebugView + Meta Pixel Helper
5. 🎉 **Done!** You'll track 80% of critical conversions

**Want the full implementation?** See [ANALYTICS_IMPLEMENTATION.md](./ANALYTICS_IMPLEMENTATION.md)

---

## 📊 Current Analytics Status

### ✅ What's Already Working

| Feature | Status | Details |
|---------|--------|---------|
| **GA4 Integration** | ✅ Active | Tracking ID: `G-ZTR1QX14YK` |
| **Meta Pixel** | ✅ Active | Pixel ID: `837636162306241` |
| **Cookie Consent** | ✅ Implemented | Implicit consent model |
| **Performance Optimization** | ✅ Done | Lazy-load, idle callback |
| **Basic Events** | ✅ Tracking | Hero CTA, FAQ, social clicks, scroll 50% |

### ⚠️ What Needs Adding (High Priority)

| Feature | Impact | Docs |
|---------|--------|------|
| **Transaction Wizard Funnel** | 🔴 Critical | [Quick Start](./QUICK_START_ANALYTICS.md) |
| **Enhanced Scroll Depth** | 🟡 Medium | [Quick Start](./QUICK_START_ANALYTICS.md) |
| **Navigation Tracking** | 🟡 Medium | [Quick Start](./QUICK_START_ANALYTICS.md) |
| **Error Tracking** | 🟡 Medium | [Implementation](./ANALYTICS_IMPLEMENTATION.md) |

---

## 🔧 Implementation Overview

### Tech Stack

- **Framework:** React + TypeScript + Vite
- **Router:** React Router DOM
- **Analytics Service:** `/services/analytics.ts`
- **Platforms:** Google Analytics 4 (GA4) + Meta Pixel (Facebook)

### Architecture

```
┌─────────────────────────────────────────────────┐
│  App.tsx                                        │
│  └─ initAnalytics() on mount                   │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  services/analytics.ts                          │
│  ├─ Lazy-load GA4 & Meta Pixel scripts         │
│  ├─ trackEvent()                                │
│  ├─ trackViewContent()                          │
│  ├─ trackInitiateCheckout()                     │
│  └─ trackLeadWithValue()                        │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌─────────────────┐       ┌─────────────────┐
│  GA4            │       │  Meta Pixel     │
│  (gtag.js)      │       │  (fbevents.js)  │
└─────────────────┘       └─────────────────┘
```

### Event Flow Example

```typescript
// User clicks Hero CTA
onClick={() => {
  trackEvent('cta_hero_click', {
    transaction_type: 'convert',
    amount: 100
  });

  trackLeadWithValue({
    value: 100,
    currency: 'USD',
    mode: 'convert',
    rate: 15350
  });
}}
```

**What happens:**
1. `trackEvent()` fires custom event to GA4
2. `trackLeadWithValue()` fires standard "Lead" event to GA4 + Meta
3. Meta uses `value` to optimize ads for high-value conversions
4. GA4 records event with all properties

---

## 📈 Key Metrics We Track

### Conversion Funnel

```
Page View (Automatic)
    ↓
Rate Viewed (rate_viewed)
    ↓
Wizard Opened (wizard_opened + begin_checkout)
    ↓
Transaction Submitted (transaction_submitted + generate_lead)
```

### Engagement Metrics

- **Scroll Depth:** 50%, 75%, 100%
- **Navigation:** Menu clicks, footer links
- **Social:** Facebook, Instagram clicks
- **Content:** FAQ opens, testimonial views

### Campaign Attribution

- **UTM Parameters:** Source, medium, campaign, content
- **Traffic Sources:** Organic, paid, social, referral
- **Conversion Value:** USD transaction amounts

---

## 🎯 Business Objectives

### 1. Optimize Meta Ads for High-Value Conversions

**How:** Send actual transaction `value` to Meta Pixel

```typescript
fbq('track', 'Lead', {
  value: 100,        // USD transaction amount
  currency: 'USD',
  content_name: 'Convert USD to IDR'
});
```

**Why:** Facebook optimizes for users likely to convert with higher amounts → Better ROAS

### 2. Measure Conversion Funnel Drop-off

**Funnel:**
1. Landing page view (100%)
2. Calculator interaction (X%)
3. Wizard opened (Y%)
4. Transaction submitted (Z%)

**Goal:** Identify where users drop off, optimize those steps

### 3. Attribution - What Channels Work?

**Questions we can answer:**
- Which Facebook ad brings highest-value conversions?
- Do Instagram Stories or Feed posts convert better?
- What's the ROI of Google Search ads?

**How:** UTM parameters + conversion tracking

---

## 🔗 UTM Parameter Strategy

### Standard Format

```
https://lapakbangade.com/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

### Example Campaigns

**Facebook Ad - Convert Service**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=image_ad_v1
```

**Instagram Story - Friday Promo**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=story&utm_campaign=friday_promo_week1_feb2026&utm_content=swipe_up
```

**📚 Full Templates:** See [UTM_CAMPAIGN_TEMPLATES.md](./UTM_CAMPAIGN_TEMPLATES.md)

---

## 🧪 Testing & Validation

### Tools Required

1. **GA4 DebugView** - Real-time event monitoring
   - Access: [Google Analytics](https://analytics.google.com) → Configure → DebugView

2. **Meta Pixel Helper** - Chrome extension
   - Install: [Chrome Web Store](https://chrome.google.com/webstore/detail/meta-pixel-helper)

3. **Browser DevTools** - Console debugging
   - Check: `window.dataLayer`, `window.gtag`, `window.fbq`

### Quick Test

```javascript
// 1. Open browser console
// 2. Enable GA4 debug mode
window.gtag('config', 'G-ZTR1QX14YK', { debug_mode: true });

// 3. Fire test event
trackEvent('test_event', { test_property: 'hello' });

// 4. Check dataLayer
console.log(window.dataLayer);

// 5. Verify in GA4 DebugView (refresh if needed)
```

### Validation Checklist

- [ ] Events fire on correct triggers
- [ ] Properties contain correct values (not undefined)
- [ ] Both GA4 and Meta Pixel receive events
- [ ] No duplicate events
- [ ] No console errors
- [ ] Works on mobile
- [ ] Cookie consent blocks/allows correctly

---

## 🔐 Privacy & Compliance

### Current Setup ✅

- **Implicit Consent:** Analytics loads unless user declines
- **Cookie Consent UI:** Banner with accept/decline options
- **Data Storage:** localStorage `cookie_consent` key
- **No PII:** Never send email, phone, or account numbers
- **IP Anonymization:** Automatic in GA4

### Compliance

- ✅ GDPR (EU) - Consent required, provided
- ✅ Privacy Policy - Disclosed on website
- ✅ Data Retention - 14 months (GA4 default)

---

## 📊 GA4 Dashboard Setup

### Recommended Custom Reports

1. **Conversion Funnel Report**
   - Exploration → Funnel exploration
   - Steps: `page_view` → `rate_viewed` → `wizard_opened` → `transaction_submitted`

2. **Campaign Performance**
   - Dimensions: Session source/medium, Campaign name
   - Metrics: Users, Conversions, Conversion value

3. **Transaction Analysis**
   - Custom dimension: `transaction_type` (convert/topup)
   - Metric: Avg `amount_usd`

4. **UTM Content A/B Test**
   - Dimension: Session manual term (utm_content)
   - Compare: Conversion rates by ad variation

### Key Conversions to Mark

**GA4 Admin → Events → Mark as Conversion:**
- ✅ `generate_lead` - Primary conversion
- ✅ `transaction_submitted` - Alternative conversion metric
- ⚠️ `begin_checkout` - Upper-funnel optimization

---

## 🚀 Performance Optimization

### Current Optimizations ✅

1. **Lazy Loading** - Scripts load after user interaction or on idle
2. **Async/Defer** - Non-blocking script execution
3. **DNS Prefetch** - Pre-resolve analytics domains
4. **Idle Callback** - Uses `requestIdleCallback` when available

### Performance Impact

| Metric | Target | Status |
|--------|--------|--------|
| First Load Delay | < 100ms | ✅ ~0ms (deferred) |
| Time to Interactive | < 3s | ✅ No blocking |
| Analytics Load | After interaction | ✅ Yes |

**Code Reference:** `/services/analytics.ts` lines 29-35

---

## 🛠️ Maintenance

### Regular Tasks

| Task | Frequency | Owner |
|------|-----------|-------|
| Check event data quality | Weekly | Marketing |
| Monitor tracking errors | Weekly | Dev |
| Review conversion rates | Bi-weekly | Marketing + Dev |
| Update UTM parameters | Per campaign | Marketing |
| Audit GA4 setup | Quarterly | Dev |

### How to Check Data Quality

1. **GA4 Reports** → Events
   - Look for: Consistent event counts, no sudden drops
   - Check: Properties are populated (not "(not set)")

2. **Meta Events Manager**
   - Look for: Steady Lead events, value populated
   - Check: Pixel status is "Active"

3. **Browser Console**
   - Check: No JavaScript errors
   - Verify: `window.gtag` and `window.fbq` exist

---

## 📖 Documentation Guide

### For Developers

**First time?**
1. Read [QUICK_START_ANALYTICS.md](./QUICK_START_ANALYTICS.md) (30 min implementation)
2. Test using GA4 DebugView + Meta Pixel Helper
3. Ship and monitor for 2-3 days

**Need more events?**
- See [ANALYTICS_IMPLEMENTATION.md](./ANALYTICS_IMPLEMENTATION.md) for all events
- Copy-paste code snippets for specific components

**Debugging issues?**
- Check [ANALYTICS_TRACKING_PLAN.md](./ANALYTICS_TRACKING_PLAN.md) → Debugging section

### For Marketers

**Setting up campaigns?**
1. Use [UTM_CAMPAIGN_TEMPLATES.md](./UTM_CAMPAIGN_TEMPLATES.md) for URL building
2. Document all UTMs in tracking spreadsheet
3. Test URLs before launching

**Analyzing performance?**
- Read [ANALYTICS_TRACKING_PLAN.md](./ANALYTICS_TRACKING_PLAN.md) → Dashboard Setup
- Create custom GA4 reports for your KPIs

---

## 🎓 Learning Resources

### GA4

- **GA4 Documentation:** https://support.google.com/analytics/
- **DebugView Guide:** https://support.google.com/analytics/answer/7201382
- **Event Setup:** https://developers.google.com/analytics/devguides/collection/ga4/events

### Meta Pixel

- **Pixel Overview:** https://www.facebook.com/business/help/742478679120153
- **Standard Events:** https://developers.facebook.com/docs/meta-pixel/reference
- **Pixel Helper:** https://chrome.google.com/webstore/detail/meta-pixel-helper

### UTM Parameters

- **Campaign URL Builder:** https://ga-dev-tools.google/campaign-url-builder/
- **UTM Best Practices:** https://support.google.com/analytics/answer/1033863

---

## 🆘 Troubleshooting

### Events not firing?

1. Check browser console for errors
2. Verify `window.gtag` exists: `console.log(window.gtag)`
3. Enable debug mode: `window.gtag('config', 'G-ZTR1QX14YK', { debug_mode: true })`
4. Check GA4 DebugView

### Meta Pixel issues?

1. Install Meta Pixel Helper extension
2. Check if `window.fbq` exists: `console.log(window.fbq)`
3. Verify cookie consent is accepted
4. Look for console errors

### Duplicate events?

1. Check `useEffect` dependencies
2. Verify you're not calling `trackEvent` in render function
3. Look for multiple event listeners on same element

### UTM parameters not showing?

1. Check URL contains `?utm_source=...`
2. Verify GA4 is tracking session source/medium
3. Wait 24-48 hours for data to populate
4. Check GA4 Realtime report first

---

## 📞 Support

### Internal Resources

- **Analytics Service Code:** `/services/analytics.ts`
- **Example Implementations:** `/components/Hero.tsx`, `/components/FAQ.tsx`
- **Configuration:** `/constants.ts` (GA4 & Meta Pixel IDs)

### External Help

- **GA4 Support:** https://support.google.com/analytics/
- **Meta Business Help:** https://www.facebook.com/business/help/

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-13 | Initial analytics documentation |
| - | - | - GA4 + Meta Pixel integration documented |
| - | - | - UTM templates created |
| - | - | - Implementation guides written |

---

## ✅ Next Steps

### Immediate (This Week)

1. [ ] **Developers:** Implement Priority 1 events from [QUICK_START_ANALYTICS.md](./QUICK_START_ANALYTICS.md)
2. [ ] **Test:** Verify events in GA4 DebugView
3. [ ] **Monitor:** Check data quality after 24-48 hours

### Short Term (This Month)

1. [ ] Add remaining high-priority events from [ANALYTICS_IMPLEMENTATION.md](./ANALYTICS_IMPLEMENTATION.md)
2. [ ] Set up GA4 custom reports (conversion funnel, campaign performance)
3. [ ] Create UTM tracking spreadsheet

### Long Term (This Quarter)

1. [ ] Analyze conversion funnel, identify drop-off points
2. [ ] Optimize Meta ad campaigns based on Lead value data
3. [ ] A/B test ad variations using `utm_content` tracking
4. [ ] Quarterly analytics audit and documentation update

---

**🚀 Ready to get started?**

→ Developers: Go to [QUICK_START_ANALYTICS.md](./QUICK_START_ANALYTICS.md)
→ Marketers: Go to [UTM_CAMPAIGN_TEMPLATES.md](./UTM_CAMPAIGN_TEMPLATES.md)
→ Full Strategy: See [ANALYTICS_TRACKING_PLAN.md](./ANALYTICS_TRACKING_PLAN.md)

**Questions or issues?**
- Check the Troubleshooting section above
- Review existing implementations in `/components`
- Test in GA4 DebugView + browser console

---

**Document maintained by:** Development Team
**Last updated:** February 13, 2026
**Status:** ✅ Active and production-ready
