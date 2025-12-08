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

  let gaLoaded = false;
  let pixelLoaded = false;

  const runOnIdle = (cb: () => void, timeout = 1500) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(cb, { timeout });
    } else {
      window.setTimeout(cb, timeout);
    }
  };

  const loadGA = () => {
    if (gaLoaded || !CONFIG.GA_MEASUREMENT_ID) return;
    gaLoaded = true;
    addScriptOnce('ga4', () => {
      const scriptGA = document.createElement('script');
      scriptGA.async = true;
      scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`;
      scriptGA.defer = true;
      return scriptGA;
    });

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.GA_MEASUREMENT_ID);
  };

  const loadPixel = () => {
    if (pixelLoaded || !CONFIG.META_PIXEL_ID) return;
    if (window.fbq) {
      pixelLoaded = true;
      return;
    }
    pixelLoaded = true;
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
  };

  const triggerLoad = () => {
    loadGA();
    loadPixel();
    ['pointerdown', 'keydown', 'scroll'].forEach((evt) =>
      window.removeEventListener(evt, triggerLoad)
    );
  };

  ['pointerdown', 'keydown', 'scroll'].forEach((evt) =>
    window.addEventListener(evt, triggerLoad, { once: true, passive: true })
  );

  runOnIdle(loadGA, 500);
  runOnIdle(loadPixel, 2000);
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
