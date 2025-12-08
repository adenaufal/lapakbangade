import React from 'react';
import { Landmark, Smartphone } from 'lucide-react';

const BANK_LOGOS = [
  { name: 'BCA', src: '/logos/BCA.svg', width: 120, height: 40 },
  { name: 'Mandiri', src: '/logos/Mandiri.svg', width: 130, height: 40 },
  { name: 'BNI', src: '/logos/BNI.svg', width: 110, height: 40 },
  { name: 'BRI', src: '/logos/BRI.svg', width: 110, height: 40 },
  { name: 'BSI', src: '/logos/BSI.svg', width: 120, height: 40 },
];

const WALLET_LOGOS = [
  { name: 'DANA', src: '/logos/DANA.svg', width: 120, height: 40 },
  { name: 'OVO', src: '/logos/OVO.svg', width: 110, height: 40 },
  { name: 'GoPay', src: '/logos/GoPay.svg', width: 120, height: 40 },
  { name: 'ShopeePay', src: '/logos/ShopeePay.svg', width: 130, height: 40 },
  { name: 'LinkAja', src: '/logos/LinkAja.svg', width: 110, height: 40 },
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
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 items-center">
                    {BANK_LOGOS.map((bank) => (
                      <div key={bank.name} className="h-10 flex items-center justify-center">
                        <img
                          src={bank.src}
                          alt={bank.name}
                          className="h-full w-auto"
                          width={bank.width}
                          height={bank.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
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
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 items-center">
                    {WALLET_LOGOS.map((wallet) => (
                      <div key={wallet.name} className="h-10 flex items-center justify-center">
                        <img
                          src={wallet.src}
                          alt={wallet.name}
                          className="h-full w-auto"
                          width={wallet.width}
                          height={wallet.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
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
