import React from 'react';
import { BANKS, WALLETS } from '../constants';
import { Landmark, Smartphone } from 'lucide-react';

export const PaymentMethods = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Bisa cair kemana aja?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Banks */}
            <div>
                <div className="flex items-center justify-center gap-2 mb-6 text-brand-600">
                    <Landmark size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">Transfer Bank</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {BANKS.map((bank, idx) => (
                        <div key={idx} className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 min-w-[100px]">
                            {bank}
                        </div>
                    ))}
                </div>
            </div>

            {/* E-Wallets */}
            <div>
                <div className="flex items-center justify-center gap-2 mb-6 text-brand-600">
                    <Smartphone size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">E-Wallet</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {WALLETS.map((wallet, idx) => (
                        <div key={idx} className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 min-w-[100px]">
                            {wallet}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
            Transaksi aman & langsung ke akun kamu sendiri.
        </div>
      </div>
    </section>
  );
};