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
    RefreshCw
} from 'lucide-react';

// Mock transactions for demo - will be replaced with API call
const mockTransactions = [
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

const TransactionCard = ({ tx }: { tx: any }) => {
    const isConvert = tx.type === 'convert';
    const date = new Date(tx.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isConvert ? 'bg-blue-100' : 'bg-green-100'}`}>
                        {isConvert ? (
                            <ArrowRightLeft size={20} className="text-blue-600" />
                        ) : (
                            <ArrowUpCircle size={20} className="text-green-600" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">
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
                    <p className="font-semibold text-gray-900">${tx.amount_usd.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">Amount IDR</p>
                    <p className="font-semibold text-gray-900">Rp {tx.amount_idr.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">Rate</p>
                    <p className="font-medium text-gray-700">Rp {tx.rate.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-500">ID</p>
                    <p className="font-mono text-xs text-gray-600">#{tx.display_id || tx.id.substring(0, 8)}</p>
                </div>
            </div>
        </div>
    );
};

export const Dashboard = () => {
    const { user, isLoading, isAuthenticated } = useAuth();

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

    const [transactions, setTransactions] = React.useState<any[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = React.useState(true);

    const [linkedAccounts, setLinkedAccounts] = React.useState<{ google?: boolean; facebook?: boolean; discord?: boolean }>({
        google: true, // Always true if logged in via Google
        facebook: false,
        discord: false
    });
    const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false);
    const [linkCode, setLinkCode] = React.useState<string | null>(null);
    const [codeExpiry, setCodeExpiry] = React.useState<number | null>(null);
    const [isGeneratingCode, setIsGeneratingCode] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            // Initial fetch of linked status
            fetch('/api/user/refresh')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.linked_accounts) {
                        setLinkedAccounts(prev => ({ ...prev, ...data.linked_accounts }));
                    }
                })
                .catch(console.error);

            // Fetch Transactions
            fetch('/api/transactions/list')
                .then(res => res.json())
                .then(data => {
                    if (data.success && Array.isArray(data.transactions)) {
                        setTransactions(data.transactions);
                    }
                })
                .catch(console.error)
                .finally(() => setIsLoadingTransactions(false));
        }
    }, [user]);

    const completedCount = transactions.filter(t => t.status === 'completed' || t.status === 'success').length;
    const pendingCount = transactions.filter(t => ['pending', 'processing', 'waiting_payment', 'waiting_transfer'].includes(t.status)).length;
    const totalVolume = transactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);

    const generateLinkCode = async () => {
        setIsGeneratingCode(true);
        try {
            const res = await fetch('/api/link/generate', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                setLinkCode(data.code);
                // Expiry is in seconds from now, calculate absolute time or just countdown
                // data.expires_in_seconds 
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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

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
                <div className="max-w-5xl mx-auto">
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

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                    </div>

                    {/* Linked Accounts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Account Status Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 col-span-1 md:col-span-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Linked Accounts</h3>
                                <button
                                    onClick={generateLinkCode}
                                    disabled={isGeneratingCode}
                                    className="text-sm bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
                                >
                                    {isGeneratingCode ? <Loader2 size={14} className="animate-spin" /> : <Link size={14} />}
                                    Link New Account
                                </button>
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

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        <a
                            href="https://m.me/lapakbangade?text=Halo%20min%2C%20mau%20convert"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 rounded-lg font-medium text-sm transition-colors"
                        >
                            <ArrowRightLeft size={18} />
                            Convert
                        </a>
                        <a
                            href="https://m.me/lapakbangade?text=Halo%20min%2C%20mau%20topup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium text-sm transition-colors"
                        >
                            <ArrowUpCircle size={18} />
                            Top-up
                        </a>
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
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Riwayat Transaksi</h2>
                            <a
                                href="https://m.me/lapakbangade"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                            >
                                Lihat Semua <ExternalLink size={14} />
                            </a>
                        </div>

                        {isLoadingTransactions ? (
                            <div className="flex justify-center p-12">
                                <Loader2 size={32} className="animate-spin text-brand-600" />
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                                <p className="text-gray-500 mb-4">Belum ada transaksi</p>
                                <a
                                    href="https://m.me/lapakbangade"
                                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Mulai Transaksi Pertama
                                </a>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {transactions.map((tx) => (
                                    <TransactionCard key={tx.id} tx={tx} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Banner */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
