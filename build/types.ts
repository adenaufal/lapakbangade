import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  platform: 'Facebook' | 'WhatsApp' | 'Upwork' | 'Fiverr' | 'Freelancer.com' | string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface ExchangeRate {
  buy: number;
  sell: number;
  lastUpdated: string;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    hasTrackedScroll50?: boolean;
  }
}