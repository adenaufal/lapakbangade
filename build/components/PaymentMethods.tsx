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
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background Decor: Diagonal Lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#e5e7eb_10px,#e5e7eb_11px)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16"
        >
          Bisa cair <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">kemana aja?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Banks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Landmark size={24} />
              </div>
              <span className="font-bold text-lg text-gray-900">TRANSFER BANK</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 items-center grayscale group-hover:grayscale-0 transition-all duration-500">
              {BANK_LOGOS.map((bank) => (
                <div key={bank.name} className="h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300">
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
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full">+ puluhan bank lainnya</span>
            </div>
          </motion.div>

          {/* E-Wallets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <span className="font-bold text-lg text-gray-900">E-WALLET</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 items-center grayscale group-hover:grayscale-0 transition-all duration-500">
              {WALLET_LOGOS.map((wallet) => (
                <div key={wallet.name} className="h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300">
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
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Convert pulsa / e-wallet</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-sm text-gray-500 flex items-center justify-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Transaksi aman & langsung ke akun kamu sendiri.
        </motion.div>
      </div>
    </section>
  );
};
