import React from 'react';
import { Percent, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const FeeSection = () => {
    return (
        <section id="fees" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900"
                    >
                        Biaya Convert <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">(Fee)</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Rate update otomatis menyesuaikan market, tetap kompetitif.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Standard Fees */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Percent size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Struktur Fee</h3>
                                <p className="text-sm text-gray-500">Transparan, tanpa biaya tersembunyi.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group/item">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-700 group-hover/item:text-gray-900 transition-colors">Nominal Kecil</span>
                                    <span className="text-xs text-gray-500">Convert {'<'} $50</span>
                                </div>
                                <span className="font-bold text-gray-900 text-lg bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">10%</span>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group/item">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-700 group-hover/item:text-gray-900 transition-colors">Nominal Besar</span>
                                    <span className="text-xs text-gray-500">Convert {'>='} $50</span>
                                </div>
                                <span className="font-bold text-brand-600 text-lg bg-brand-50 px-3 py-1 rounded-lg border border-brand-100">Flat $5</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">Makin besar nominal, makin hemat fee-nya.</p>
                        </div>
                    </motion.div>

                    {/* Friday Promo */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-indigo-600 transition-all duration-500 group-hover:scale-105"></div>

                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>

                        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Gift size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Promo Jumat Spesial</h3>
                                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-100 bg-brand-800/40 px-2 py-0.5 rounded-full w-fit mt-1 border border-brand-400/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            Limited Time
                                        </div>
                                    </div>
                                </div>

                                <p className="text-brand-50 text-lg font-medium leading-relaxed mb-6">
                                    Khusus transaksi pertama kamu di hari Jumat, dapatkan potongan spesial!
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center relative overflow-hidden group-hover:border-white/30 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                                <span className="block text-sm text-brand-100 uppercase tracking-widest font-semibold mb-1">Diskon Fee</span>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="block text-5xl font-black text-white drop-shadow-lg">50%</span>
                                    <span className="text-xl font-bold text-brand-200 self-end mb-2">OFF</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between text-sm font-medium text-brand-100/80 border-t border-white/10 pt-4">
                                <span>Syarat & ketentuan berlaku</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
