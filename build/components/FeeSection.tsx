import React from 'react';
import { Percent, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const FeeSection = () => {
    return (
        <section id="fees" className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-extrabold mb-4 text-white"
                    >
                        Biaya Convert <span className="text-brand-400">(Fee)</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Rate update otomatis menyesuaikan market, tetap kompetitif.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Standard Fees */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3.5 bg-gray-800 rounded-2xl text-brand-400 ring-1 ring-white/10 shadow-lg">
                                <Percent size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Struktur Fee</h3>
                                <p className="text-sm text-gray-500">Transparan, tanpa biaya tersembunyi.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">Nominal Kecil</span>
                                    <span className="text-xs text-gray-500">Convert {'<'} $50</span>
                                </div>
                                <span className="font-bold text-white text-lg bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">10%</span>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">Nominal Besar</span>
                                    <span className="text-xs text-gray-500">Convert {'>='} $50</span>
                                </div>
                                <span className="font-bold text-brand-400 text-lg bg-brand-900/30 px-3 py-1 rounded-lg border border-brand-500/30">Flat $5</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-500">Makin besar nominal, makin hemat fee-nya.</p>
                        </div>
                    </motion.div>

                    {/* Friday Promo */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative group overflow-hidden rounded-3xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-indigo-700 transition-all duration-500 group-hover:scale-105"></div>

                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all"></div>

                        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/20">
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
