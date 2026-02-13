/**
 * Sitemap Generator for Programmatic SEO Pages
 * Run with: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'fs';
import { BANKS_DATA, EWALLETS_DATA, CITIES_DATA, USE_CASES_DATA, SERVICE_VARIATIONS } from '../data/seo-data';

const BASE_URL = 'https://lapakbangade.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function generateSitemap(): string {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Core pages (highest priority)
  urls.push({
    loc: BASE_URL,
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0
  });

  urls.push({
    loc: `${BASE_URL}/privacy`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.3
  });

  urls.push({
    loc: `${BASE_URL}/terms`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.3
  });

  // Service variation pages (high priority)
  SERVICE_VARIATIONS.forEach(service => {
    urls.push({
      loc: `${BASE_URL}/${service.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Bank-specific pages (high priority)
  BANKS_DATA.forEach(bank => {
    urls.push({
      loc: `${BASE_URL}/convert-paypal-ke-${bank.id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: bank.popular ? 0.9 : 0.8
    });
  });

  // E-wallet specific pages (high priority)
  EWALLETS_DATA.forEach(ewallet => {
    urls.push({
      loc: `${BASE_URL}/convert-paypal-ke-${ewallet.id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: ewallet.popular ? 0.9 : 0.8
    });
  });

  // City-based pages (medium priority, top 15 cities)
  CITIES_DATA.slice(0, 15).forEach(city => {
    urls.push({
      loc: `${BASE_URL}/convert-paypal-${city.id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Use case pages (high priority)
  USE_CASES_DATA.forEach(useCase => {
    urls.push({
      loc: `${BASE_URL}/untuk-${useCase.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Generate and save sitemap
const sitemap = generateSitemap();
writeFileSync('./public/sitemap.xml', sitemap, 'utf-8');

console.log('✅ Sitemap generated successfully!');
console.log(`📍 Total URLs: ${sitemap.split('<url>').length - 1}`);
console.log('📂 Location: ./public/sitemap.xml');
