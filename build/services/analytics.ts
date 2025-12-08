import { CONFIG } from '../constants';

type StandardEventName = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Lead';

const STANDARD_EVENT_MAP: Record<StandardEventName, { ga: string; fb: string }> = {
  PageView: { ga: 'page_view', fb: 'PageView' },
  ViewContent: { ga: 'view_item', fb: 'ViewContent' },
  InitiateCheckout: { ga: 'begin_checkout', fb: 'InitiateCheckout' },
  Lead: { ga: 'generate_lead', fb: 'Lead' },
};

const isStandardEvent = (eventName: string): eventName is StandardEventName =>
  Boolean(STANDARD_EVENT_MAP[eventName as StandardEventName]);

const addScriptOnce = (id: string, getScript: () => HTMLScriptElement) => {
  if (document.querySelector(`script[data-analytics-id="${id}"]`)) return;
  const script = getScript();
  script.dataset.analyticsId = id;
  document.head.appendChild(script);
};

// Initialize Analytics Scripts dynamically
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Initialize GA4 if ID is provided
  if (CONFIG.GA_MEASUREMENT_ID) {
    addScriptOnce('ga4', () => {
      const scriptGA = document.createElement('script');
      scriptGA.async = true;
      scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`;
      return scriptGA;
    });

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.GA_MEASUREMENT_ID);
  } else {
    console.warn('GA_MEASUREMENT_ID is missing; GA4 will not be initialized.');
  }

  // Initialize Meta Pixel if ID is provided
  if (CONFIG.META_PIXEL_ID) {
    addScriptOnce('meta-pixel', () => {
      const scriptPixel = document.createElement('script');
      scriptPixel.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${CONFIG.META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      return scriptPixel;
    });
  } else {
    console.warn('META_PIXEL_ID is missing; Meta Pixel will not be initialized.');
  }
};

// Track Custom & Standard Events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  const payload = params || {};

  if (isStandardEvent(eventName)) {
    const standard = STANDARD_EVENT_MAP[eventName];

    if (window.gtag) {
      window.gtag('event', standard.ga, payload);
    }
    if (window.fbq) {
      window.fbq('track', standard.fb, payload);
    }
    return;
  }

  if (window.gtag) {
    window.gtag('event', eventName, payload);
  }
  
  if (window.fbq) {
    window.fbq('trackCustom', eventName, payload);
  }
};

export const trackViewContent = (params?: Record<string, any>) => {
  trackEvent('ViewContent', params);
};

export const trackInitiateCheckout = (params?: Record<string, any>) => {
  trackEvent('InitiateCheckout', params);
};

export const trackConversion = (currency: string, value: number) => {
  trackEvent('Lead', { currency, value });
};
