import React from 'react';
import { Award, TrendingUp, DollarSign, Star, Zap, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface Badge {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    unlocked: boolean;
    progress?: number;
    total?: number;
    color: string;
    bgColor: string;
}

interface MilestoneBadgesProps {
    completedCount: number;
    totalVolume: number;
    transactionCount: number;
}

export const MilestoneBadges: React.FC<MilestoneBadgesProps> = ({
    completedCount,
    totalVolume,
    transactionCount
}) => {
    const badges: Badge[] = [
        {
            id: 'first-transaction',
            icon: <Award size={20} />,
            title: 'First Step',
            description: 'Selesaikan transaksi pertama',
            unlocked: completedCount >= 1,
            progress: Math.min(completedCount, 1),
            total: 1,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            id: 'power-user',
            icon: <Zap size={20} />,
            title: 'Power User',
            description: 'Selesaikan 5 transaksi',
            unlocked: completedCount >= 5,
            progress: Math.min(completedCount, 5),
            total: 5,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            id: 'volume-100',
            icon: <DollarSign size={20} />,
            title: '$100 Milestone',
            description: 'Capai $100 total volume',
            unlocked: totalVolume >= 100,
            progress: Math.min(totalVolume, 100),
            total: 100,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            id: 'veteran',
            icon: <Trophy size={20} />,
            title: 'Veteran Trader',
            description: 'Selesaikan 10 transaksi',
            unlocked: completedCount >= 10,
            progress: Math.min(completedCount, 10),
            total: 10,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            id: 'volume-500',
            icon: <TrendingUp size={20} />,
            title: '$500 Champion',
            description: 'Capai $500 total volume',
            unlocked: totalVolume >= 500,
            progress: Math.min(totalVolume, 500),
            total: 500,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100'
        },
        {
            id: 'elite',
            icon: <Star size={20} />,
            title: 'Elite Member',
            description: 'Selesaikan 25 transaksi',
            unlocked: completedCount >= 25,
            progress: Math.min(completedCount, 25),
            total: 25,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100'
        }
    ];

    const unlockedCount = badges.filter(b => b.unlocked).length;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Achievements</h3>
                    <p className="text-sm text-gray-500">
                        {unlockedCount} dari {badges.length} badges terbuka
                    </p>
                </div>
                <div className="text-3xl">🏆</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.map((badge, idx) => (
                    <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                            badge.unlocked
                                ? `${badge.bgColor} border-transparent shadow-md hover:shadow-lg`
                                : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                    >
                        {/* Badge Icon */}
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                                badge.unlocked ? `${badge.bgColor} ${badge.color}` : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                            {badge.icon}
                        </div>

                        {/* Badge Info */}
                        <h4 className={`font-bold text-sm mb-1 ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {badge.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{badge.description}</p>

                        {/* Progress Bar */}
                        {!badge.unlocked && badge.progress !== undefined && badge.total !== undefined && (
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                        className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 font-medium">
                                    {badge.id.includes('volume')
                                        ? `$${badge.progress.toFixed(0)} / $${badge.total}`
                                        : `${badge.progress} / ${badge.total}`}
                                </p>
                            </div>
                        )}

                        {/* Unlocked Badge */}
                        {badge.unlocked && (
                            <div className="absolute top-2 right-2">
                                <div className={`w-6 h-6 rounded-full ${badge.bgColor} flex items-center justify-center`}>
                                    <span className="text-xs">✓</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
