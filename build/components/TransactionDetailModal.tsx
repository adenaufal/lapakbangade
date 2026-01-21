import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Clock, XCircle, Loader2, Copy, Share2, HelpCircle, ArrowRightLeft, ArrowUpCircle } from 'lucide-react';
import { Transaction } from '../types';
import { CONFIG } from '../constants';

const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, label: 'Menunggu' },
        processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Loader2, label: 'Diproses' },
        completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Berhasil' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Dibatalkan' },
        failed: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Gagal' },
    }[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: status };

    const Icon = config.icon;

    return (
        <div className={`flex flex-col items-center gap-2 mt-2`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.bg} ${config.text}`}>
                <Icon size={24} className={status === 'processing' ? 'animate-spin' : ''} />
            </div>
            <span className={`font-bold text-lg capitalize ${config.text}`}>
                {config.label}
            </span>
        </div>
    );
};

interface TransactionDetailModalProps {
    tx: Transaction;
    onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ tx, onClose }) => {
    const isConvert = tx.type === 'convert';
    const date = new Date(tx.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const config = {
        pending: { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock, label: 'Menunggu' },
        processing: { bg: 'bg-blue-50', text: 'text-blue-700', icon: Loader2, label: 'Diproses' },
        completed: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle2, label: 'Berhasil' },
        cancelled: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Dibatalkan' },
        failed: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Gagal' },
    }[tx.status] || { bg: 'bg-gray-50', text: 'text-gray-700', icon: Clock, label: tx.status };

    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
                {/* Compact Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <div className="text-sm font-semibold text-gray-500">
                        #{tx.display_id || tx.id.substring(0, 8).toUpperCase()}
                    </div>
                    <div className="flex gap-1">
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto px-5 py-6 custom-scrollbar">
                    <div className="flex flex-col items-center text-center mb-6">
                        {/* Transaction Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${isConvert ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {isConvert ? <ArrowRightLeft size={24} /> : <ArrowUpCircle size={24} />}
                        </div>

                        {/* Amount */}
                        <div className="mb-1">
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                {isConvert ? 'Dana Diterima' : 'Total Dibayar'}
                            </div>
                            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                {isConvert
                                    ? `Rp ${(tx.amount_idr || 0).toLocaleString('id-ID')}`
                                    : `Rp ${(tx.amount_idr || 0).toLocaleString('id-ID')}`
                                }
                            </div>
                        </div>

                        {/* Status Badge - Horizontal & Compact */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-2 ${config.bg} ${config.text}`}>
                            <Icon size={14} className={tx.status === 'processing' ? 'animate-spin' : ''} />
                            {config.label}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm border border-gray-100">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Tipe</span>
                            <span className="font-semibold text-gray-900">{isConvert ? 'Convert PayPal' : 'Top-up PayPal'}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Tanggal</span>
                            <span className="font-medium text-gray-900 text-right">{date}</span>
                        </div>

                        <div className="border-t border-dashed border-gray-200 my-2"></div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Nominal USD</span>
                            <span className="font-semibold text-gray-900">${(tx.amount_usd || 0).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Rate</span>
                            <span className="font-medium text-gray-900">Rp {(tx.rate || 0).toLocaleString('id-ID')}</span>
                        </div>

                        {isConvert && tx.amount_usd_net && (
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Est. Fee PayPal</span>
                                <span className="font-medium text-gray-600">-${((tx.amount_usd || 0) - (tx.amount_usd_net || 0)).toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    {/* Destination/Source Info - Compact */}
                    {isConvert && (
                        <div className="mt-4 flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center border border-brand-100 font-bold text-xs text-brand-600">
                                {tx.bank_name?.substring(0, 2).toUpperCase() || 'BK'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-gray-900 text-sm truncate">{tx.account_name}</div>
                                <div className="text-xs text-gray-500 truncate">{tx.bank_name} - {tx.account_number}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer - Only Links */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center gap-6 text-xs font-medium text-gray-500">
                    <a href={CONFIG.MESSENGER_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                        <HelpCircle size={14} /> Butuh Bantuan?
                    </a>
                </div>
            </motion.div>
        </div>
    );
};
