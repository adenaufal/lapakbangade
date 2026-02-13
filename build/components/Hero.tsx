import React, { useState, useEffect, useMemo } from 'react';
import { Send, Clock, CheckCircle, MessageCircle, RefreshCw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RATE, CONFIG, TESTIMONIALS } from '../constants';
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';
import { fetchUsdIdrRate, rateConfig } from '../services/rates';

type Mode = 'convert' | 'topup';
type TopupCondition = 'promo' | 'normal' | 'mixed';

export const Hero = () => {
  const [usdAmount, setUsdAmount] = useState<number | string>(60);
  const [mode, setMode] = useState<Mode>('convert');
  const topupCondition: TopupCondition = 'promo';
  const [baseRate, setBaseRate] = useState(rateConfig.fallbackBase);
  const [rateSource, setRateSource] = useState<'api' | 'fallback'>('fallback');
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  // Real Friday logic
  const [isFriday, setIsFriday] = useState(false);

  useEffect(() => {
    // Check if today is Friday (5)
    // We can also check time if needed, but simple day check is safer for now
    const today = new Date();
    setIsFriday(today.getDay() === 5);
  }, []);
  const heroAvatars = useMemo(() => {
    // Pick 4 random avatars from the central TESTIMONIALS list
    const shuffled = [...TESTIMONIALS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  const rawUsd = Number(usdAmount) || 0;

  useEffect(() => {
    const loadRate = async () => {
      setIsLoadingRate(true);
      const result = await fetchUsdIdrRate();
      setBaseRate(result.baseRate);
      setRateSource(result.source);
      setIsLoadingRate(false);
      trackEvent('rate_viewed', { base_rate: result.baseRate, source: result.source });
    };
    loadRate();
  }, []);

  const convertRate = Math.max(0, baseRate - rateConfig.convertAdjustment);

  // Convert fee logic
  let fee = 0;
  let isPromoApplied = false;

  if (rawUsd < 50) {
    fee = rawUsd * RATE.FEE_UNDER_50_PERCENT;
    if (isFriday) {
      fee = fee * 0.5;
      isPromoApplied = true;
    }
  } else {
    fee = RATE.FEE_OVER_50_FLAT;
  }

  const finalUsd = Math.max(0, rawUsd - fee);
  const idrReceived = finalUsd * convertRate;

  // Top-up (IDR -> USD) uses different adjustments
  const promoTopupRate = Math.max(0, baseRate + rateConfig.topupPromoDelta);
  const normalTopupRate = Math.max(0, baseRate + rateConfig.topupNormalDelta);
  const mixedTopupRate = (promoTopupRate + normalTopupRate) / 2;
  const effectiveTopupRate =
    topupCondition === 'promo'
      ? promoTopupRate
      : topupCondition === 'normal'
        ? normalTopupRate
        : mixedTopupRate;
  const topupIdrTotal = rawUsd * effectiveTopupRate;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const generatePrefilledMessage = (): string => {
    if (mode === 'convert') {
      return `Hi Bang Ade, saya mau convert $${rawUsd} USD ke Rupiah. Estimasi terima: ${formatIDR(idrReceived)}. Rate: Rp ${convertRate.toLocaleString('id-ID')}/USD.`;
    } else {
      return `Hi Bang Ade, saya mau top-up $${rawUsd} USD ke PayPal. Total bayar: ${formatIDR(topupIdrTotal)}. Rate: Rp ${effectiveTopupRate.toLocaleString('id-ID')}/USD.`;
    }
  };

  const getMessengerUrl = (): string => {
    const message = encodeURIComponent(generatePrefilledMessage());
    return `${CONFIG.MESSENGER_URL}?text=${message}`;
  };

  const getWhatsAppUrl = (): string => {
    const message = encodeURIComponent(generatePrefilledMessage());
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
  };

  const handleConvertClick = () => {
    const currentRate = mode === 'convert' ? convertRate : effectiveTopupRate;

    trackInitiateCheckout({
      amount: rawUsd,
      mode,
      rate: currentRate,
    });

    // Fire enhanced Lead event with value for Meta Pixel optimization
    trackLeadWithValue({
      value: rawUsd,
      currency: 'USD',
      mode,
      rate: currentRate,
    });

    trackEvent('cta_hero_click', {
      amount: rawUsd,
      mode,
      rate: currentRate,
      idr_amount: mode === 'convert' ? idrReceived : topupIdrTotal,
    });

    window.open(getMessengerUrl(), '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdAmount(e.target.value);
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Live Status Badge */}
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full mb-6 mx-auto lg:mx-0">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-700">
                  {CONFIG.LIVE_STATUS} • {CONFIG.AVERAGE_PROCESS_TIME}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                Convert PayPal ke Rupiah, <span className="text-brand-600 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-blue-400">Cepat & Aman</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Langsung cair ke bank atau e-wallet kamu. Rate update otomatis setiap jam, fee transparan, no hidden fee!
              </p>
            </motion.div>

            {/* Quick Points */}
            <motion.ul
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-3 mb-8 text-gray-600 inline-block text-left"
            >
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-brand-600 flex-shrink-0" />
                <span>Verifikasi manual aman anti-fraud</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-brand-600 flex-shrink-0" />
                <span>Support semua bank & e-wallet</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={20} className="text-brand-600 flex-shrink-0" />
                <span>Proses cepat 30-60 menit</span>
              </li>
            </motion.ul>

            {/* Social Proof Avatars */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex -space-x-3">
                {heroAvatars.map((avatar, idx) => (
                  <img
                    key={avatar.avatar + idx}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    src={avatar.avatar}
                    alt={avatar.name}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                  99+
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Dipercaya <span className="text-gray-900 font-bold">500+ Freelancer</span></p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConvertClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 ring-4 ring-brand-500/10"
              >
                <MessageCircle size={24} />
                Chat via Messenger
              </motion.button>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Jam operasional {CONFIG.OPERATIONAL_HOURS}
              </div>
            </motion.div>
          </div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex-1 w-full max-w-md z-10"
            id="calculator"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden ring-1 ring-black/5 transform transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <div className="bg-gray-900 p-4 text-white text-center">
                <div className="font-bold text-lg">
                  1 USD = Rp {(mode === 'convert' ? convertRate : effectiveTopupRate).toLocaleString('id-ID')}
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                  <RefreshCw size={12} className={isLoadingRate ? 'animate-spin' : ''} />
                  {isLoadingRate ? 'Memuat rate...' : `Sumber: ${rateSource === 'api' ? 'API' : 'Fallback'}`}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    className={`w-full px-4 py-3 rounded-lg border text-sm font-semibold transition ${mode === 'convert' ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-200'}`}
                    onClick={() => setMode('convert')}
                  >
                    Convert USD ke IDR
                  </button>
                  <button
                    className={`w-full px-4 py-3 rounded-lg border text-sm font-semibold transition ${mode === 'topup' ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-200'}`}
                    onClick={() => setMode('topup')}
                  >
                    Top-up USD
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="usd-amount">Nominal (USD)</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      value={usdAmount}
                      onChange={handleInputChange}
                      id="usd-amount"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-xl font-bold text-gray-900 transition-all"
                      placeholder="50"
                      min={RATE.MIN_TRANSACTION}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Min ${RATE.MIN_TRANSACTION}, maks ${RATE.MAX_TRANSACTION} per hari.</p>
                </div>

                {mode === 'convert' ? (
                  <div className="flex flex-col gap-4 min-h-[160px]">
                    <div className="bg-blue-50/50 p-4 rounded-lg space-y-2 border border-dashed border-blue-100">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Estimasi Fee</span>
                        <span className="font-medium">-${fee.toFixed(2)}</span>
                      </div>
                      {isPromoApplied && (
                        <div className="flex justify-between text-xs text-green-600 font-bold">
                          <span>Promo Jumat (50% Off Fee)</span>
                          <span>Applied!</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kamu Terima (IDR)</label>
                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          aria-label="Jumlah Rupiah yang kamu terima"
                          value={formatIDR(idrReceived)}
                          className="w-full pl-4 pr-4 py-3 bg-brand-50 border border-brand-200 rounded-lg text-2xl font-bold text-brand-700"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 min-h-[160px]">
                    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-1.5">
                      <div className="text-sm text-gray-700 font-semibold">Top-up rate (saldo tersedia)</div>
                      <p className="text-xs text-gray-600">Jika saldo admin kosong, rate normal akan dikonfirmasi dulu.</p>
                      <div className="flex justify-between text-sm text-gray-600 pt-1 border-t border-blue-100">
                        <span>IDR yang harus dibayar</span>
                        <span className="font-bold text-gray-900">{formatIDR(topupIdrTotal)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConvertClick}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  <span>{mode === 'convert' ? 'Lanjut Convert ke Rupiah' : 'Lanjut Top-up USD'}</span>
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
