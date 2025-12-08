import React from 'react';
import { Percent, Gift } from 'lucide-react';
import { RATE } from '../constants';

export const FeeSection = () => {
  return (
    <section id="fees" className="py-20 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Biaya Convert (Fee)</h2>
            <p className="text-gray-400">Rate update otomatis menyesuaikan market, tetap kompetitif.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Fees */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-900 rounded-lg text-brand-400">
                        <Percent size={24} />
                    </div>
                    <h3 className="text-xl font-bold">Struktur Fee</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                        <span className="font-medium text-gray-300">Convert {'<'} $50</span>
                        <span className="font-bold text-white text-lg">10% Fee</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                        <span className="font-medium text-gray-300">Convert {'>='} $50</span>
                        <span className="font-bold text-white text-lg">Flat $5</span>
                    </div>
                </div>
            </div>

            {/* Friday Promo */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-3 bg-white/20 rounded-lg text-white">
                        <Gift size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Promo Jumat Spesial</h3>
                </div>
                
                <p className="text-brand-100 mb-6 leading-relaxed relative z-10">
                    Khusus transaksi pertama kamu di hari Jumat, dapatkan diskon spesial!
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-center relative z-10">
                    <span className="block text-sm text-brand-100 uppercase tracking-wider mb-1">Diskon Fee</span>
                    <span className="block text-4xl font-extrabold text-white">50% OFF</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
