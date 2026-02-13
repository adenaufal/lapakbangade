import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastVisit: string;
    totalDays: number;
}

interface StreakCounterProps {
    userId: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ userId }) => {
    const [streakData, setStreakData] = useState<StreakData>({
        currentStreak: 0,
        longestStreak: 0,
        lastVisit: '',
        totalDays: 0
    });

    useEffect(() => {
        loadStreak();
        updateStreak();
    }, [userId]);

    const loadStreak = () => {
        const stored = localStorage.getItem(`streak_${userId}`);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setStreakData(data);
            } catch (e) {
                console.error('Failed to parse streak data:', e);
            }
        }
    };

    const updateStreak = () => {
        const today = new Date().toDateString();
        const stored = localStorage.getItem(`streak_${userId}`);

        if (!stored) {
            // First visit
            const newStreak: StreakData = {
                currentStreak: 1,
                longestStreak: 1,
                lastVisit: today,
                totalDays: 1
            };
            localStorage.setItem(`streak_${userId}`, JSON.stringify(newStreak));
            setStreakData(newStreak);
            return;
        }

        const data: StreakData = JSON.parse(stored);
        const lastVisit = new Date(data.lastVisit);
        const now = new Date();

        // Calculate days difference
        const diffTime = now.getTime() - lastVisit.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Same day, no update needed
            return;
        } else if (diffDays === 1) {
            // Consecutive day, increment streak
            const newStreak = data.currentStreak + 1;
            const newData: StreakData = {
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, data.longestStreak),
                lastVisit: today,
                totalDays: data.totalDays + 1
            };
            localStorage.setItem(`streak_${userId}`, JSON.stringify(newData));
            setStreakData(newData);

            // Show celebration if milestone reached
            if (newStreak % 7 === 0) {
                showStreakCelebration(newStreak);
            }
        } else {
            // Streak broken, reset to 1
            const newData: StreakData = {
                currentStreak: 1,
                longestStreak: data.longestStreak,
                lastVisit: today,
                totalDays: data.totalDays + 1
            };
            localStorage.setItem(`streak_${userId}`, JSON.stringify(newData));
            setStreakData(newData);
        }
    };

    const showStreakCelebration = (streak: number) => {
        // Could trigger confetti or toast notification
        console.log(`🎉 Streak milestone: ${streak} days!`);
    };

    const getStreakLevel = (streak: number): { label: string; color: string; icon: string } => {
        if (streak >= 30) return { label: 'Legendary', color: 'purple', icon: '👑' };
        if (streak >= 14) return { label: 'On Fire', color: 'red', icon: '🔥' };
        if (streak >= 7) return { label: 'Strong', color: 'orange', icon: '💪' };
        if (streak >= 3) return { label: 'Building', color: 'yellow', icon: '⚡' };
        return { label: 'Starting', color: 'blue', icon: '🌱' };
    };

    const level = getStreakLevel(streakData.currentStreak);
    const progressToNextMilestone = streakData.currentStreak % 7;
    const nextMilestone = Math.ceil(streakData.currentStreak / 7) * 7 || 7;

    return (
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl -ml-24 -mb-24"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <Flame size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">Streak Counter</h3>
                            <p className="text-sm opacity-90">{level.label} Level {level.icon}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-5xl font-black">{streakData.currentStreak}</div>
                        <div className="text-xs opacity-80 uppercase tracking-wide">Hari</div>
                    </div>
                </div>

                {/* Progress to Next Milestone */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium opacity-90">
                            Progress ke {nextMilestone} hari
                        </span>
                        <span className="text-sm font-bold">
                            {progressToNextMilestone === 0 ? nextMilestone : progressToNextMilestone} / {nextMilestone === progressToNextMilestone ? nextMilestone + 7 : nextMilestone}
                        </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(progressToNextMilestone === 0 ? nextMilestone : progressToNextMilestone) / nextMilestone * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-3 bg-white rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                        <Calendar size={20} className="mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">{streakData.totalDays}</div>
                        <div className="text-xs opacity-70">Total Hari</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                        <Trophy size={20} className="mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">{streakData.longestStreak}</div>
                        <div className="text-xs opacity-70">Longest</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                        <TrendingUp size={20} className="mx-auto mb-2 opacity-80" />
                        <div className="text-2xl font-bold">{Math.floor((streakData.currentStreak / streakData.totalDays) * 100) || 0}%</div>
                        <div className="text-xs opacity-70">Consistency</div>
                    </div>
                </div>

                {/* Milestones */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                    <h4 className="text-sm font-bold mb-3 opacity-90">🏆 Milestone Rewards</h4>
                    <div className="space-y-2">
                        <div className={`flex items-center justify-between text-sm ${streakData.currentStreak >= 7 ? 'opacity-100' : 'opacity-50'}`}>
                            <span>7 hari: Bonus rate +0.5%</span>
                            {streakData.currentStreak >= 7 && <span className="font-bold">✓ Unlocked</span>}
                        </div>
                        <div className={`flex items-center justify-between text-sm ${streakData.currentStreak >= 14 ? 'opacity-100' : 'opacity-50'}`}>
                            <span>14 hari: Priority support</span>
                            {streakData.currentStreak >= 14 && <span className="font-bold">✓ Unlocked</span>}
                        </div>
                        <div className={`flex items-center justify-between text-sm ${streakData.currentStreak >= 30 ? 'opacity-100' : 'opacity-50'}`}>
                            <span>30 hari: VIP tier upgrade</span>
                            {streakData.currentStreak >= 30 && <span className="font-bold">✓ Unlocked</span>}
                        </div>
                    </div>
                </div>

                {/* Motivational Message */}
                <div className="mt-4 text-center">
                    {streakData.currentStreak === 0 && (
                        <p className="text-sm opacity-80">Mulai streak Anda hari ini! 🚀</p>
                    )}
                    {streakData.currentStreak >= 1 && streakData.currentStreak < 3 && (
                        <p className="text-sm opacity-80">Bagus! Lanjutkan streak Anda besok 💪</p>
                    )}
                    {streakData.currentStreak >= 3 && streakData.currentStreak < 7 && (
                        <p className="text-sm opacity-80">Hampir sampai 7 hari! Jangan putus 🔥</p>
                    )}
                    {streakData.currentStreak >= 7 && (
                        <p className="text-sm opacity-80">Amazing streak! Keep it going 👑</p>
                    )}
                </div>
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
