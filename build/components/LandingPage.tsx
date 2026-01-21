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
import { trackEvent, trackViewContent, trackLeadWithValue } from '../services/analytics';
import { CONFIG } from '../constants';
import { MessageCircle } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Testimonials />
        <HowItWorks />
        <FeeSection />
        <PaymentMethods />
        <FAQ />
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
