import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import {
    Loader2,
    ArrowRightLeft,
    ArrowUpCircle,
    Clock,
    CheckCircle2,
    XCircle,
    ExternalLink,
    MessageCircle,
    User,
    Settings,
    Facebook,
    Gamepad2,
    Link,
    Copy,
    RefreshCw,
    Search,
    Download,
    FileText,
    FilterX
} from 'lucide-react';
import { Transaction } from '../types';
import { TransactionDetailModal } from './TransactionDetailModal';
import { MilestoneBadges } from './MilestoneBadges';
import { GoalProgress } from './GoalProgress';
import { StatusTier } from './StatusTier';
import { PendingTransactionUrgency } from './PendingTransactionUrgency';
import { ReferralProgram } from './ReferralProgram';
import { SavedDrafts } from './SavedDrafts';
import { StreakCounter } from './StreakCounter';
import { ReferralLeaderboard } from './ReferralLeaderboard';
import { useTransactionUpdates } from '../hooks/useTransactionUpdates';
import { buildTrustSummary } from '../utils/fraudDetection';
import { TrustIndicators } from './TrustIndicators';

// Type definitions for API responses
// Local Transaction interface removed in favor of '../types'

interface LinkedAccounts {
    google?: boolean;
    facebook?: boolean;
    discord?: boolean;
}

interface UserRefreshResponse {
    success: boolean;
    linked_accounts?: LinkedAccounts;
}

interface LinkGenerateResponse {
    success: boolean;
    code?: string;
    error?: string;
    expires_in_seconds?: number;
}

// Mock transactions for demo - will be replaced with API call
const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'convert',
        amount_usd: 50,
        amount_idr: 775000,
        rate: 15500,
        status: 'completed',
        created_at: '2026-01-20T10:30:00Z',
        completed_at: '2026-01-20T10:45:00Z',
    },
    {
        id: '2',
        type: 'topup',
        amount_usd: 25,
        amount_idr: 412500,
        rate: 16500,
        status: 'pending',
        created_at: '2026-01-21T08:00:00Z',
    },
    {
        id: '3',
        type: 'convert',
        amount_usd: 100,
        amount_idr: 1540000,
        rate: 15400,
        status: 'completed',
        created_at: '2026-01-18T14:20:00Z',
        completed_at: '2026-01-18T14:35:00Z',
    },
];

const escapeCsvCell = (value: string | number): string => {
    const text = String(value ?? '');
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
};

const escapeHtmlCell = (value: string | number): string => {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
        processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Loader2, label: 'Processing' },
        completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Selesai' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Dibatalkan' },
        failed: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Gagal' },
    }[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: status };

    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <Icon size={14} className={status === 'processing' ? 'animate-spin' : ''} />
            {config.label}
        </span>
    );
};

// TransactionDetailModal moved to separate file

