import React, { useState, useEffect } from 'react';
import {
    ArrowRightLeft,
    ArrowUpCircle,
    Banknote,
    Building2,
    Calendar,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    DollarSign,
    Info,
    Loader2,
    Lock,
    Send,
    User,
    Wallet,
    X,
    XCircle
} from 'lucide-react';
import {
    fetchConvertRate,
    fetchTopupRate,
    createTransaction,
    RateBreakdown,
    TopupBreakdown,
    CreateTransactionResponse
} from '../services/transaction';
import { BANKS, WALLETS } from '../constants';

interface TransactionWizardProps {
    onClose: () => void;
    onSuccess: () => void;
    user: any;
}

type TransactionType = 'convert' | 'topup';

// Step 1: Type Selection
const TypeSelectionStep = ({
    selectedType,
    onSelect
}: {
    selectedType: TransactionType;
    onSelect: (type: TransactionType) => void;
}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
            onClick={() => onSelect('convert')}
            className={`p-6 rounded-xl border-2 transition-all text-left flex flex-col gap-4 relative overflow-hidden group ${selectedType === 'convert'
                    ? 'border-brand-600 bg-brand-50 shadow-md ring-1 ring-brand-200'
                    : 'border-gray-200 hover:border-brand-300 hover:shadow-sm'
                }`}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedType === 'convert' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-100 group-hover:text-brand-600'
                }`}>
                <ArrowRightLeft size={24} />
            </div>
            <div>
                <h3 className={`font-bold text-lg mb-1 ${selectedType === 'convert' ? 'text-brand-900' : 'text-gray-900'}`}>
                    Convert PayPal
                </h3>
                <p className="text-sm text-gray-500">
                    Tukar saldo PayPal jadi Rupiah. Langsung cair ke rekening/e-wallet.
                </p>
            </div>
            {selectedType === 'convert' && (
                <div className="absolute top-4 right-4">
                    <CheckCircle2 className="text-brand-600" size={24} />
                </div>
            )}
        </button>

        <button
            onClick={() => onSelect('topup')}
            className={`p-6 rounded-xl border-2 transition-all text-left flex flex-col gap-4 relative overflow-hidden group ${selectedType === 'topup'
                    ? 'border-green-600 bg-green-50 shadow-md ring-1 ring-green-200'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }`}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedType === 'topup' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-600'
                }`}>
                <ArrowUpCircle size={24} />
            </div>
            <div>
                <h3 className={`font-bold text-lg mb-1 ${selectedType === 'topup' ? 'text-green-900' : 'text-gray-900'}`}>
                    Top-up PayPal
                </h3>
                <p className="text-sm text-gray-500">
                    Isi saldo PayPal pakai Rupiah. Rate murah & proses cepat.
                </p>
            </div>
            {selectedType === 'topup' && (
                <div className="absolute top-4 right-4">
                    <CheckCircle2 className="text-green-600" size={24} />
                </div>
            )}
        </button>
    </div>
);

