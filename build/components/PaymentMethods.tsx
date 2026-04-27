import React from 'react';
import { Landmark, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

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
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe_0%,transparent_42%)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="mb-3 text-xs font-black uppercase text-brand-600">
          Mitra pencairan
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="mb-14 text-balance text-3xl font-black leading-tight text-slate-950 md:text-5xl"
        >
          Bisa cair <span className="text-brand-600">kemana aja?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Banks */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
                <Landmark size={24} />
              </div>
              <span className="text-lg font-black text-slate-950">TRANSFER BANK</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 grayscale transition duration-200 group-hover:grayscale-0">
              {BANK_LOGOS.map((bank) => (
                <div key={bank.name} className="flex h-10 items-center justify-center transition duration-200 hover:-translate-y-0.5">
                  <img
                    src={bank.src}
                    alt={bank.name}
                    className="h-full w-auto object-contain"
                    width={bank.width}
                    height={bank.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">Support semua bank resmi Indonesia</span>
            </div>
          </motion.div>

          {/* E-Wallets */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
                <Smartphone size={24} />
              </div>
              <span className="text-lg font-black text-slate-950">E-WALLET</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 grayscale transition duration-200 group-hover:grayscale-0">
              {WALLET_LOGOS.map((wallet) => (
                <div key={wallet.name} className="flex h-10 items-center justify-center transition duration-200 hover:-translate-y-0.5">
                  <img
                    src={wallet.src}
                    alt={wallet.name}
                    className="h-full w-auto object-contain"
                    width={wallet.width}
                    height={wallet.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">Free transfer ke semua e-wallet</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="mt-14 flex items-center justify-center gap-2 text-sm font-bold text-slate-500"
        >
          <div className="size-2 rounded-full bg-green-500"></div>
          Transaksi aman & langsung ke akun kamu sendiri.
        </motion.div>
      </div>
    </section>
  );
};