const TransactionCard: React.FC<{ tx: Transaction; onClick: (tx: Transaction) => void }> = ({ tx, onClick }) => {
    const isConvert = tx.type === 'convert';
    const date = new Date(tx.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            onClick={() => onClick(tx)}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isConvert ? 'bg-blue-100 group-hover:bg-blue-200' : 'bg-green-100 group-hover:bg-green-200'}`}>
                        {isConvert ? (
                            <ArrowRightLeft size={20} className="text-blue-600" />
                        ) : (
                            <ArrowUpCircle size={20} className="text-green-600" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                            {isConvert ? 'Convert PayPal → IDR' : 'Top-up PayPal'}
                        </p>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>
                </div>
                <StatusBadge status={tx.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Amount USD</p>
                    <p className="font-semibold text-gray-900">${(tx.amount_usd || 0).toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">Amount IDR</p>
                    <p className="font-semibold text-gray-900">Rp {(tx.amount_idr || 0).toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">Rate</p>
                    <p className="font-medium text-gray-700">Rp {(tx.rate || 0).toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">ID</p>
                    <div className="flex items-center gap-1">
                        <p className="font-mono text-xs text-gray-600">#{tx.display_id || tx.id.substring(0, 8)}</p>
                        <ExternalLink size={10} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    );
};

import { TransactionWizard } from './TransactionWizard';

export const Dashboard = () => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
    const [isWizardOpen, setIsWizardOpen] = React.useState(false);
    const [linkedAccounts, setLinkedAccounts] = React.useState<LinkedAccounts>({
        google: true, // Always true if logged in via Google
        facebook: false,
        discord: false
    });
    const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);
    const [linkCode, setLinkCode] = React.useState<string | null>(null);
    const [isGeneratingCode, setIsGeneratingCode] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [typeFilter, setTypeFilter] = React.useState<string>('all');
    const [dateFrom, setDateFrom] = React.useState('');
    const [dateTo, setDateTo] = React.useState('');

    const {
        transactions,
        isLoading: isLoadingTransactions,
        isRefreshing: isRefreshingTransactions,
        error: transactionError,
        lastUpdatedAt,
        statusChanges,
        refreshNow,
        clearStatusChanges,
    } = useTransactionUpdates({
        enabled: !!user,
        pollIntervalMs: 30_000,
        useMockData: true,
        mockTransactions,
    });

    React.useEffect(() => {
        if (!user) {
            return;
        }

        fetch('/api/user/refresh')
            .then(res => res.json())
            .then((data: UserRefreshResponse) => {
                if (data.success && data.linked_accounts) {
                    setLinkedAccounts(prev => ({ ...prev, ...data.linked_accounts }));
                }
            })
            .catch(console.error);
    }, [user]);

    const trustSummary = React.useMemo(() => buildTrustSummary(transactions), [transactions]);
    const completedCount = transactions.filter(t => t.status === 'completed' || t.status === 'success').length;
    const pendingCount = transactions.filter(t => ['pending', 'processing', 'waiting_payment', 'waiting_transfer'].includes(t.status)).length;
    const totalVolume = transactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const availableStatuses = React.useMemo(
        () => ['all', ...new Set(transactions.map((tx) => (tx.status || 'unknown').toLowerCase()))],
        [transactions],
    );

    const filteredTransactions = React.useMemo(() => {
        const fromDate = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : null;
        const toDate = dateTo ? new Date(`${dateTo}T23:59:59.999`).getTime() : null;

        return transactions.filter((tx) => {
            if (statusFilter !== 'all' && (tx.status || '').toLowerCase() !== statusFilter.toLowerCase()) {
                return false;
            }

            if (typeFilter !== 'all' && (tx.type || '').toLowerCase() !== typeFilter.toLowerCase()) {
                return false;
            }

            const txTime = new Date(tx.created_at).getTime();
            if (fromDate && txTime < fromDate) {
                return false;
            }
            if (toDate && txTime > toDate) {
                return false;
            }

            if (!normalizedSearch) {
                return true;
            }

            const haystack = [
                tx.id,
                tx.display_id || '',
                tx.status || '',
                tx.type || '',
                tx.account_name || '',
                tx.account_number || '',
                tx.bank_name || '',
            ].join(' ').toLowerCase();

            return haystack.includes(normalizedSearch);
        });
    }, [transactions, statusFilter, typeFilter, dateFrom, dateTo, normalizedSearch]);

    const filteredVolume = filteredTransactions.reduce((sum, tx) => sum + (tx.amount_usd || 0), 0);
    const filteredCompleted = filteredTransactions.filter((tx) => tx.status === 'completed' || tx.status === 'success').length;
    const filteredPending = filteredTransactions.filter((tx) => ['pending', 'processing', 'waiting_payment', 'waiting_transfer'].includes(tx.status)).length;
    const latestStatusChange = statusChanges[0];

    const resetFilters = React.useCallback(() => {
        setSearchQuery('');
        setStatusFilter('all');
        setTypeFilter('all');
        setDateFrom('');
        setDateTo('');
    }, []);

    const exportCsv = React.useCallback(() => {
        if (filteredTransactions.length === 0) {
            alert('Tidak ada data untuk diexport.');
            return;
        }

        const header = ['Transaction ID', 'Type', 'Status', 'Amount USD', 'Amount IDR', 'Rate', 'Created At'];
        const rows = filteredTransactions.map((tx) => [
            tx.display_id || tx.id,
            tx.type,
            tx.status,
            tx.amount_usd || 0,
            tx.amount_idr || 0,
            tx.rate || 0,
            tx.created_at,
        ]);

        const csv = [header, ...rows]
            .map((row) => row.map((cell) => escapeCsvCell(cell)).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }, [filteredTransactions]);

    const exportPdf = React.useCallback(() => {
        if (filteredTransactions.length === 0) {
            alert('Tidak ada data untuk diexport.');
            return;
        }

        const rowsHtml = filteredTransactions.map((tx) => `
            <tr>
                <td>${escapeHtmlCell(tx.display_id || tx.id)}</td>
                <td>${escapeHtmlCell(tx.type)}</td>
                <td>${escapeHtmlCell(tx.status)}</td>
                <td>${escapeHtmlCell((tx.amount_usd || 0).toLocaleString('en-US'))}</td>
                <td>${escapeHtmlCell((tx.amount_idr || 0).toLocaleString('id-ID'))}</td>
                <td>${escapeHtmlCell((tx.rate || 0).toLocaleString('id-ID'))}</td>
                <td>${escapeHtmlCell(new Date(tx.created_at).toLocaleString('id-ID'))}</td>
            </tr>
        `).join('');

        const popup = window.open('', '_blank', 'width=1200,height=900');
        if (!popup) {
            alert('Popup diblokir browser. Izinkan pop-up untuk export PDF.');
            return;
        }

        popup.document.write(`
            <html>
                <head>
                    <title>Transaction Export</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 24px; color: #111827; }
                        h1 { margin-bottom: 12px; }
                        .meta { color: #6b7280; margin-bottom: 16px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 12px; }
                        th { background: #f3f4f6; font-weight: 600; }
                    </style>
                </head>
                <body>
                    <h1>Riwayat Transaksi</h1>
                    <p class="meta">Generated: ${escapeHtmlCell(new Date().toLocaleString('id-ID'))}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>USD</th>
                                <th>IDR</th>
                                <th>Rate</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </body>
            </html>
        `);
        popup.document.close();
        popup.focus();
        popup.print();
    }, [filteredTransactions]);

    const generateLinkCode = async () => {
        setIsGeneratingCode(true);
        try {
            const res = await fetch('/api/link/generate', { method: 'POST' });
            const data = await res.json() as LinkGenerateResponse;
            if (data.success) {
                setLinkCode(data.code || null);
                setIsLinkModalOpen(true);
            } else {
                alert('Gagal generate code: ' + (data.error || 'Unknown error'));
            }
        } catch (e) {
            console.error(e);
            alert('Terjadi kesalahan saat generate code.');
        } finally {
            setIsGeneratingCode(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-brand-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Transaction Wizard */}
            {isWizardOpen && (
                <TransactionWizard
                    onClose={() => setIsWizardOpen(false)}
                    onSuccess={() => {
                        void refreshNow(); // Refresh
                        // Don't close immediately, wizard shows success step
                    }}
                    user={user}
                />
            )}

            {/* Transaction Detail Modal */}
            {selectedTransaction && (
                <TransactionDetailModal
                    tx={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}

            {/* Link Account Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsLinkModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <XCircle size={24} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Link size={24} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Hubungkan Akun</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Kirim kode di bawah ini ke bot Facebook atau Discord kami untuk menghubungkan akun.
                            </p>
                        </div>

                        <div className="bg-gray-100 rounded-xl p-4 mb-6 text-center">
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Kode Link Anda</p>
                            <div className="flex items-center justify-center gap-2">
                                <code className="text-3xl font-mono font-bold text-brand-600 tracking-wider">
                                    {linkCode}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(linkCode || '');
                                        alert('Kode disalin!');
                                    }}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                    title="Copy Code"
                                >
                                    <Copy size={18} className="text-gray-500" />
                                </button>
                            </div>
                            <p className="text-xs text-red-500 mt-2">Kode ini akan kadaluarsa dalam 15 menit.</p>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <MessageCircle size={18} className="text-blue-600" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">Facebook Messenger</p>
                                    <p className="text-gray-500">Kirim chat: <code className="bg-gray-100 px-1 rounded">!link {linkCode}</code></p>
                                </div>
                            </div>
                            <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-full">
                                    <Gamepad2 size={18} className="text-indigo-600" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">Discord Bot</p>
                                    <p className="text-gray-500">Kirim chat: <code className="bg-gray-100 px-1 rounded">/link {linkCode}</code></p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsLinkModalOpen(false)}
                            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Info Banner - Moved to Top */}
                    <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <MessageCircle size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-900 font-medium">Transaksi via Messenger/Discord</p>
                            <p className="text-sm text-blue-700">
                                Untuk saat ini, transaksi dilakukan melalui chat Messenger atau Discord.
                                Dashboard ini menampilkan riwayat transaksi Anda.
                            </p>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2">
                            {user?.picture ? (
                                <img src={user.picture} alt={user.name || ''} className="w-14 h-14 rounded-full border-2 border-brand-200" />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center">
                                    <User size={24} className="text-brand-600" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Halo, {user?.name?.split(' ')[0] || 'User'}! 👋
                                </h1>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {transactionError && (
                        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-700">
                            Gagal memuat update transaksi terbaru: {transactionError}
                        </div>
                    )}

                    {latestStatusChange && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="text-sm text-emerald-800">
                                Update terbaru: #{latestStatusChange.displayId} berubah dari
                                {' '}<span className="font-semibold">{latestStatusChange.fromStatus}</span>
                                {' '}ke
                                {' '}<span className="font-semibold">{latestStatusChange.toStatus}</span>.
                            </div>
                            <button
                                onClick={clearStatusChanges}
                                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                            >
                                Sembunyikan
                            </button>
                        </div>
                    )}

                    {/* Status Tier & Streak */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <StatusTier
                            completedCount={completedCount}
                            totalVolume={totalVolume}
                        />
                        <StreakCounter userId={user?.sub || user?.id || 'anonymous'} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500 mb-1">Total Transaksi</p>
                            <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500 mb-1">Selesai / Pending</p>
                            <p className="text-2xl font-bold text-gray-900">
                                <span className="text-green-600">{completedCount}</span>
                                <span className="text-gray-400 mx-1">/</span>
                                <span className="text-yellow-600">{pendingCount}</span>
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500 mb-1">Total Volume</p>
                            <p className="text-2xl font-bold text-gray-900">${totalVolume.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500 mb-1">Hasil Filter</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                ${filteredVolume.toLocaleString()} • {filteredCompleted} selesai / {filteredPending} pending
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <TrustIndicators summary={trustSummary} />
                        {lastUpdatedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                                Last synced: {new Date(lastUpdatedAt).toLocaleString('id-ID')}
                            </p>
                        )}
                    </div>

                    {/* Linked Accounts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Account Status Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 col-span-1 md:col-span-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Linked Accounts</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsWizardOpen(true)}
                                        className="text-sm bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shadow-sm shadow-brand-200"
                                    >
                                        <ArrowRightLeft size={14} />
                                        Transaksi Baru
                                    </button>
                                    <button
                                        onClick={generateLinkCode}
                                        disabled={isGeneratingCode}
                                        className="text-sm bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
                                    >
                                        {isGeneratingCode ? <Loader2 size={14} className="animate-spin" /> : <Link size={14} />}
                                        Link New Account
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Google */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-sm font-bold text-gray-600">
                                            G
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">Google</span>
                                            <span className="text-xs text-green-600 font-medium">Connected</span>
                                        </div>
                                    </div>
                                    <CheckCircle2 size={18} className="text-green-500" />
                                </div>

                                {/* Facebook */}
                                <div className={`flex items-center justify-between p-3 rounded-lg border ${linkedAccounts.facebook ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${linkedAccounts.facebook ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
                                            <Facebook size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">Facebook</span>
                                            {linkedAccounts.facebook ? (
                                                <span className="text-xs text-blue-600 font-medium">Connected</span>
                                            ) : (
                                                <span className="text-xs text-gray-400">Not Connected</span>
                                            )}
                                        </div>
                                    </div>
                                    {linkedAccounts.facebook ? (
                                        <CheckCircle2 size={18} className="text-blue-500" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                    )}
                                </div>

                                {/* Discord */}
                                <div className={`flex items-center justify-between p-3 rounded-lg border ${linkedAccounts.discord ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${linkedAccounts.discord ? 'bg-white text-indigo-600' : 'bg-gray-200 text-gray-400'}`}>
                                            <Gamepad2 size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">Discord</span>
                                            {linkedAccounts.discord ? (
                                                <span className="text-xs text-indigo-600 font-medium">Connected</span>
                                            ) : (
                                                <span className="text-xs text-gray-400">Not Connected</span>
                                            )}
                                        </div>
                                    </div>
                                    {linkedAccounts.discord ? (
                                        <CheckCircle2 size={18} className="text-indigo-500" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Transaction Urgency */}
                    {pendingCount > 0 && (
                        <div className="mb-8">
                            <PendingTransactionUrgency transactions={transactions} />
                        </div>
                    )}

                    {/* Goals & Achievements Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <GoalProgress
                            completedCount={completedCount}
                            totalVolume={totalVolume}
                            transactionCount={transactions.length}
                        />
                        <MilestoneBadges
                            completedCount={completedCount}
                            totalVolume={totalVolume}
                            transactionCount={transactions.length}
                        />
                    </div>

                    {/* Saved Drafts */}
                    <div className="mb-8">
                        <SavedDrafts
                            onResumeDraft={(draft) => {
                                // TODO: Implement resume draft in TransactionWizard
                                setIsWizardOpen(true);
                                console.log('Resume draft:', draft);
                            }}
                        />
                    </div>

                    {/* Referral Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <ReferralProgram
                            userId={user?.sub || user?.id || ''}
                            userName={user?.name || 'User'}
                        />
                        <ReferralLeaderboard />
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        <button
                            onClick={() => setIsWizardOpen(true)}
                            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left"
                        >
                            <ArrowRightLeft size={18} />
                            Convert
                        </button>
                        <button
                            onClick={() => setIsWizardOpen(true)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left"
                        >
                            <ArrowUpCircle size={18} />
                            Top-up
                        </button>
                        <a
                            href="https://m.me/lapakbangade"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium text-sm transition-colors"
                        >
                            <MessageCircle size={18} />
                            Chat Admin
                        </a>
                        <button
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium text-sm transition-colors"
                            onClick={() => alert('Settings coming soon!')}
                        >
                            <Settings size={18} />
                            Settings
                        </button>
                    </div>

                    {/* Transactions */}
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Riwayat Transaksi</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => void refreshNow()}
                                    disabled={isRefreshingTransactions}
                                    className="inline-flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors disabled:opacity-60"
                                >
                                    <RefreshCw size={14} className={isRefreshingTransactions ? 'animate-spin' : ''} />
                                    Refresh
                                </button>
                                <button
                                    onClick={exportCsv}
                                    className="inline-flex items-center gap-1.5 text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Download size={14} />
                                    Export CSV
                                </button>
                                <button
                                    onClick={exportPdf}
                                    className="inline-flex items-center gap-1.5 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <FileText size={14} />
                                    Export PDF
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                                <div className="relative md:col-span-2">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Cari ID, status, tipe, bank..."
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                                >
                                    {availableStatuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status === 'all' ? 'Semua Status' : status}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={typeFilter}
                                    onChange={(event) => setTypeFilter(event.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                                >
                                    <option value="all">Semua Tipe</option>
                                    <option value="convert">Convert</option>
                                    <option value="topup">Top-up</option>
                                </select>

                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(event) => setDateFrom(event.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                                />
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(event) => setDateTo(event.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <a
                                    href="https://m.me/lapakbangade"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                                >
                                    Lihat Semua <ExternalLink size={14} />
                                </a>
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900"
                                >
                                    <FilterX size={12} />
                                    Reset Filter
                                </button>
                            </div>
                        </div>

                        {isLoadingTransactions ? (
                            <div className="flex justify-center p-12">
                                <Loader2 size={32} className="animate-spin text-brand-600" />
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                                <p className="text-gray-500 mb-4">Belum ada transaksi</p>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsWizardOpen(true); }}
                                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Mulai Transaksi Pertama
                                </a>
                            </div>
                        ) : filteredTransactions.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                                <p className="text-gray-500 mb-3">Tidak ada transaksi yang cocok dengan filter saat ini.</p>
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <FilterX size={14} />
                                    Hapus Filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredTransactions.map((tx) => (
                                    <TransactionCard
                                        key={tx.id}
                                        tx={tx}
                                        onClick={(transaction) => setSelectedTransaction(transaction)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
