import React from 'react';
import { Trophy, Medal, Award, TrendingUp, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface LeaderboardEntry {
    rank: number;
    name: string;
    avatar: string;
    referrals: number;
    earnings: number;
    tier: 'gold' | 'silver' | 'bronze' | 'regular';
}

// Mock data - replace with real API data
const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Ahmad R.', avatar: 'https://ui-avatars.com/api/?name=Ahmad+R&background=FFD700&color=fff', referrals: 47, earnings: 235, tier: 'gold' },
    { rank: 2, name: 'Budi S.', avatar: 'https://ui-avatars.com/api/?name=Budi+S&background=C0C0C0&color=fff', referrals: 35, earnings: 175, tier: 'silver' },
    { rank: 3, name: 'Citra D.', avatar: 'https://ui-avatars.com/api/?name=Citra+D&background=CD7F32&color=fff', referrals: 28, earnings: 140, tier: 'bronze' },
    { rank: 4, name: 'Dani F.', avatar: 'https://ui-avatars.com/api/?name=Dani+F&background=6366F1&color=fff', referrals: 22, earnings: 110, tier: 'regular' },
    { rank: 5, name: 'Eka P.', avatar: 'https://ui-avatars.com/api/?name=Eka+P&background=8B5CF6&color=fff', referrals: 18, earnings: 90, tier: 'regular' },
    { rank: 6, name: 'Fajar M.', avatar: 'https://ui-avatars.com/api/?name=Fajar+M&background=EC4899&color=fff', referrals: 15, earnings: 75, tier: 'regular' },
    { rank: 7, name: 'Gita N.', avatar: 'https://ui-avatars.com/api/?name=Gita+N&background=10B981&color=fff', referrals: 12, earnings: 60, tier: 'regular' },
    { rank: 8, name: 'Hendra K.', avatar: 'https://ui-avatars.com/api/?name=Hendra+K&background=F59E0B&color=fff', referrals: 10, earnings: 50, tier: 'regular' },
    { rank: 9, name: 'Indah L.', avatar: 'https://ui-avatars.com/api/?name=Indah+L&background=EF4444&color=fff', referrals: 8, earnings: 40, tier: 'regular' },
    { rank: 10, name: 'Joko W.', avatar: 'https://ui-avatars.com/api/?name=Joko+W&background=3B82F6&color=fff', referrals: 6, earnings: 30, tier: 'regular' },
];

export const ReferralLeaderboard: React.FC = () => {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="text-yellow-500" size={24} />;
            case 2:
                return <Medal className="text-gray-400" size={24} />;
            case 3:
                return <Award className="text-orange-600" size={24} />;
            default:
                return <span className="text-gray-500 font-bold text-lg">#{rank}</span>;
        }
    };

    const getTierBadge = (tier: string) => {
        const config = {
            gold: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '👑 Gold' },
            silver: { bg: 'bg-gray-100', text: 'text-gray-800', label: '🥈 Silver' },
            bronze: { bg: 'bg-orange-100', text: 'text-orange-800', label: '🥉 Bronze' },
            regular: { bg: 'bg-blue-100', text: 'text-blue-800', label: '⭐ Member' }
        }[tier] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Member' };

        return (
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">Referral Leaderboard</h3>
                            <p className="text-sm opacity-90">Top referrers bulan ini</p>
                        </div>
                    </div>
                    <div className="text-4xl">🏆</div>
                </div>
            </div>

            {/* Prize Pool Banner */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-orange-200 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-gray-900 mb-1">🎁 Prize Pool Bulan Ini</p>
                        <p className="text-xs text-gray-600">Peringkat 1-3 dapatkan hadiah spesial!</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="text-center px-3 py-1 bg-yellow-100 rounded-lg border border-yellow-300">
                            <p className="text-xs text-yellow-800 font-bold">🥇 1st</p>
                            <p className="text-sm font-black text-yellow-900">$100</p>
                        </div>
                        <div className="text-center px-3 py-1 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-xs text-gray-700 font-bold">🥈 2nd</p>
                            <p className="text-sm font-black text-gray-900">$50</p>
                        </div>
                        <div className="text-center px-3 py-1 bg-orange-100 rounded-lg border border-orange-300">
                            <p className="text-xs text-orange-700 font-bold">🥉 3rd</p>
                            <p className="text-sm font-black text-orange-900">$25</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="p-6">
                <div className="space-y-3">
                    {mockLeaderboard.map((entry, idx) => (
                        <motion.div
                            key={entry.rank}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                                entry.tier === 'gold'
                                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                                    : entry.tier === 'silver'
                                    ? 'bg-gray-50 border-gray-300'
                                    : entry.tier === 'bronze'
                                    ? 'bg-orange-50 border-orange-300'
                                    : 'bg-white border-gray-200'
                            }`}
                        >
                            {/* Rank Icon */}
                            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                {getRankIcon(entry.rank)}
                            </div>

                            {/* Avatar */}
                            <img
                                src={entry.avatar}
                                alt={entry.name}
                                className="w-12 h-12 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-bold text-gray-900">{entry.name}</p>
                                    {getTierBadge(entry.tier)}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <TrendingUp size={14} />
                                        {entry.referrals} referrals
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        ${entry.earnings} earned
                                    </span>
                                </div>
                            </div>

                            {/* Trophy Animation for Top 3 */}
                            {entry.rank <= 3 && (
                                <div className="flex-shrink-0">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                                    >
                                        {entry.rank === 1 && <span className="text-4xl">🏆</span>}
                                        {entry.rank === 2 && <span className="text-3xl">🥈</span>}
                                        {entry.rank === 3 && <span className="text-3xl">🥉</span>}
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-gray-50 border-t border-gray-200 p-6">
                <div className="text-center">
                    <p className="text-sm text-gray-700 mb-3">
                        <strong>Ingin masuk leaderboard?</strong> Bagikan kode referral Anda!
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Update setiap hari
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Reset setiap bulan
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
