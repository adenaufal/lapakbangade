import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Clock, XCircle, Loader2, Copy, Share2, Download, HelpCircle } from 'lucide-react';
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-gray-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
                {/* Header Actions */}
                <div className="flex justify-between items-center p-4 bg-gray-100">
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                    <div className="text-sm font-semibold text-gray-500">
                        Receipt #{tx.display_id || tx.id.substring(0, 8).toUpperCase()}
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <Share2 size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto px-4 pb-8 custom-scrollbar">
                    {/* Main Receipt Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">

                        {/* Sawtooth / Receipt edge effect (optional visual flair) */}
                        <div className="h-2 bg-gray-100 w-full absolute top-0 left-0 hidden"></div>

                        <div className="p-6 flex flex-col items-center text-center border-b border-dashed border-gray-200 pb-8">
                            {/* Logo / Brand */}
                            <div className="mb-4">
                                <img src="/favicon/apple-icon-180x180.png" alt="Logo" className="w-10 h-10 rounded-lg opacity-80" />
                            </div>

                            <StatusBadge status={tx.status} />

                            <div className="mt-6">
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                                    {isConvert ? 'Dana Diterima' : 'Total Dibayar'}
                                </div>
                                <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                    {isConvert
                                        ? `Rp ${(tx.amount_idr || 0).toLocaleString('id-ID')}`
                                        : `Rp ${(tx.amount_idr || 0).toLocaleString('id-ID')}` // Assuming topup also shows IDR paid
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-6 bg-gray-50/50 space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Transaction Details</div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Type</span>
                                <span className="font-semibold text-gray-900 capitalize">{isConvert ? 'Convert (PayPal to IDR)' : 'Top-up (IDR to PayPal)'}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium text-gray-900">{date}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Internal ID</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-gray-700 bg-gray-200 px-1.5 py-0.5 rounded text-xs">
                                        {tx.id}
                                    </span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(tx.id)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <Copy size={12} />
                                    </button>
                                </div>
                            </div>

                            <div className="my-4 border-t border-dashed border-gray-300"></div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Amount USD</span>
                                <span className="font-semibold text-gray-900">${(tx.amount_usd || 0).toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Rate Exchange</span>
                                <span className="font-medium text-gray-900">Rp {(tx.rate || 0).toLocaleString('id-ID')}</span>
                            </div>

                            {/* Fee / Net Info */}
                            {isConvert && tx.amount_usd_net && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">PayPal Fee (Est)</span>
                                    <span className="font-medium text-gray-900">-${((tx.amount_usd || 0) - (tx.amount_usd_net || 0)).toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        {/* Destination Info */}
                        {isConvert && (
                            <div className="p-6 bg-white border-t border-gray-200">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Destination Account</div>
                                <div className="flex items-center gap-4 bg-brand-50 p-4 rounded-xl border border-brand-100">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-brand-100 shadow-sm font-bold text-brand-600">
                                        {tx.bank_name?.substring(0, 2).toUpperCase() || 'BK'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{tx.account_name}</div>
                                        <div className="text-sm text-gray-600 font-mono">{tx.bank_name} - {tx.account_number}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Link to external proof/receipt if available (future) */}
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <a
                            href={CONFIG.MESSENGER_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors shadow-sm"
                        >
                            <HelpCircle size={18} />
                            Butuh Bantuan?
                        </a>
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-900 hover:bg-black rounded-xl text-white text-sm font-bold transition-colors shadow-lg shadow-gray-900/10"
                        >
                            Tutup
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            Transaction ID: {tx.id}<br />
                            &copy; {new Date().getFullYear()} LapakBangAde. All rights reserved.
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};
