import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { TrustSection } from './TrustSection';
import { HowItWorks } from './HowItWorks';
import { FeeSection } from './FeeSection';
import { PaymentMethods } from './PaymentMethods';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { CallToAction } from './CallToAction';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { ProgrammaticLinks } from './ProgrammaticLinks';
import { SocialProofTicker } from './SocialProofTicker';
import { ExitIntentPopup } from './ExitIntentPopup';
import { trackEvent, trackViewContent, trackLeadWithValue } from '../services/analytics';
import { CONFIG, FAQS } from '../constants';
import { MessageCircle } from 'lucide-react';
import { generateFAQSchema, generateOrganizationSchema } from '../utils/seo';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    trackViewContent({ page: 'landing', section: 'hero' });

    // Scroll Tracking
    const handleScroll = () => {
      const scrolledPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrolledPercentage > 0.5 && !window.hasTrackedScroll50) {
        trackEvent('scroll_depth', { percentage: 50 });
        window.hasTrackedScroll50 = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate structured data
  const structuredData = [
    JSON.parse(generateOrganizationSchema()),
    JSON.parse(generateFAQSchema(FAQS.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))))
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      <SEO
        title="Lapak Bang Ade - Jasa Convert PayPal ke Rupiah Terpercaya"
        description="Jasa convert PayPal USD ke IDR dan Top Up saldo PayPal. Rate kompetitif, fee transparan, cair ke BCA, Mandiri, BRI, BNI, DANA, OVO, GoPay. Proses manual aman & anti-fraud."
        canonical="https://lapakbangade.com/"
        keywords="convert paypal ke rupiah, jual saldo paypal, beli saldo paypal, top up paypal, jasa convert paypal, tukar usd ke idr, cairkan paypal ke bank, lapak bang ade"
        structuredData={structuredData}
      />
      <ExitIntentPopup isAuthenticated={false} />
      <Navbar />
      <main>
        <Hero />
        <SocialProofTicker />
        <TrustSection />
        <Testimonials />
        <HowItWorks />
        <FeeSection />
        <PaymentMethods />
        <FAQ />

        {/* Programmatic SEO Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Layanan Convert PayPal Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pilih bank, e-wallet, atau temukan solusi yang sesuai dengan profesi Anda
              </p>
            </div>
            <ProgrammaticLinks variant="full" />
          </div>
        </section>

        <CallToAction />

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 w-full p-3 bg-white border-t border-gray-200 md:hidden z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <a
            href={CONFIG.MESSENGER_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackEvent('click_sticky_mobile_cta');
              trackLeadWithValue({ value: 0, currency: 'USD', mode: 'convert', rate: 0 });
            }}
            className="flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold py-3 rounded-lg shadow-sm transition-colors"
          >
            <MessageCircle size={18} />
            Chat Admin Sekarang
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};
