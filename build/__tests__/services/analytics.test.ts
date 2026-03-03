import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initAnalytics, trackEvent, trackLeadWithValue } from '../../services/analytics';

describe('analytics service', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.fbq;
    delete window.dataLayer;
  });

  it('injects GA and Pixel scripts on init', () => {
    vi.useFakeTimers();

    initAnalytics();

    expect(document.querySelector('script[data-analytics-id="ga4"]')).toBeNull();
    expect(document.querySelector('script[data-analytics-id="meta-pixel"]')).toBeNull();

    vi.advanceTimersByTime(500);
    expect(document.querySelector('script[data-analytics-id="ga4"]')).toBeInTheDocument();
    expect(window.gtag).toBeTypeOf('function');

    vi.advanceTimersByTime(1500);
    expect(document.querySelector('script[data-analytics-id="meta-pixel"]')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('maps standard events to GA4 and Meta Pixel', () => {
    const gtagSpy = vi.fn();
    const fbqSpy = vi.fn();
    window.gtag = gtagSpy;
    window.fbq = fbqSpy;

    trackEvent('InitiateCheckout', { value: 60, currency: 'USD' });

    expect(gtagSpy).toHaveBeenCalledWith('event', 'begin_checkout', {
      value: 60,
      currency: 'USD',
    });
    expect(fbqSpy).toHaveBeenCalledWith('track', 'InitiateCheckout', {
      value: 60,
      currency: 'USD',
    });
  });

  it('sends non-standard events as custom events', () => {
    const gtagSpy = vi.fn();
    const fbqSpy = vi.fn();
    window.gtag = gtagSpy;
    window.fbq = fbqSpy;

    trackEvent('cta_hero_click', { mode: 'convert' });

    expect(gtagSpy).toHaveBeenCalledWith('event', 'cta_hero_click', { mode: 'convert' });
    expect(fbqSpy).toHaveBeenCalledWith('trackCustom', 'cta_hero_click', {
      mode: 'convert',
    });
  });

  it('tracks lead with value for both providers', () => {
    const gtagSpy = vi.fn();
    const fbqSpy = vi.fn();
    window.gtag = gtagSpy;
    window.fbq = fbqSpy;

    trackLeadWithValue({
      value: 100,
      currency: 'USD',
      mode: 'convert',
      rate: 16450,
    });

    expect(fbqSpy).toHaveBeenCalledWith('track', 'Lead', {
      value: 100,
      currency: 'USD',
      content_name: 'Convert USD to IDR',
      content_category: 'PayPal Conversion',
    });
    expect(gtagSpy).toHaveBeenCalledWith('event', 'generate_lead', {
      value: 100,
      currency: 'USD',
      transaction_type: 'convert',
      rate: 16450,
    });
  });
});