// Step 2: Amount Input
const AmountInputStep = ({
    type,
    amount,
    setAmount,
    breakdown,
    isLoadingRate,
    rateError
}: {
    type: TransactionType;
    amount: string;
    setAmount: (val: string) => void;
    breakdown: RateBreakdown | TopupBreakdown | null;
    isLoadingRate: boolean;
    rateError: string | null;
}) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mau transaksi berapa USD?
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold">$</span>
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full pl-10 pr-4 py-4 text-3xl font-bold text-gray-900 border-gray-300 rounded-xl focus:ring-brand-500 focus:border-brand-500 border-2"
                        placeholder="0.00"
                        min="1"
                    />
                </div>
                <p className="mt-2 text-xs text-gray-500">Minimal $1.00 USD</p>
            </div>

            {isLoadingRate && (
                <div className="flex items-center gap-2 text-brand-600 bg-brand-50 p-3 rounded-lg">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm font-medium">Menghitung kalkulasi...</span>
                </div>
            )}

            {rateError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    <XCircle size={18} />
                    <span className="text-sm font-medium">{rateError}</span>
                </div>
            )}

            {breakdown && !isLoadingRate && !rateError && (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Banknote size={16} /> Rincian Transaksi
                    </h4>

                    {'usd_gross' in breakdown ? (
                        // Convert Breakdown
                        <>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Jumlah USD</span>
                                <span className="font-medium">${breakdown.usd_gross}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1">
                                    Fee
                                    {breakdown.is_discount && (
                                        <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                            DISKON 50%
                                        </span>
                                    )}
                                </span>
                                <span className="font-medium text-red-600">-${breakdown.fee}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t border-dashed border-gray-300 pt-2">
                                <span className="text-gray-600">Terima Bersih (USD)</span>
                                <span className="font-bold text-gray-900">${breakdown.usd_net}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Rate Tukar</span>
                                <span className="font-medium">Rp {breakdown.rate.toLocaleString()}</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 mt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">Total Diterima (IDR)</span>
                                    <span className="text-xl font-bold text-brand-600">
                                        Rp {breakdown.idr_total.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Topup Breakdown
                        <>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Jumlah Topup</span>
                                <span className="font-medium">${breakdown.amount_usd}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Rate</span>
                                <span className="font-medium">Rp {breakdown.rate.toLocaleString()}</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 mt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">Total Bayar (IDR)</span>
                                    <span className="text-xl font-bold text-brand-600">
                                        Rp {breakdown.total_idr.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

// Step 3: Details Input
const DetailsInputStep = ({
    type,
    details,
    setDetails,
    user
}: {
    type: TransactionType;
    details: any;
    setDetails: (val: any) => void;
    user: any;
}) => {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {type === 'convert' ? (
                <>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Rekening Penerima</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank / E-Wallet</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 text-gray-400 pointer-events-none z-10" size={18} />
                            <select
                                value={details.bank_name || ''}
                                onChange={e => setDetails({ ...details, bank_name: e.target.value })}
                                className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white appearance-none"
                                required
                            >
                                <option value="">Pilih Bank atau E-Wallet</option>
                                <optgroup label="Bank">
                                    {BANKS.map(bank => (
                                        <option key={bank} value={bank}>{bank}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="E-Wallet">
                                    {WALLETS.map(wallet => (
                                        <option key={wallet} value={wallet}>{wallet}</option>
                                    ))}
                                </optgroup>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronRight size={16} className="text-gray-400 rotate-90" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={details.account_number || ''}
                                onChange={e => setDetails({ ...details, account_number: e.target.value })}
                                className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                placeholder="Contoh: 1234567890"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Atas Nama</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={details.account_name || ''}
                                onChange={e => setDetails({ ...details, account_name: e.target.value })}
                                className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                placeholder="Nama sesuai rekening"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email PayPal Pengirim</label>
                        <div className="relative">
                            <Wallet className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={details.email || user.email || ''}
                                onChange={e => setDetails({ ...details, email: e.target.value })}
                                className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                placeholder="email-paypal-kamu@example.com"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Pastikan email ini sesuai dengan akun PayPal yang akan kirim saldo.</p>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Tujuan Top-up</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email PayPal Tujuan</label>
                        <div className="relative">
                            <Wallet className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={details.email || user.email || ''}
                                onChange={e => setDetails({ ...details, email: e.target.value })}
                                className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                placeholder="email-tujuan@example.com"
                            />
                        </div>
                        <p className="text-xs text-brand-600 mt-1 flex items-center gap-1">
                            <Info size={12} />
                            Pastikan email sudah benar. Kesalahan email bukan tanggung jawab kami.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

// Success Step
const SuccessStep = ({ result, type }: { result: CreateTransactionResponse; type: TransactionType }) => {
    return (
        <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaksi Dibuat!</h2>
            <p className="text-gray-600 mb-6">
                ID Transaksi: <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{result.display_id}</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-left mb-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Info size={18} />
                    Instruksi Pembayaran
                </h3>

                {type === 'convert' ? (
                    <div className="space-y-3">
                        <p className="text-sm text-blue-800">
                            Silakan transfer saldo PayPal sejumlah <span className="font-bold">${result.instruction.amount}</span> ke:
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-blue-100 flex justify-between items-center">
                            <code className="font-mono text-blue-900 font-bold">{result.instruction.email}</code>
                            <button
                                onClick={() => navigator.clipboard.writeText(result.instruction.email)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                            <p className="font-bold flex items-center gap-1 mb-1">
                                <Lock size={14} /> PENTING:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Gunakan metode <b>Friends & Family</b></li>
                                <li><b>JANGAN</b> tulis kata 'convert', 'jual', 'beli' di notes</li>
                                <li>Kosongkan notes atau tulis 'gift' saja</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-blue-800">
                            Silakan transfer Rupiah sejumlah <span className="font-bold">Rp {result.instruction.amount.toLocaleString()}</span> ke:
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-blue-100">
                            <p className="font-bold text-gray-900">{result.instruction.bank} - {result.instruction.account}</p>
                            <p className="text-sm text-gray-500">a.n {result.instruction.name}</p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-sm text-gray-500">
                Setelah transfer, transaksi akan diproses otomatis dalam 10-30 menit.
            </p>
        </div>
    );
};

export const TransactionWizard = ({ onClose, onSuccess, user }: TransactionWizardProps) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState<TransactionType>('convert');
    const [amount, setAmount] = useState('');
    const [breakdown, setBreakdown] = useState<RateBreakdown | TopupBreakdown | null>(null);
    const [isLoadingRate, setIsLoadingRate] = useState(false);
    const [rateError, setRateError] = useState<string | null>(null);
    const [details, setDetails] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<CreateTransactionResponse | null>(null);

    // Rate Calculation Effect
    useEffect(() => {
        const calculateRate = async () => {
            const val = parseFloat(amount);
            if (!amount || isNaN(val) || val <= 0) {
                setBreakdown(null);
                return;
            }

            setIsLoadingRate(true);
            setRateError(null);
            try {
                if (type === 'convert') {
                    const data = await fetchConvertRate(val);
                    setBreakdown(data);
                } else {
                    const data = await fetchTopupRate(val);
                    setBreakdown(data);
                }
            } catch (err: any) {
                setRateError(err.message || 'Gagal menghitung rate');
                setBreakdown(null);
            } finally {
                setIsLoadingRate(false);
            }
        };

        const timeout = setTimeout(calculateRate, 500); // Debounce
        return () => clearTimeout(timeout);
    }, [amount, type]);

    const handleSubmit = async () => {
        if (!breakdown || !amount) return;

        setIsSubmitting(true);
        try {
            const payload = {
                type,
                amount_usd: parseFloat(amount),
                bank_details: type === 'convert' ? {
                    bank_name: details.bank_name,
                    account_number: details.account_number,
                    account_name: details.account_name
                } : undefined,
                email: details.email
            };

            const response = await createTransaction(payload);
            if (response.success) {
                setResult(response);
                setStep(4); // Move to Success Step
                onSuccess(); // Trigger dashboard refresh in background
            } else {
                alert('Gagal membuat transaksi: ' + response.error);
            }
        } catch (e: any) {
            alert('Terjadi kesalahan: ' + e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStep2Valid = !isLoadingRate && !rateError && breakdown;
    const isStep3Valid = type === 'convert'
        ? (details.bank_name && details.account_number && details.account_name && details.email)
        : (details.email && details.email.includes('@')); // Basic validation

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {step === 4 ? 'Transaksi Berhasil' : 'Buat Transaksi Baru'}
                        </h2>
                        {step < 4 && (
                            <div className="flex items-center gap-2 mt-1">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-brand-600' : 'w-2 bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {step < 4 && (
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                            <X size={24} />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                    {step === 1 && (
                        <TypeSelectionStep
                            selectedType={type}
                            onSelect={(t) => { setType(t); setStep(2); }}
                        />
                    )}
                    {step === 2 && (
                        <AmountInputStep
                            type={type}
                            amount={amount}
                            setAmount={setAmount}
                            breakdown={breakdown}
                            isLoadingRate={isLoadingRate}
                            rateError={rateError}
                        />
                    )}
                    {step === 3 && (
                        <DetailsInputStep
                            type={type}
                            details={details}
                            setDetails={setDetails}
                            user={user}
                        />
                    )}
                    {step === 4 && result && (
                        <SuccessStep result={result} type={type} />
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-2xl">
                    {step === 4 ? (
                        <button
                            onClick={onClose}
                            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            Selesai
                        </button>
                    ) : (
                        <>
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 flex items-center gap-2"
                                >
                                    <ChevronLeft size={18} /> Kembali
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            {step === 1 ? (
                                // Step 1 handled by selection buttons
                                <></>
                            ) : step === 2 ? (
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!isStep2Valid}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${isStep2Valid
                                            ? 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/30'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    Lanjut <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isStep3Valid || isSubmitting}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${isStep3Valid && !isSubmitting
                                            ? 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/30'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={18} className="animate-spin" /> Memproses...</>
                                    ) : (
                                        <><Send size={18} /> Buat Transaksi</>
                                    )}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
