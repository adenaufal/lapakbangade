# Analytics Implementation Guide

This guide provides **copy-paste code snippets** to implement the enhanced analytics tracking outlined in `ANALYTICS_TRACKING_PLAN.md`.

---

## 1. Enhanced TransactionWizard Tracking

**File:** `/components/TransactionWizard.tsx`

### Add Import

```typescript
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';
```

### Track Wizard Opening

Add this inside the `TransactionWizard` component when modal opens:

```typescript
useEffect(() => {
  // Track wizard opening
  trackEvent('wizard_opened', { transaction_type: transactionType });
  trackInitiateCheckout({
    transaction_type: transactionType,
    source: 'wizard_modal'
  });
}, []);
```

### Track Step Completion

Add this when user moves to next step:

```typescript
const handleNextStep = () => {
  // Track step completion before moving
  trackEvent('wizard_step_completed', {
    step_number: currentStep,
    step_name: getStepName(currentStep),
    type: transactionType
  });

  setCurrentStep(prev => prev + 1);
};

// Helper function for step names
const getStepName = (step: number): string => {
  const stepNames = {
    0: 'type_selection',
    1: 'amount_input',
    2: 'bank_selection',
    3: 'confirmation',
    4: 'submission'
  };
  return stepNames[step] || 'unknown';
};
```

### Track Amount Calculation

Add this when rate/amount is calculated:

```typescript
useEffect(() => {
  if (usdAmount > 0 && calculatedRate) {
    trackEvent('amount_calculated', {
      amount_usd: usdAmount,
      amount_idr: calculatedIDR,
      rate: calculatedRate,
      fee: calculatedFee,
      type: transactionType
    });
  }
}, [usdAmount, calculatedRate, calculatedIDR, calculatedFee, transactionType]);
```

### Track Bank Selection

Add this when user selects bank/wallet:

```typescript
const handleBankSelect = (bankName: string) => {
  setSelectedBank(bankName);

  trackEvent('bank_selected', {
    bank_name: bankName,
    type: transactionType
  });
};
```

### Track Transaction Submission

Add this in the submit handler:

```typescript
const handleSubmit = async () => {
  try {
    // Track submission attempt
    trackEvent('transaction_submitted', {
      amount_usd: finalUSD,
      amount_idr: finalIDR,
      type: transactionType,
      bank: selectedBank,
      fee: calculatedFee
    });

    // Track high-value lead for Meta optimization
    trackLeadWithValue({
      value: finalUSD,
      currency: 'USD',
      mode: transactionType,
      rate: exchangeRate
    });

    // Proceed with API call
    const response = await createTransaction({...});

    if (response.success) {
      onSuccess();
    }
  } catch (error) {
    // Track errors
    trackEvent('transaction_error', {
      error_type: error.type || 'unknown',
      step: 'submission',
      type: transactionType
    });

    console.error('Transaction failed:', error);
  }
};
```

### Track Validation Errors

```typescript
const validateStep = () => {
  if (currentStep === 1 && usdAmount < 1) {
    trackEvent('transaction_error', {
      error_type: 'validation',
      step: 'amount_input',
      type: transactionType,
      message: 'amount_too_low'
    });
    return false;
  }

  if (currentStep === 2 && !selectedBank) {
    trackEvent('transaction_error', {
      error_type: 'validation',
      step: 'bank_selection',
      type: transactionType,
      message: 'no_bank_selected'
    });
    return false;
  }

  return true;
};
```

---

## 2. Navigation Tracking

**File:** `/components/Navbar.tsx`

### Add Import

```typescript
import { trackEvent } from '../services/analytics';
```

### Track Nav Clicks

Modify the nav links rendering:

```typescript
{NAV_LINKS.map((link) => (
  <a
    key={link.name}
    href={link.href}
    onClick={() => trackEvent('nav_click', {
      link_name: link.name,
      destination: link.href
    })}
    className="text-gray-700 hover:text-brand-600 transition-colors"
  >
    {link.name}
  </a>
))}
```

### Track Login Button

```typescript
<button
  onClick={() => {
    trackEvent('login_clicked', { source: 'navbar' });
    // ... existing login logic
  }}
  className="..."
>
  Login
</button>
```

---

## 3. Enhanced Scroll Depth Tracking

**File:** `/components/LandingPage.tsx`

### Replace existing scroll tracking with:

```typescript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Track 50% scroll
    if (scrollPercentage >= 50 && !window.hasTrackedScroll50) {
      trackEvent('scroll_depth', { percentage: 50 });
      window.hasTrackedScroll50 = true;
    }

    // Track 75% scroll
    if (scrollPercentage >= 75 && !window.hasTrackedScroll75) {
      trackEvent('scroll_depth', { percentage: 75 });
      window.hasTrackedScroll75 = true;
    }

    // Track 100% scroll
    if (scrollPercentage >= 100 && !window.hasTrackedScroll100) {
      trackEvent('scroll_depth', { percentage: 100 });
      window.hasTrackedScroll100 = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Update types.ts

```typescript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    hasTrackedScroll50?: boolean;
    hasTrackedScroll75?: boolean;
    hasTrackedScroll100?: boolean;
  }
}
```

---

## 4. Trust Section Tracking

**File:** `/components/TrustSection.tsx`

### Add Import

```typescript
import { trackEvent } from '../services/analytics';
```

### Track Badge Clicks (if clickable)

```typescript
<div
  onClick={() => trackEvent('trust_badge_click', {
    badge_type: 'manual_verification'
  })}
  className="cursor-pointer"
>
  {/* Trust badge content */}
</div>
```

### Track Section View

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('section_viewed', { section: 'trust_badges' });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const section = document.querySelector('#trust');
  if (section) observer.observe(section);

  return () => observer.disconnect();
}, []);
```

---

## 5. How It Works Tracking

**File:** `/components/HowItWorks.tsx`

### Track Step Interactions

If your "How It Works" has expandable steps:

```typescript
import { trackEvent } from '../services/analytics';

const handleStepClick = (stepIndex: number, stepTitle: string) => {
  trackEvent('how_it_works_expand', {
    step_number: stepIndex + 1,
    step_title: stepTitle
  });
};
```

---

## 6. Payment Methods Tracking

**File:** `/components/PaymentMethods.tsx`

### Track Section View

```typescript
import { trackEvent } from '../services/analytics';

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('payment_method_view', {
            method_category: 'all'
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const section = document.querySelector('#payment-methods');
  if (section) observer.observe(section);

  return () => observer.disconnect();
}, []);
```

---

## 7. Enhanced Hero Calculator Tracking

**File:** `/components/Hero.tsx`

### Track Calculator Interactions (Non-CTA)

Add this to track when users play with the calculator without clicking CTA:

```typescript
// Debounced calculator interaction tracking
useEffect(() => {
  const timeout = setTimeout(() => {
    if (usdAmount > 0 && !hasClickedCTA) {
      trackEvent('calculator_interaction', {
        mode: transactionType,
        amount: usdAmount
      });
    }
  }, 2000); // Track after 2s of no input

  return () => clearTimeout(timeout);
}, [usdAmount, transactionType]);
```

---

## 8. Footer Link Tracking

**File:** `/components/Footer.tsx`

### Track All Footer Links

```typescript
import { trackEvent } from '../services/analytics';

// For privacy/terms links
<a
  href="/privacy"
  onClick={() => trackEvent('footer_link_click', {
    link_text: 'Privacy Policy',
    link_url: '/privacy'
  })}
>
  Privacy Policy
</a>

<a
  href="/terms"
  onClick={() => trackEvent('footer_link_click', {
    link_text: 'Terms of Service',
    link_url: '/terms'
  })}
>
  Terms of Service
</a>

// For social links
<a
  href={CONFIG.FACEBOOK_URL}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent('social_follow_click', {
    platform: 'facebook',
    source: 'footer'
  })}
>
  Facebook
</a>
```

---

## 9. Testimonials Tracking (Optional)

**File:** `/components/Testimonials.tsx`

### Track Testimonial Views

```typescript
import { trackEvent } from '../services/analytics';

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const testimonialId = entry.target.getAttribute('data-testimonial-id');
          trackEvent('testimonial_viewed', {
            testimonial_id: testimonialId
          });
        }
      });
    },
    { threshold: 0.7 }
  );

  const testimonials = document.querySelectorAll('[data-testimonial-id]');
  testimonials.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);
```

Then add `data-testimonial-id` to each testimonial card:

```tsx
<div data-testimonial-id={testimonial.id} className="testimonial-card">
  {/* Testimonial content */}
</div>
```

---

## 10. Dashboard Tracking

**File:** `/components/Dashboard.tsx`

### Track Dashboard Views

```typescript
import { trackEvent } from '../services/analytics';

useEffect(() => {
  trackEvent('dashboard_viewed', {
    has_transactions: transactions.length > 0,
    transaction_count: transactions.length
  });
}, [transactions]);
```

### Track Transaction Detail Views

```typescript
const handleViewTransaction = (transactionId: string) => {
  trackEvent('transaction_detail_viewed', {
    transaction_id: transactionId
  });
  // ... open modal
};
```

---

## 11. Friday Promo Banner Tracking

If you add a Friday discount banner:

**File:** `/components/PromoBanner.tsx` (or wherever banner lives)

