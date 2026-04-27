import React, { useState, useEffect } from 'react';
import { Percent, Gift, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const FeeSection = () => {
    const [timeUntilFriday, setTimeUntilFriday] = useState<string>('');
    const [isFriday, setIsFriday] = useState(false);

    useEffect(() => {
        const calculateTimeUntilFriday = () => {
            const now = new Date();
            const currentDay = now.getDay();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentSeconds = now.getSeconds();

            // Check if it's Friday (5)
            const todayIsFriday = currentDay === 5;
            setIsFriday(todayIsFriday);

            if (todayIsFriday) {
                // Calculate time until end of Friday (23:59:59)
                const hoursLeft = 23 - currentHours;
                const minutesLeft = 59 - currentMinutes;
                const secondsLeft = 59 - currentSeconds;

                if (hoursLeft >= 0 && minutesLeft >= 0 && secondsLeft >= 0) {
                    const hours = String(hoursLeft).padStart(2, '0');
                    const minutes = String(minutesLeft).padStart(2, '0');
                    const seconds = String(secondsLeft).padStart(2, '0');
                    setTimeUntilFriday(`${hours}:${minutes}:${seconds}`);
                } else {
                    setTimeUntilFriday('00:00:00');
                }
            } else {
                // Calculate days until next Friday
                const daysUntilFriday = currentDay < 5 ? 5 - currentDay : 7 - currentDay + 5;
                const nextFriday = new Date(now);
                nextFriday.setDate(now.getDate() + daysUntilFriday);
                nextFriday.setHours(23, 59, 59, 999);

                const diff = nextFriday.getTime() - now.getTime();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                setTimeUntilFriday(`${days} hari ${hours} jam`);
            }
        };

        calculateTimeUntilFriday();
        const interval = setInterval(calculateTimeUntilFriday, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="fees" className="relative overflow-hidden bg-white py-20 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <p className="mb-3 text-xs font-black uppercase text-brand-600">
                        Fee & Promo
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2 }}
                        className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-5xl"
                    >
                        Biaya convert <span className="text-brand-600">transparan.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-8 text-slate-600"
                    >
                        Rate update otomatis menyesuaikan market, tetap kompetitif.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Standard Fees */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-200 group"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3.5 bg-brand-50 rounded-2xl text-brand-600 shadow-sm">
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
                                <span className="font-bold text-brand-600 text-lg bg-brand-50 px-3 py-1 rounded-lg border border-brand-100">Just $4.97</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                            <p className="text-sm text-gray-500 text-center">Makin besar nominal, makin hemat fee-nya.</p>
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-xs text-blue-700 font-medium">💡 <strong>Pro Tips:</strong> Untuk nominal di bawah $50, lebih hemat convert di hari Jumat dengan diskon 50% fee. Top-up PayPal tidak ada fee tambahan!</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="relative group overflow-hidden rounded-3xl bg-slate-950 shadow-lg transition duration-200 hover:-translate-y-0.5"
                    >
                        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-brand-600/25"></div>

                        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3.5 bg-amber-400 rounded-2xl text-slate-950 shadow-inner">
                                        <Gift size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Promo Jumat Spesial</h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-100 bg-white/10 px-2 py-1 rounded-full w-fit mt-1 border border-white/10">
                                            <span className="size-1.5 rounded-full bg-green-400"></span>
                                            {isFriday ? (
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    Berakhir dalam {timeUntilFriday}
                                                </span>
                                            ) : (
                                                <span>Promo berikutnya: {timeUntilFriday}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-brand-50 text-lg font-medium leading-relaxed mb-6">
                                    Khusus transaksi pertama kamu di hari Jumat, dapatkan diskon 50% untuk fee transaksi di bawah $50!
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center">
                                <span className="block text-sm font-bold uppercase text-brand-100 mb-1">Diskon Fee</span>
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
