import React from 'react';
import { CONFIG } from '../constants';
import { Facebook, MessageCircle, Gift } from 'lucide-react';
import { trackEvent, trackLeadWithValue } from '../services/analytics';

export const SocialFollow: React.FC = () => {
    const handleMessengerClick = () => {
        trackEvent('cta_footer_click');
        trackLeadWithValue({ value: 0, currency: 'USD', mode: 'convert', rate: 0 });
    };

    const handleSocialClick = (platform: string) => {
        trackEvent('social_follow_click', { platform });
    };

    return (
        <section className="py-20 bg-gradient-to-br from-brand-50 via-white to-blue-50 border-t border-brand-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Promo Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg shadow-orange-200/50">
                    <Gift size={18} className="animate-pulse" />
                    Friday Special: 50% Fee Discount!
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Siap Cairin Saldo PayPal Kamu?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                    Jangan biarkan saldo mengendap. Convert sekarang, cair hitungan menit.
                </p>

                {/* Primary CTA - Messenger */}
                <div className="flex flex-col items-center gap-4 mb-10">
                    <a
                        href={CONFIG.MESSENGER_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleMessengerClick}
                        className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xl px-10 py-5 rounded-xl shadow-xl shadow-brand-500/20 transition-all hover:scale-105"
                    >
                        <MessageCircle size={28} />
                        Chat via Messenger
                    </a>
                    <p className="text-sm text-gray-600 font-medium">
                        Diproses di jam operasional {CONFIG.OPERATIONAL_HOURS}
                    </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 max-w-xs mx-auto mb-8">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400 font-medium">atau</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Secondary - Social Follow */}
                <p className="text-gray-600 mb-4">
                    Follow untuk info promo & update rate harian
                </p>
                <a
                    href={CONFIG.FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleSocialClick('facebook')}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
                >
                    <Facebook size={20} />
                    Follow di Facebook
                </a>

                {/* Trust indicator */}
                <p className="text-sm text-gray-500 mt-6">
                    🔔 500+ orang sudah follow untuk update rate harian
                </p>
            </div>
        </section>
    );
};

