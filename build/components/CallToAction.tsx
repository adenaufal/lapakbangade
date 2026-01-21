import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants';
import { trackEvent } from '../services/analytics';

export const CallToAction = () => {
    const handleClick = () => {
        trackEvent('cta_footer_click');
    };

    return (
        <section className="py-24 relative overflow-hidden bg-gray-900">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Mulai Transaksi <span className="text-brand-400">Aman Sekarang</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Gabung dengan ribuan freelancer yang sudah percaya. Rate kompetitif, tanpa biaya tersembunyi, langsung cair.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <a
                        href={CONFIG.MESSENGER_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleClick}
                        className="group relative inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl shadow-brand-900/50 transition-all hover:scale-105 hover:shadow-white/10"
                    >
                        <div className="absolute inset-0 rounded-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all"></div>
                        <MessageCircle size={28} className="text-brand-600 group-hover:scale-110 transition-transform" />
                        <span>Chat Admin Sekarang</span>
                    </a>

                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Diproses di jam operasional {CONFIG.OPERATIONAL_HOURS}
                    </div>
                </div>
            </div>
        </section>
    );
};
