import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONFIG } from '../constants';
import { trackEvent } from '../services/analytics';

interface ExitIntentPopupProps {
    isAuthenticated?: boolean;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isAuthenticated = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem('exit_intent_shown');
        if (shown) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse leaves from top of viewport (toward browser chrome)
            if (e.clientY <= 10 && !hasShown && !isVisible) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('exit_intent_shown', 'true');
                trackEvent('exit_intent_triggered', { is_authenticated: isAuthenticated });
            }
        };

        // Add listener after 5 second delay (avoid triggering immediately)
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasShown, isVisible, isAuthenticated]);

    const handleClose = () => {
        setIsVisible(false);
        trackEvent('exit_intent_closed', { action: 'dismiss' });
    };

    const handleAccept = () => {
        trackEvent('exit_intent_accepted', { offer: '10_percent_bonus' });
        // Navigate to calculator with special parameter
        window.location.href = '/#calculator?promo=EXIT10';
        setIsVisible(false);
    };

    const handleChatAdmin = () => {
        trackEvent('exit_intent_chat', { action: 'messenger' });
        window.open(CONFIG.MESSENGER_URL, '_blank');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={handleClose}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101]"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <X size={18} className="text-gray-600" />
                            </button>

                            {/* Header with Gradient */}
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white relative overflow-hidden">
                                {/* Animated background */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mt-32 animate-pulse"></div>
                                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-2xl -mr-24 -mb-24 animate-pulse delay-75"></div>
                                </div>

                                <div className="relative z-10 text-center">
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40"
                                    >
                                        <Gift size={40} />
                                    </motion.div>

                                    {/* Headline */}
                                    <h2 className="text-3xl font-black mb-2">
                                        Tunggu Dulu! 🎁
                                    </h2>
                                    <p className="text-lg opacity-90 font-medium">
                                        Jangan lewatkan penawaran spesial ini
                                    </p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                {/* Offer Card */}
                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6 relative overflow-hidden">
                                    {/* Decorative corner badge */}
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        ONE-TIME OFFER
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <Zap className="text-orange-600" size={32} />
                                            <div className="text-5xl font-black text-orange-600">
                                                +10%
                                            </div>
                                            <span className="text-xl font-bold text-orange-800 self-end mb-2">
                                                BONUS
                                            </span>
                                        </div>

                                        <p className="text-center text-gray-800 font-semibold mb-2">
                                            Dapatkan bonus 10% untuk transaksi pertama Anda!
                                        </p>

                                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                                            <p className="text-sm text-gray-700 mb-2">
                                                <strong>Contoh:</strong>
                                            </p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Convert $100</span>
                                                <span className="font-bold text-gray-900">+$10 bonus = $110 IDR</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Urgency Timer */}
                                <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-600">
                                    <Clock size={16} className="text-red-500 animate-pulse" />
                                    <span>Penawaran ini hanya tersedia <strong className="text-red-600">SEKARANG</strong></span>
                                </div>

                                {/* Benefits List */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-green-600">✓</span>
                                        </div>
                                        <span>Rate terbaik hari ini</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-green-600">✓</span>
                                        </div>
                                        <span>Proses cepat 30-60 menit</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-green-600">✓</span>
                                        </div>
                                        <span>100% aman & terpercaya</span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleAccept}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
                                    >
                                        <span>Klaim Bonus 10% Sekarang</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <button
                                        onClick={handleChatAdmin}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
                                    >
                                        Chat Admin untuk Info Lebih Lanjut
                                    </button>

                                    <button
                                        onClick={handleClose}
                                        className="w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
                                    >
                                        Tidak, terima kasih
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
