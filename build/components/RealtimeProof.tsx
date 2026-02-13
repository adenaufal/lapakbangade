import React, { useState, useEffect } from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProofItem {
    id: number;
    message: string;
    icon: 'trending' | 'users';
}

const proofMessages: ProofItem[] = [
    { id: 1, message: '3 pengguna convert $50+ dalam 1 jam terakhir', icon: 'trending' },
    { id: 2, message: '12 transaksi selesai hari ini', icon: 'users' },
    { id: 3, message: '5 pengguna baru bergabung minggu ini', icon: 'users' },
    { id: 4, message: 'Rate terakhir diupdate 15 menit lalu', icon: 'trending' },
];

export const RealtimeProof = () => {
    const [currentProof, setCurrentProof] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProof((prev) => (prev + 1) % proofMessages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const proof = proofMessages[currentProof];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={proof.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full text-sm font-medium text-green-700 shadow-sm"
            >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {proof.icon === 'trending' ? (
                    <TrendingUp size={14} className="text-green-600" />
                ) : (
                    <Users size={14} className="text-green-600" />
                )}
                <span>{proof.message}</span>
            </motion.div>
        </AnimatePresence>
    );
};
