import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage for consent on mount
        const consent = localStorage.getItem('cookie_consent');

        if (consent === null) {
            // If not yet decided, show banner as opt-out opportunity
            // Delay slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 md:flex md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Cookie size={20} />
                                </div>
                                <h3 className="font-bold text-gray-900">Penggunaan Cookie</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menganalisis traffic website.
                                Data Anda aman dan tidak akan disalahgunakan.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                aria-label="Tolak cookie"
                            >
                                Tolak
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02]"
                                aria-label="Terima cookie"
                            >
                                Terima Semua
                            </button>
                        </div>

                        <button
                            onClick={handleDecline}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 md:hidden"
                            aria-label="Tutup"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
