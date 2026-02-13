/**
 * SEO Utility Functions
 * Helpers for generating structured data and SEO metadata
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate FAQ Schema (JSON-LD)
 */
export function generateFAQSchema(faqs: FAQItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}

/**
 * Generate Breadcrumb Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function generateOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Lapak Bang Ade",
    "alternateName": "LapakBangAde",
    "url": "https://lapakbangade.com",
    "logo": "https://lapakbangade.com/logos/logo.png",
    "description": "Jasa convert PayPal USD ke IDR dan top up saldo PayPal dengan rate kompetitif, fee transparan, dan verifikasi manual aman. Melayani transfer ke semua bank dan e-wallet Indonesia.",
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "availableLanguage": ["id", "en"],
    "serviceType": [
      "Convert PayPal ke Rupiah",
      "Top Up Saldo PayPal",
      "Pencairan PayPal",
      "Jasa PayPal Indonesia"
    ],
    "sameAs": [
      "https://www.facebook.com/lapakbangade",
      "https://instagram.com/lapakbangade",
      "https://m.me/lapakbangade"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-821-1330-4116",
      "contactType": "Customer Service",
      "areaServed": "ID",
      "availableLanguage": "Indonesian",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    },
    "priceRange": "$$",
    "paymentAccepted": "PayPal, Bank Transfer",
    "currenciesAccepted": "IDR, USD"
  });
}

/**
 * Generate Service Schema for specific service pages (JSON-LD)
 */
export function generateServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "serviceType": params.serviceType,
    "provider": {
      "@type": "Organization",
      "name": "Lapak Bang Ade",
      "url": "https://lapakbangade.com"
    },
    "areaServed": params.areaServed || "ID",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://m.me/lapakbangade",
      "serviceType": "Messenger Chat"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock"
    }
  });
}

/**
 * Generate LocalBusiness Schema for city pages (JSON-LD)
 */
export function generateLocalBusinessSchema(city: string, province: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Lapak Bang Ade - ${city}`,
    "description": `Jasa convert PayPal ke Rupiah di ${city}, ${province}. Rate terbaik, proses cepat, aman terpercaya.`,
    "url": `https://lapakbangade.com/convert-paypal-${city.toLowerCase()}`,
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedIn": {
        "@type": "State",
        "name": province
      }
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Lapak Bang Ade",
      "url": "https://lapakbangade.com"
    }
  });
}

/**
 * Generate Article Schema for blog/guide pages (JSON-LD)
 */
export function generateArticleSchema(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": params.headline,
    "description": params.description,
    "url": params.url,
    "datePublished": params.datePublished,
    "dateModified": params.dateModified || params.datePublished,
    "author": {
      "@type": "Person",
      "name": params.author || "Lapak Bang Ade"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lapak Bang Ade",
      "url": "https://lapakbangade.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lapakbangade.com/logos/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": params.url
    }
  });
}

/**
 * Generate meta description from text (SEO-friendly truncation)
 */
export function generateMetaDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;

  // Truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://lapakbangade.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 */
export function getOGImageUrl(type: 'default' | 'bank' | 'ewallet' | 'city' | 'usecase' = 'default'): string {
  // Default OG image
  const defaultImage = 'https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6';

  // In the future, you can generate dynamic OG images for different page types
  // For now, return default
  return defaultImage;
}

/**
 * Sanitize text for meta tags (remove HTML, special chars)
 */
export function sanitizeForMeta(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s,.-]/g, '') // Remove special characters except common punctuation
    .trim();
}
