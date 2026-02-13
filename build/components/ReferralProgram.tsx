import React, { useState } from 'react';
import { Gift, Copy, Share2, Users, DollarSign, TrendingUp, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ReferralProgramProps {
    userId: string;
    userName: string;
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({ userId, userName }) => {
    const [copied, setCopied] = useState(false);

    // Generate referral code from user ID
    const referralCode = `LBA-${userId.substring(0, 8).toUpperCase()}`;
    const referralLink = `https://lapakbangade.com/?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareViaFacebook = () => {
        const text = encodeURIComponent(`Cobain convert PayPal ke Rupiah di Lapak Bang Ade! Rate bagus & aman. Pakai kode referral aku: ${referralCode}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${text}`, '_blank');
    };

    const shareViaTwitter = () => {
        const text = encodeURIComponent(`Cobain convert PayPal ke Rupiah di Lapak Bang Ade! Rate bagus & aman. Pakai kode referral aku: ${referralCode} ${referralLink}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const shareViaWhatsApp = () => {
        const text = encodeURIComponent(`Halo! Aku mau rekomendasiin jasa convert PayPal ke Rupiah yang aman & terpercaya: Lapak Bang Ade.\n\nRate kompetitif, proses cepat, dan udah dipercaya 500+ freelancer.\n\nPakai kode referral aku untuk bonus: ${referralCode}\n\n${referralLink}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    // Mock data - replace with real API data
    const referralStats = {
        totalReferrals: 3,
        successfulConversions: 2,
        totalEarnings: 15 // in USD
    };

    return (
        <div className="bg-gradient-to-br from-brand-600 to-purple-600 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 text-white relative">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-24 -mb-24"></div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <Gift size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black">Referral Program</h3>
                                <p className="text-sm opacity-90">Ajak teman, dapat bonus!</p>
                            </div>
                        </div>
                        <div className="text-4xl">🎁</div>
                    </div>

                    {/* Referral Code Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 mb-6">
                        <p className="text-xs font-semibold opacity-80 mb-2 uppercase tracking-wide">Kode Referral Anda</p>
                        <div className="flex items-center justify-between gap-3">
                            <code className="text-3xl font-black tracking-wider flex-1">{referralCode}</code>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 border border-white/30"
                            >
                                <Copy size={16} />
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/20">
                            <p className="text-xs opacity-70 mb-2">Link Referral:</p>
                            <div className="bg-white/10 rounded-lg p-2 text-xs font-mono break-all">
                                {referralLink}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                            <Users size={20} className="mx-auto mb-2 opacity-80" />
                            <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
                            <p className="text-xs opacity-70">Referrals</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                            <TrendingUp size={20} className="mx-auto mb-2 opacity-80" />
                            <p className="text-2xl font-bold">{referralStats.successfulConversions}</p>
                            <p className="text-xs opacity-70">Converted</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                            <DollarSign size={20} className="mx-auto mb-2 opacity-80" />
                            <p className="text-2xl font-bold">${referralStats.totalEarnings}</p>
                            <p className="text-xs opacity-70">Earned</p>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div>
                        <p className="text-sm font-semibold mb-3 opacity-90">Bagikan ke:</p>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={shareViaWhatsApp}
                                className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-green-500"
                            >
                                <MessageCircle size={18} />
                                WhatsApp
                            </button>
                            <button
                                onClick={shareViaFacebook}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-blue-500"
                            >
                                <Facebook size={18} />
                                Facebook
                            </button>
                            <button
                                onClick={shareViaTwitter}
                                className="bg-sky-500 hover:bg-sky-600 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm border border-sky-400"
                            >
                                <Twitter size={18} />
                                Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rewards Info */}
            <div className="bg-white p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💰</span> Cara Kerja Referral
                </h4>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 font-bold text-brand-600 text-sm">
                            1
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">Bagikan Kode Anda</p>
                            <p className="text-xs text-gray-600">Share kode referral ke teman atau sosial media</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 font-bold text-brand-600 text-sm">
                            2
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">Teman Daftar & Convert</p>
                            <p className="text-xs text-gray-600">Mereka pakai kode Anda saat transaksi pertama</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 font-bold text-brand-600 text-sm">
                            3
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">Dapat Bonus!</p>
                            <p className="text-xs text-gray-600">Anda dapat $5 per referral yang berhasil convert</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-bold text-green-900 mb-1">🎉 Bonus Spesial</p>
                    <p className="text-xs text-green-700">
                        Ajak 5 teman dalam sebulan, dapatkan bonus tambahan $25!
                    </p>
                </div>
            </div>
        </div>
    );
};
