import React from 'react';
import { Landmark, Smartphone } from 'lucide-react';

const BANK_LOGOS = [
  { name: 'BCA', src: '/logos/BCA.svg' },
  { name: 'Mandiri', src: '/logos/Mandiri.svg' },
  { name: 'BNI', src: '/logos/BNI.svg' },
  { name: 'BRI', src: '/logos/BRI.svg' },
  { name: 'BSI', src: '/logos/BSI.svg' },
];

const WALLET_LOGOS = [
  { name: 'DANA', src: '/logos/DANA.svg' },
  { name: 'OVO', src: '/logos/OVO.svg' },
  { name: 'GoPay', src: '/logos/GoPay.svg' },
  { name: 'ShopeePay', src: '/logos/ShopeePay.svg' },
  { name: 'LinkAja', src: '/logos/LinkAja.svg' },
];

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
                <div className="flex flex-wrap justify-center gap-6 items-center">
                    {BANK_LOGOS.map((bank) => (
                      <img
                        key={bank.name}
                        src={bank.src}
                        alt={bank.name}
                        className="object-contain"
                        width="120"
                        height="36"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                    <span className="text-xs font-semibold text-gray-600">+ puluhan bank lainnya</span>
                </div>
            </div>

            {/* E-Wallets */}
            <div>
                <div className="flex items-center justify-center gap-2 mb-6 text-brand-600">
                    <Smartphone size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">E-Wallet</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 items-center">
                    {WALLET_LOGOS.map((wallet) => (
                      <img
                        key={wallet.name}
                        src={wallet.src}
                        alt={wallet.name}
                        className="object-contain"
                        width="120"
                        height="36"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                </div>
            </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-600">
            Transaksi aman & langsung ke akun kamu sendiri.
        </div>
      </div>
    </section>
  );
};
