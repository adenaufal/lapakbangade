import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants';
import { trackEvent } from '../services/analytics';

export const CallToAction = () => {
  const handleClick = () => {
      trackEvent('cta_footer_click');
  };

  return (
    <section className="py-20 bg-brand-50 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                Siap cairin saldo PayPal kamu?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Jangan biarkan saldo mengendap. Convert sekarang, cair hitungan menit.
            </p>
            
            <div className="flex flex-col items-center gap-4">
                <a 
                    href={CONFIG.MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleClick}
                    className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xl px-10 py-5 rounded-xl shadow-xl shadow-brand-500/20 transition-all hover:scale-105"
                >
                    <MessageCircle size={28} />
                    Chat via Messenger
                </a>
                <p className="text-sm text-gray-500 font-medium">
                    Diproses di jam operasional {CONFIG.OPERATIONAL_HOURS}
                </p>
            </div>
        </div>
    </section>
  );
};