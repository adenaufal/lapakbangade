import React, { useState, useEffect } from 'react';
import { FileText, Clock, Trash2, Play, DollarSign, ArrowRightLeft, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Draft {
    id: string;
    type: 'convert' | 'topup';
    amount: string;
    details: any;
    createdAt: string;
}

interface SavedDraftsProps {
    onResumeDraft: (draft: Draft) => void;
}

export const SavedDrafts: React.FC<SavedDraftsProps> = ({ onResumeDraft }) => {
    const [drafts, setDrafts] = useState<Draft[]>([]);

    useEffect(() => {
        loadDrafts();
    }, []);

    const loadDrafts = () => {
        const stored = localStorage.getItem('lapakbangade_drafts');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setDrafts(parsed);
            } catch (e) {
                console.error('Failed to parse drafts:', e);
            }
        }
    };

    const deleteDraft = (draftId: string) => {
        const updated = drafts.filter(d => d.id !== draftId);
        setDrafts(updated);
        localStorage.setItem('lapakbangade_drafts', JSON.stringify(updated));
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} hari yang lalu`;
        if (hours > 0) return `${hours} jam yang lalu`;
        return `${minutes} menit yang lalu`;
    };

    if (drafts.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Draft Transaksi</h3>
                        <p className="text-sm text-gray-600">
                            {drafts.length} transaksi belum selesai
                        </p>
                    </div>
                </div>
                <div className="text-2xl">📝</div>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {drafts.map((draft, idx) => (
                        <motion.div
                            key={draft.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        draft.type === 'convert' ? 'bg-blue-100' : 'bg-green-100'
                                    }`}>
                                        {draft.type === 'convert' ? (
                                            <ArrowRightLeft size={18} className="text-blue-600" />
                                        ) : (
                                            <ArrowUpCircle size={18} className="text-green-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {draft.type === 'convert' ? 'Convert PayPal' : 'Top-up PayPal'}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Clock size={12} />
                                            {getTimeAgo(draft.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onResumeDraft(draft)}
                                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                    >
                                        <Play size={14} />
                                        Lanjutkan
                                    </button>
                                    <button
                                        onClick={() => deleteDraft(draft.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-gray-700">
                                    <DollarSign size={14} />
                                    <span className="font-semibold">${draft.amount} USD</span>
                                </div>
                                {draft.details?.bank_name && (
                                    <div className="text-gray-500">
                                        → {draft.details.bank_name}
                                    </div>
                                )}
                            </div>

                            {/* Urgency indicator */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-500">
                                        💡 Selesaikan transaksi untuk lock rate saat ini
                                    </p>
                                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-1 bg-yellow-500 w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800 font-medium flex items-center gap-2">
                    <Clock size={14} />
                    Draft akan otomatis terhapus setelah 7 hari
                </p>
            </div>
        </div>
    );
};

// Helper function to save draft (export for use in TransactionWizard)
export const saveDraft = (type: 'convert' | 'topup', amount: string, details: any) => {
    const draft: Draft = {
        id: Date.now().toString(),
        type,
        amount,
        details,
        createdAt: new Date().toISOString()
    };

    const stored = localStorage.getItem('lapakbangade_drafts');
    const existing: Draft[] = stored ? JSON.parse(stored) : [];

    // Limit to 5 drafts
    const updated = [draft, ...existing].slice(0, 5);
    localStorage.setItem('lapakbangade_drafts', JSON.stringify(updated));
};
