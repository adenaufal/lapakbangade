import React from 'react';
import { CONFIG } from '../constants';
import { Facebook, Instagram, Gift } from 'lucide-react';
import { trackEvent } from '../services/analytics';

export const SocialFollow: React.FC = () => {
    const handleSocialClick = (platform: string) => {
        trackEvent('social_follow_click', { platform });
    };

    return (
        <section className="py-16 bg-gradient-to-br from-brand-50 via-white to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Promo Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg shadow-orange-200/50">
                    <Gift size={18} className="animate-pulse" />
                    Friday Special: 50% Fee Discount!
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Jangan Ketinggalan Update Rate Harian!
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Follow kami untuk info promo, update rate terbaru, dan tips convert PayPal yang aman.
                </p>

                {/* Social Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={CONFIG.FACEBOOK_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleSocialClick('facebook')}
                        className="flex items-center gap-3 px-8 py-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 w-full sm:w-auto justify-center"
                    >
                        <Facebook size={22} />
                        Follow di Facebook
                    </a>

                    <a
                        href={CONFIG.INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleSocialClick('instagram')}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/25 transition-all hover:scale-105 w-full sm:w-auto justify-center"
                    >
                        <Instagram size={22} />
                        Follow di Instagram
                    </a>
                </div>

                {/* Trust indicator */}
                <p className="text-sm text-gray-500 mt-6">
                    🔔 500+ orang sudah follow untuk update rate harian
                </p>
            </div>
        </section>
    );
};
