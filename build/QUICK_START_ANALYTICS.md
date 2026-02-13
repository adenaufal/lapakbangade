# Quick Start: Analytics Implementation

**Goal:** Add the most critical conversion tracking in ~30 minutes

This is a streamlined guide focusing on **high-impact events only**. For comprehensive implementation, see `ANALYTICS_IMPLEMENTATION.md`.

---

## Priority 1: Transaction Wizard Funnel (CRITICAL)

This is your **#1 priority** - tracks the entire conversion flow.

### Step 1: Add to TransactionWizard.tsx

**Location:** Top of component, after imports

```typescript
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';
```

### Step 2: Track Wizard Opening

Find where the wizard component mounts or opens. Add:

```typescript
useEffect(() => {
  trackEvent('wizard_opened', { transaction_type: transactionType });
  trackInitiateCheckout({ transaction_type: transactionType });
}, []);
```

### Step 3: Track Final Submission

Find the `handleSubmit` or transaction submission function. Add **before** the API call:

```typescript
const handleSubmit = async () => {
  // ✅ ADD THIS - Track submission
  trackEvent('transaction_submitted', {
    amount_usd: finalUSD,
    amount_idr: finalIDR,
    type: transactionType,
    bank: selectedBank
  });

  trackLeadWithValue({
    value: finalUSD,
    currency: 'USD',
    mode: transactionType,
    rate: exchangeRate
  });

  // Existing API call
  try {
    const response = await createTransaction({...});
    // ... rest of code
  } catch (error) {
    // ✅ ADD THIS - Track errors
    trackEvent('transaction_error', {
      error_type: 'submission_failed',
      type: transactionType
    });
  }
};
```

**✅ Done!** You now track the most critical conversion events.

---

## Priority 2: Enhanced Scroll Depth (5 minutes)

Shows how engaged users are with your content.

### Update LandingPage.tsx

**Find:** Existing scroll tracking (around line 23)

**Replace with:**

```typescript
useEffect(() => {
  const handleScroll = () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrolled >= 50 && !window.hasTrackedScroll50) {
      trackEvent('scroll_depth', { percentage: 50 });
      window.hasTrackedScroll50 = true;
    }

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

### Update types.ts

Add these properties to the `Window` interface:

```typescript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    hasTrackedScroll50?: boolean;
    hasTrackedScroll75?: boolean;  // ✅ ADD
    hasTrackedScroll100?: boolean; // ✅ ADD
  }
}
```

**✅ Done!** You now track 50%, 75%, and 100% scroll depth.

---

## Priority 3: Navigation Tracking (5 minutes)

Understand how users navigate your site.

### Update Navbar.tsx

**Add import:**

```typescript
import { trackEvent } from '../services/analytics';
```

**Find:** Navigation links rendering (likely a `.map()` over `NAV_LINKS`)

**Update to:**

```typescript
{NAV_LINKS.map((link) => (
  <a
    key={link.name}
    href={link.href}
    onClick={() => trackEvent('nav_click', {
      link_name: link.name,
      destination: link.href
    })}
    // ... existing className, etc.
  >
    {link.name}
  </a>
))}
```

**✅ Done!** You now track all navigation clicks.

---

## Testing Your Implementation

### 1. Open GA4 DebugView

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property (Lapak Bang Ade)
3. Navigate to: **Configure → DebugView**
4. Keep this tab open

### 2. Test in Browser

1. Open your site in a new incognito window
2. Open browser DevTools (F12)
3. Go to Console tab
4. Type: `window.gtag('config', 'G-ZTR1QX14YK', { debug_mode: true });`
5. Press Enter

### 3. Trigger Events

- **Scroll down** → Should see `scroll_depth` events in DebugView
- **Click navigation** → Should see `nav_click`
- **Open transaction wizard** → Should see `wizard_opened`
- **Submit transaction** → Should see `transaction_submitted` + `generate_lead`

### 4. Verify in Console

Check that events are firing:

```javascript
// View dataLayer
console.log(window.dataLayer);

// View Meta Pixel events
console.log(window.fbq);
```

### 5. Use Meta Pixel Helper

1. Install [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper)
2. Visit your site
3. Click the extension icon
4. Should show:
   - ✅ Pixel found
   - ✅ PageView event
   - ✅ Lead event (when transaction submitted)

---

## What You've Accomplished

With just these 3 changes, you now track:

| Event | What It Tells You |
|-------|-------------------|
| `wizard_opened` | How many users start the conversion flow |
| `transaction_submitted` | Your primary conversion metric |
| `generate_lead` (Meta) | Optimizes Facebook ads for high-value users |
| `scroll_depth` (50/75/100) | Content engagement levels |
| `nav_click` | Navigation patterns |

### Conversion Funnel You Can Now Measure

```
Page View
    ↓
Scroll 50%
    ↓
wizard_opened (Initiate Checkout)
    ↓
transaction_submitted (Lead)
```

---

## Next Steps (Optional)

Once the above is working, consider adding:

1. **Wizard step tracking** - See where users drop off in the wizard
2. **Amount calculation tracking** - Understand typical transaction sizes
3. **Error tracking** - Identify and fix friction points
4. **Calculator interaction** - Track non-converting calculator usage

See `ANALYTICS_IMPLEMENTATION.md` for detailed implementation of these.

---

## Troubleshooting

### Events not showing in GA4 DebugView?

1. Make sure debug mode is enabled: `window.gtag('config', 'G-ZTR1QX14YK', { debug_mode: true });`
2. Check console for errors
3. Verify `window.gtag` exists: `console.log(window.gtag)`
4. Try hard refresh (Ctrl+Shift+R)

### Meta Pixel not firing?

1. Check Meta Pixel Helper extension
2. Verify `window.fbq` exists: `console.log(window.fbq)`
3. Check cookie consent - Meta loads after user interaction
4. Look for console errors

### Events fire multiple times?

1. Check if `useEffect` has proper dependencies
2. Make sure you're using event handlers correctly
3. Verify you're not calling `trackEvent` in render function

### Common Mistakes

❌ **Don't do this:**
```typescript
// This fires on every render!
const MyComponent = () => {
  trackEvent('component_rendered'); // ❌ BAD
  return <div>...</div>;
};
```

✅ **Do this instead:**
```typescript
const MyComponent = () => {
  useEffect(() => {
    trackEvent('component_mounted'); // ✅ GOOD
  }, []);
  return <div>...</div>;
};
```

---

## Quick Reference

### Import Statement

```typescript
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';
```

### Simple Event

```typescript
trackEvent('event_name', { property: 'value' });
```

### Conversion Event

```typescript
trackLeadWithValue({
  value: 100,        // USD amount
  currency: 'USD',
  mode: 'convert',   // or 'topup'
  rate: 15350
});
```

---

## Support

- **Full implementation:** See `ANALYTICS_IMPLEMENTATION.md`
- **Strategy & planning:** See `ANALYTICS_TRACKING_PLAN.md`
- **Analytics service code:** See `/services/analytics.ts`

**Questions?** Check existing implementations in:
- `/components/Hero.tsx` (rate_viewed, cta_hero_click)
- `/components/FAQ.tsx` (faq_open_question)
- `/components/LandingPage.tsx` (scroll_depth)

---

**⏱️ Time Investment:** ~30 minutes
**📊 Impact:** Track 80% of your critical conversion funnel
**🎯 Next:** Monitor data for 2-3 days, then add more events as needed
