import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  platform: 'Facebook' | 'WhatsApp' | 'Upwork' | 'Fiverr' | 'Freelancer.com' | string;
}


export interface Transaction {
  id: string;
  type: string;
  amount_usd: number;
  amount_idr: number;
  rate: number;
  status: string;
  created_at: string;
  completed_at?: string;
  display_id?: string;
  // Detailed fields
  amount_usd_net?: number;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  is_express?: boolean;
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