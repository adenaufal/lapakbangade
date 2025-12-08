import { CONFIG } from '../constants';

// Initialize Analytics Scripts dynamically
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Initialize GA4
  const scriptGA = document.createElement('script');
  scriptGA.async = true;
  scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`;
  document.head.appendChild(scriptGA);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', CONFIG.GA_MEASUREMENT_ID);

  // Initialize Meta Pixel
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
  document.head.appendChild(scriptPixel);
};

// Track Custom Events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // GA4 Event
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    
    // Meta Pixel Custom Event
    if (window.fbq) {
      window.fbq('trackCustom', eventName, params);
    }
  }
};

export const trackConversion = (currency: string, value: number) => {
    if (typeof window !== 'undefined') {
        if (window.fbq) {
            window.fbq('track', 'Contact', { currency, value });
        }
        if (window.gtag) {
            window.gtag('event', 'generate_lead', { currency, value });
        }
    }
}
