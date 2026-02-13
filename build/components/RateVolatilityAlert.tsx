import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Lock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RateVolatilityAlertProps {
    currentRate: number;
}

export const RateVolatilityAlert: React.FC<RateVolatilityAlertProps> = ({ currentRate }) => {
    const [previousRate, setPreviousRate] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        // Load previous rate from localStorage
        const stored = localStorage.getItem('lapakbangade_previous_rate');
        if (stored) {
            setPreviousRate(parseFloat(stored));
        }

        // Store current rate
        localStorage.setItem('lapakbangade_previous_rate', currentRate.toString());
    }, [currentRate]);

    if (!previousRate || !showAlert) {
        return null;
    }

    const rateDifference = currentRate - previousRate;
    const percentageChange = ((rateDifference / previousRate) * 100);
    const isIncrease = rateDifference > 0;
    const isSignificantChange = Math.abs(percentageChange) >= 0.5; // 0.5% threshold

    if (!isSignificantChange) {
        return null;
    }

    const alertConfig = isIncrease ? {
        bg: 'bg-gradient-to-r from-red-500 to-orange-500',
        icon: <TrendingUp size={24} />,
        title: 'Rate Naik!',
        message: `Rate naik Rp ${Math.abs(rateDifference).toFixed(0)} dari kemarin (${percentageChange.toFixed(2)}%)`,
        actionText: 'Tunggu Rate Turun',
        emoji: '📈',
        recommendation: 'Lebih baik tunggu rate turun untuk convert yang lebih menguntungkan'
    } : {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        icon: <TrendingDown size={24} />,
        title: 'Rate Turun!',
        message: `Rate turun Rp ${Math.abs(rateDifference).toFixed(0)} dari kemarin (${Math.abs(percentageChange).toFixed(2)}%)`,
        actionText: 'Lock Rate Sekarang',
        emoji: '💰',
        recommendation: 'Ini saat yang tepat untuk convert! Rate sedang favorable.'
    };

    return (
        <AnimatePresence>
            {showAlert && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <div className={`${alertConfig.bg} rounded-xl p-6 text-white shadow-xl relative overflow-hidden`}>
                        {/* Animated background */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mt-32 animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-2xl -mr-24 -mb-24 animate-pulse delay-75"></div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setShowAlert(false)}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                            <span className="text-lg leading-none">×</span>
                        </button>

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    {alertConfig.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black flex items-center gap-2">
                                        {alertConfig.emoji} {alertConfig.title}
                                    </h3>
                                    <p className="text-sm opacity-90">{alertConfig.message}</p>
                                </div>
                            </div>

                            {/* Rate Comparison */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                                    <p className="text-xs opacity-70 mb-1">Rate Sebelumnya</p>
                                    <p className="text-2xl font-bold">Rp {previousRate.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4">
                                    <p className="text-xs opacity-70 mb-1">Rate Sekarang</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold">Rp {currentRate.toLocaleString()}</p>
                                        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                                            isIncrease ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                                        }`}>
                                            {isIncrease ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-4">
                                <p className="text-sm flex items-start gap-2">
                                    {isIncrease ? (
                                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <Zap size={16} className="flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className="opacity-90">{alertConfig.recommendation}</span>
                                </p>
                            </div>

                            {/* Action Button */}
                            {!isIncrease && (
                                <a
                                    href="#calculator"
                                    className="block w-full bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                                >
                                    <Lock size={18} />
                                    {alertConfig.actionText}
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
