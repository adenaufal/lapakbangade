import React from 'react';
import { Target, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface Goal {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    current: number;
    target: number;
    unit: string;
    color: string;
    bgColor: string;
}

interface GoalProgressProps {
    completedCount: number;
    totalVolume: number;
    transactionCount: number;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
    completedCount,
    totalVolume,
    transactionCount
}) => {
    // Calculate current month for monthly goals
    const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long' });

    const goals: Goal[] = [
        {
            id: 'monthly-transactions',
            icon: <Target size={18} />,
            title: 'Transaksi Bulanan',
            description: `Target bulan ${currentMonth}`,
            current: completedCount,
            target: 10,
            unit: 'transaksi',
            color: 'text-blue-600',
            bgColor: 'bg-blue-600'
        },
        {
            id: 'monthly-volume',
            icon: <TrendingUp size={18} />,
            title: 'Volume Bulanan',
            description: `Target bulan ${currentMonth}`,
            current: totalVolume,
            target: 500,
            unit: 'USD',
            color: 'text-green-600',
            bgColor: 'bg-green-600'
        },
        {
            id: 'weekly-goal',
            icon: <Calendar size={18} />,
            title: 'Target Mingguan',
            description: 'Target minggu ini',
            current: Math.min(completedCount, 3),
            target: 3,
            unit: 'transaksi',
            color: 'text-purple-600',
            bgColor: 'bg-purple-600'
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Target & Progress</h3>
                    <p className="text-sm text-gray-500">
                        Capai target untuk unlock rewards
                    </p>
                </div>
                <div className="text-3xl">🎯</div>
            </div>

            <div className="space-y-5">
                {goals.map((goal, idx) => {
                    const percentage = Math.min((goal.current / goal.target) * 100, 100);
                    const isCompleted = goal.current >= goal.target;

                    return (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                isCompleted
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-gray-50 border-gray-200'
                            }`}
                        >
                            {/* Goal Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        isCompleted ? 'bg-green-100' : 'bg-white border border-gray-200'
                                    }`}>
                                        <span className={isCompleted ? 'text-green-600' : goal.color}>
                                            {goal.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{goal.title}</h4>
                                        <p className="text-xs text-gray-500">{goal.description}</p>
                                    </div>
                                </div>
                                {isCompleted && (
                                    <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        ✓ Selesai
                                    </div>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-2">
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                        className={`h-3 rounded-full ${goal.bgColor} relative overflow-hidden`}
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Progress Text */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-bold text-gray-900">
                                    {goal.unit === 'USD' ? `$${goal.current.toFixed(0)}` : goal.current} / {goal.unit === 'USD' ? `$${goal.target}` : goal.target} {goal.unit}
                                </span>
                                <span className={`font-bold ${isCompleted ? 'text-green-600' : goal.color}`}>
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>

                            {/* Motivational Text */}
                            {!isCompleted && percentage > 50 && (
                                <div className="mt-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                                    💪 Hampir sampai! Tinggal {goal.unit === 'USD' ? `$${(goal.target - goal.current).toFixed(0)}` : (goal.target - goal.current)} lagi
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Add shimmer animation to global styles */}
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
