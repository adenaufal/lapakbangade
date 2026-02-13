import React from 'react';
import { Crown, TrendingUp, Zap, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Tier {
    name: string;
    minTransactions: number;
    minVolume: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    benefits: string[];
    gradient: string;
}

const tiers: Tier[] = [
    {
        name: 'Bronze',
        minTransactions: 0,
        minVolume: 0,
        icon: <Star size={24} />,
        color: 'text-amber-700',
        bgColor: 'bg-amber-100',
        gradient: 'from-amber-400 to-amber-600',
        benefits: ['Rate standard', 'Support normal', 'Processing 30-60 menit']
    },
    {
        name: 'Silver',
        minTransactions: 5,
        minVolume: 250,
        icon: <Zap size={24} />,
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
        gradient: 'from-gray-300 to-gray-500',
        benefits: ['Rate priority', 'Fast response', 'Processing 20-40 menit']
    },
    {
        name: 'Gold',
        minTransactions: 15,
        minVolume: 1000,
        icon: <TrendingUp size={24} />,
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
        gradient: 'from-yellow-400 to-yellow-600',
        benefits: ['Rate terbaik', 'Priority support', 'Processing 15-30 menit']
    },
    {
        name: 'Platinum',
        minTransactions: 30,
        minVolume: 3000,
        icon: <Crown size={24} />,
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
        gradient: 'from-purple-400 to-purple-600',
        benefits: ['Rate VIP', 'Dedicated support', 'Processing 10-20 menit', 'Custom deals']
    }
];

interface StatusTierProps {
    completedCount: number;
    totalVolume: number;
}

export const StatusTier: React.FC<StatusTierProps> = ({ completedCount, totalVolume }) => {
    // Determine current tier
    let currentTierIndex = 0;
    for (let i = tiers.length - 1; i >= 0; i--) {
        if (completedCount >= tiers[i].minTransactions && totalVolume >= tiers[i].minVolume) {
            currentTierIndex = i;
            break;
        }
    }

    const currentTier = tiers[currentTierIndex];
    const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

    // Calculate progress to next tier
    const transactionProgress = nextTier
        ? Math.min((completedCount / nextTier.minTransactions) * 100, 100)
        : 100;
    const volumeProgress = nextTier
        ? Math.min((totalVolume / nextTier.minVolume) * 100, 100)
        : 100;

    const overallProgress = nextTier ? (transactionProgress + volumeProgress) / 2 : 100;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${currentTier.gradient} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40">
                            {currentTier.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-90 mb-1">Status Anda</p>
                            <h3 className="text-3xl font-black tracking-tight">{currentTier.name}</h3>
                        </div>
                    </div>
                    {nextTier && (
                        <div className="text-right">
                            <p className="text-xs opacity-80 mb-1">Next Tier</p>
                            <p className="font-bold text-lg">{nextTier.name}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
                {/* Current Benefits */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-lg">🎁</span> Benefits {currentTier.name}
                    </h4>
                    <ul className="space-y-2">
                        {currentTier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <div className={`w-5 h-5 rounded-full ${currentTier.bgColor} flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-xs font-bold">✓</span>
                                </div>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Progress to Next Tier */}
                {nextTier && (
                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900">Progress ke {nextTier.name}</h4>
                            <span className="text-sm font-bold text-brand-600">{overallProgress.toFixed(0)}%</span>
                        </div>

                        {/* Overall Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-3 bg-gradient-to-r ${nextTier.gradient} relative`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </motion.div>
                        </div>

                        {/* Requirements */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Transactions */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Transaksi</p>
                                <p className="font-bold text-gray-900">
                                    {completedCount} / {nextTier.minTransactions}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                                        style={{ width: `${transactionProgress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Volume */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Volume</p>
                                <p className="font-bold text-gray-900">
                                    ${totalVolume.toFixed(0)} / ${nextTier.minVolume}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div
                                        className="bg-green-600 h-1.5 rounded-full transition-all"
                                        style={{ width: `${volumeProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Next Tier Benefits Preview */}
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <p className="text-xs font-bold text-blue-900 mb-2">🔓 Unlock {nextTier.name} Benefits:</p>
                            <ul className="space-y-1">
                                {nextTier.benefits.slice(0, 2).map((benefit, idx) => (
                                    <li key={idx} className="text-xs text-blue-700 flex items-center gap-1">
                                        <span>•</span> {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Max Tier Reached */}
                {!nextTier && (
                    <div className="border-t border-gray-100 pt-6 text-center">
                        <div className="text-5xl mb-3">👑</div>
                        <p className="font-bold text-gray-900 text-lg mb-2">Tier Tertinggi!</p>
                        <p className="text-sm text-gray-600">
                            Anda sudah mencapai status maksimal. Terima kasih atas kepercayaan Anda!
                        </p>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
};