```typescript
import { trackEvent } from '../services/analytics';

const handleBannerClick = () => {
  trackEvent('promo_banner_click', {
    promo_type: 'friday_50_discount',
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' })
  });
};

<div
  onClick={handleBannerClick}
  className="promo-banner cursor-pointer"
>
  🎉 Friday Special: 50% Off Fees!
</div>
```

---

## 12. Enhanced Analytics Service (Optional Additions)

**File:** `/services/analytics.ts`

### Add Helper for Page-Specific Tracking

```typescript
/**
 * Track page views with enhanced context
 */
export const trackPageView = (pageName: string, metadata?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const payload = {
    page_name: pageName,
    page_path: window.location.pathname,
    page_hash: window.location.hash,
    ...metadata
  };

  if (window.gtag) {
    window.gtag('event', 'page_view', payload);
  }

  if (window.fbq) {
    window.fbq('track', 'PageView', payload);
  }
};
```

### Add Error Tracking Helper

```typescript
/**
 * Track JavaScript errors
 */
export const trackError = (error: Error, context?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const payload = {
    error_message: error.message,
    error_stack: error.stack?.substring(0, 200), // Truncate
    ...context
  };

  if (window.gtag) {
    window.gtag('event', 'exception', payload);
  }

  // Note: Meta Pixel doesn't have standard error event
  // Can use custom event if needed
};
```

Usage:

```typescript
try {
  // ... code
} catch (error) {
  trackError(error, { component: 'TransactionWizard', action: 'submit' });
  throw error;
}
```

---

## 13. Global Error Boundary Tracking

**File:** `/App.tsx`

Add global error tracking:

```typescript
import { trackError } from './services/analytics';

useEffect(() => {
  const handleError = (event: ErrorEvent) => {
    trackError(event.error, {
      type: 'uncaught_error',
      filename: event.filename,
      lineno: event.lineno
    });
  };

  const handleRejection = (event: PromiseRejectionEvent) => {
    trackError(new Error(String(event.reason)), {
      type: 'unhandled_rejection'
    });
  };

  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleRejection);

  return () => {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleRejection);
  };
}, []);
```

---

## 14. Testing Utilities

Add to bottom of `analytics.ts` for development testing:

```typescript
/**
 * Development helper: Log all tracking calls to console
 */
export const enableAnalyticsDebug = () => {
  if (typeof window === 'undefined') return;

  const originalTrackEvent = trackEvent;

  (window as any).trackEvent = (...args: any[]) => {
    console.log('📊 Analytics Event:', args);
    return originalTrackEvent(...args);
  };

  console.log('✅ Analytics debug mode enabled');
};

// Usage in browser console:
// enableAnalyticsDebug()
```

---

## Quick Implementation Checklist

Use this checklist to track implementation progress:

### High Priority (Conversion Funnel)
- [ ] TransactionWizard: wizard_opened
- [ ] TransactionWizard: wizard_step_completed
- [ ] TransactionWizard: amount_calculated
- [ ] TransactionWizard: bank_selected
- [ ] TransactionWizard: transaction_submitted
- [ ] TransactionWizard: transaction_error

### Medium Priority (Engagement)
- [ ] Navbar: nav_click
- [ ] Hero: calculator_interaction
- [ ] LandingPage: scroll_depth (75%, 100%)
- [ ] Footer: footer_link_click
- [ ] Dashboard: dashboard_viewed

### Low Priority (Nice to Have)
- [ ] TrustSection: trust_badge_click
- [ ] HowItWorks: how_it_works_expand
- [ ] PaymentMethods: payment_method_view
- [ ] Testimonials: testimonial_viewed
- [ ] PromoBanner: promo_banner_click

### Testing
- [ ] Test in GA4 DebugView
- [ ] Test with Meta Pixel Helper
- [ ] Verify events fire correctly
- [ ] Check property values
- [ ] Test on mobile
- [ ] Verify no console errors

---

## Common Pitfalls to Avoid

1. **Don't track on every render** - Use `useEffect` or event handlers, not render functions
2. **Don't send PII** - Never include email, phone, account numbers
3. **Don't duplicate events** - Check if event already tracked before re-firing
4. **Don't block UI** - Analytics should never prevent user actions
5. **Do use meaningful property names** - `transaction_type` not `type`, `amount_usd` not `amount`

---

## Next Steps

1. **Start with high-priority events** - Focus on conversion funnel first
2. **Test thoroughly** - Use GA4 DebugView and Meta Pixel Helper
3. **Monitor data quality** - Check GA4 reports after 24-48 hours
4. **Iterate** - Add more events as you identify tracking gaps
5. **Document changes** - Update `ANALYTICS_TRACKING_PLAN.md` when adding events

---

**Need Help?**
- Review: `ANALYTICS_TRACKING_PLAN.md` for strategy
- Debug: Use browser console + GA4 DebugView
- Reference: `/services/analytics.ts` for existing patterns
