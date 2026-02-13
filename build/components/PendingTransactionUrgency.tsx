import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, TrendingUp, MessageCircle } from 'lucide-react';
import { Transaction } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PendingTransactionUrgencyProps {
    transactions: Transaction[];
}

export const PendingTransactionUrgency: React.FC<PendingTransactionUrgencyProps> = ({ transactions }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const pendingTransactions = transactions.filter(t =>
        ['pending', 'processing', 'waiting_payment', 'waiting_transfer'].includes(t.status)
    );

    if (pendingTransactions.length === 0) {
        return null;
    }

    const calculateTimeElapsed = (createdAt: string) => {
        const created = new Date(createdAt);
        const diff = currentTime.getTime() - created.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} hari yang lalu`;
        if (hours > 0) return `${hours} jam yang lalu`;
        return `${minutes} menit yang lalu`;
    };

    const getUrgencyLevel = (createdAt: string): 'low' | 'medium' | 'high' => {
        const created = new Date(createdAt);
        const diff = currentTime.getTime() - created.getTime();
        const hours = diff / (1000 * 60 * 60);

        if (hours > 24) return 'high';
        if (hours > 6) return 'medium';
        return 'low';
    };

    const getProgressPercentage = (createdAt: string): number => {
        // Assume average completion time is 60 minutes
        const created = new Date(createdAt);
        const diff = currentTime.getTime() - created.getTime();
        const minutes = diff / 60000;
        return Math.min((minutes / 60) * 100, 95); // Cap at 95% to show it's not complete
    };

    return (
        <div className="bg-white rounded-xl border-2 border-yellow-200 p-6 shadow-md">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock size={20} className="text-yellow-600 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Transaksi Pending</h3>
                        <p className="text-sm text-gray-600">
                            {pendingTransactions.length} transaksi menunggu penyelesaian
                        </p>
                    </div>
                </div>
                <div className="text-2xl animate-bounce">⏳</div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {pendingTransactions.map((tx, idx) => {
                        const urgency = getUrgencyLevel(tx.created_at);
                        const progress = getProgressPercentage(tx.created_at);
                        const timeElapsed = calculateTimeElapsed(tx.created_at);

                        const urgencyConfig = {
                            low: {
                                bg: 'bg-blue-50',
                                border: 'border-blue-200',
                                text: 'text-blue-700',
                                icon: 'text-blue-600',
                                badge: 'bg-blue-100 text-blue-700',
                                label: 'Baru'
                            },
                            medium: {
                                bg: 'bg-yellow-50',
                                border: 'border-yellow-200',
                                text: 'text-yellow-700',
                                icon: 'text-yellow-600',
                                badge: 'bg-yellow-100 text-yellow-700',
                                label: 'Pending'
                            },
                            high: {
                                bg: 'bg-red-50',
                                border: 'border-red-200',
                                text: 'text-red-700',
                                icon: 'text-red-600',
                                badge: 'bg-red-100 text-red-700',
                                label: 'Urgent!'
                            }
                        }[urgency];

                        return (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`${urgencyConfig.bg} border-2 ${urgencyConfig.border} rounded-xl p-4 relative overflow-hidden`}
                            >
                                {/* Urgency Badge */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${urgencyConfig.badge}`}>
                                        {urgencyConfig.label}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">
                                        ID: #{tx.display_id || tx.id.substring(0, 8)}
                                    </span>
                                </div>

                                {/* Transaction Info */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">
                                            ${tx.amount_usd?.toLocaleString() || 0} USD
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Clock size={14} />
                                            Dibuat {timeElapsed}
                                        </p>
                                    </div>
                                    <div className={`w-16 h-16 rounded-full ${urgencyConfig.icon} relative`}>
                                        <svg className="transform -rotate-90 w-16 h-16">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                                className="opacity-20"
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 28}`}
                                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                                className="transition-all duration-1000"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold">{progress.toFixed(0)}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1 }}
                                            className={`h-2 ${urgency === 'high' ? 'bg-red-600' : urgency === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'}`}
                                        />
                                    </div>
                                </div>

                                {/* Status Message */}
                                <div className={`flex items-start gap-2 ${urgencyConfig.text} text-sm mb-3`}>
                                    {urgency === 'high' ? (
                                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5 animate-pulse" />
                                    ) : urgency === 'medium' ? (
                                        <TrendingUp size={16} className="flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <Clock size={16} className="flex-shrink-0 mt-0.5" />
                                    )}
                                    <p className="font-medium">
                                        {urgency === 'high' && 'Sudah lebih dari 24 jam! Segera hubungi admin untuk follow up.'}
                                        {urgency === 'medium' && 'Transaksi sedang diproses. Estimasi selesai dalam beberapa jam.'}
                                        {urgency === 'low' && 'Transaksi baru dibuat. Kami akan segera memproses.'}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <a
                                    href="https://m.me/lapakbangade"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                                        urgency === 'high'
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : urgency === 'medium'
                                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    <MessageCircle size={16} />
                                    {urgency === 'high' ? 'Follow Up Sekarang' : 'Chat Admin'}
                                </a>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Summary Alert */}
            {pendingTransactions.some(tx => getUrgencyLevel(tx.created_at) === 'high') && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-medium flex items-center gap-2">
                        <AlertCircle size={16} className="animate-pulse" />
                        Ada transaksi yang membutuhkan perhatian segera!
                    </p>
                </div>
            )}
        </div>
    );
};
