import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { FeeSection } from './FeeSection';
import { PaymentMethods } from './PaymentMethods';
import { TrustSection } from './TrustSection';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { CallToAction } from './CallToAction';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { ProgrammaticLinks } from './ProgrammaticLinks';
import { SocialProofTicker } from './SocialProofTicker';
import { ExitIntentPopup } from './ExitIntentPopup';
import { trackEvent, trackViewContent } from '../services/analytics';
import { FAQS } from '../constants';
import { generateFAQSchema, generateOrganizationSchema } from '../utils/seo';

export const LandingPage: React.FC = () => {
  const isSpecialOfferEnabled = false;

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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <SEO
        title="Lapak Bang Ade - Jasa Convert PayPal ke Rupiah Terpercaya"
        description="Jasa convert PayPal USD ke IDR dan Top Up saldo PayPal. Rate kompetitif, fee transparan, cair ke BCA, Mandiri, BRI, BNI, DANA, OVO, GoPay. Proses manual aman & anti-fraud."
        canonical="https://lapakbangade.com/"
        keywords="convert paypal ke rupiah, jual saldo paypal, beli saldo paypal, top up paypal, jasa convert paypal, tukar usd ke idr, cairkan paypal ke bank, lapak bang ade"
        structuredData={structuredData}
      />
      <ExitIntentPopup isAuthenticated={false} enabled={isSpecialOfferEnabled} />
      <Navbar />
      <main className="relative">
        <Hero />
        <SocialProofTicker />
        <TrustSection />
        <Testimonials />
        <HowItWorks />
        <FeeSection />
        <PaymentMethods />
        <FAQ />

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10 md:mb-12">
              <p className="mb-3 text-xs font-black uppercase text-brand-600">
                Layanan lain
              </p>
              <h2 className="text-balance text-3xl font-black text-slate-950 mb-4 md:text-5xl">
                Layanan Convert PayPal Kami
              </h2>
              <p className="text-pretty text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Pilih bank, e-wallet, atau temukan solusi yang sesuai dengan profesi Anda
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-8 shadow-lg">
              <ProgrammaticLinks variant="full" />
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};
