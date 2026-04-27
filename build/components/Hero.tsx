import React, { useState, useEffect } from 'react';
import { ArrowDownUp, ArrowRight, CheckCircle, MessageCircle, RefreshCw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { RATE, CONFIG } from '../constants';
import { trackEvent, trackInitiateCheckout, trackLeadWithValue } from '../services/analytics';
import { fetchUsdIdrRate, rateConfig } from '../services/rates';
import { RateVolatilityAlert } from './RateVolatilityAlert';

import { cn } from '../utils/cn';

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
    <section id="calc" className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="pointer-events-none absolute -left-28 -top-28 size-96 rounded-full bg-brand-100/80" />
      <div className="pointer-events-none absolute -right-32 top-28 size-96 rounded-full bg-amber-100/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <RateVolatilityAlert currentRate={convertRate} rateSource={rateSource} />

        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-green-500" />
              Bot online · admin standby
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="mt-5 text-balance text-4xl font-extrabold leading-none text-slate-950 sm:text-5xl md:text-6xl"
            >
              Convert <span className="text-brand-600">PayPal</span> ke IDR, <br className="hidden sm:block" />
              <span className="relative inline-block">
                cepat &amp; aman
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-amber-500"
                  viewBox="0 0 280 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2,8 Q70,2 140,7 T278,5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{' '}
              dalam <span className="text-brand-600">30 menit</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:mx-0"
            >
              Jasa convert PayPal terpercaya untuk freelancer Indonesia sejak 2020. Dijalankan oleh <strong className="font-extrabold text-slate-950">bot 24/7</strong> dan <strong className="font-extrabold text-slate-950">admin manusia</strong>, bukan auto-bot asal jalan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <button
                type="button"
                onClick={handleConvertClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <MessageCircle size={18} />
                Chat Bang Ade
                <ArrowRight size={16} />
              </button>
              <a
                href="#calc"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                Cek rate
                <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['SD', 'BR', 'LK', 'YP'].map((initial, index) => (
                  <span
                    key={initial}
                    className={cn(
                      'grid size-9 place-items-center rounded-full border-2 border-white text-xs font-black text-slate-950',
                      ['bg-blue-100', 'bg-amber-100', 'bg-pink-100', 'bg-green-100'][index],
                    )}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex justify-center gap-0.5 sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-1 text-pretty text-sm text-slate-600">
                  <strong className="font-black text-slate-950">500+</strong> freelancer · <strong className="font-black text-slate-950">99.8%</strong> berhasil
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7">
              <div className="mb-5 flex rounded-2xl bg-slate-100 p-1">
                {[
                  { key: 'convert' as Mode, label: 'Convert PayPal → IDR' },
                  { key: 'topup' as Mode, label: 'Top-up USD' },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setMode(option.key)}
                    className={cn(
                      'flex-1 rounded-xl px-3 py-2.5 text-xs font-black transition duration-200 sm:text-sm',
                      mode === option.key ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <label htmlFor="hero-usd-amount" className="block text-xs font-black uppercase text-slate-500">
                  {mode === 'convert' ? 'Kamu transfer' : 'PayPal kamu terisi'}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4">
                  <span className="font-mono text-sm font-bold text-slate-500 tabular-nums">USD</span>
                  <input
                    id="hero-usd-amount"
                    type="number"
                    min="1"
                    value={usdAmount}
                    onChange={handleInputChange}
                    className="min-w-0 flex-1 bg-transparent font-mono text-3xl font-bold text-slate-950 outline-none tabular-nums"
                  />
                  <span className="text-xs font-bold text-slate-400">PayPal</span>
                </div>
              </div>

              <div className="-my-1 flex justify-center">
                <span className="grid size-10 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                  <ArrowDownUp size={18} />
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase text-slate-500">
                  {mode === 'convert' ? 'Kamu terima' : 'Total bayar'}
                </p>
                <div className="flex items-center gap-3 rounded-2xl border-2 border-brand-600 bg-brand-50 px-4 py-4">
                  <span className="font-mono text-sm font-bold text-brand-700 tabular-nums">IDR</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-2xl font-bold text-brand-700 tabular-nums sm:text-3xl">
                    {mode === 'convert' ? formatIDR(idrReceived) : formatIDR(topupIdrTotal)}
                  </span>
                  <span className="text-xs font-black text-brand-700">→ BCA</span>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                <div>
                  <span className="sr-only">
                    1 USD = Rp {(mode === 'convert' ? convertRate : effectiveTopupRate).toLocaleString('id-ID')}
                  </span>
                  1 USD ={' '}
                  <strong className="font-mono font-black text-slate-800 tabular-nums">
                    Rp {(mode === 'convert' ? convertRate : effectiveTopupRate).toLocaleString('id-ID')}
                  </strong>
                </div>
                <div>
                  Fee: <strong className="font-mono font-black text-slate-800 tabular-nums">${fee.toFixed(2)}</strong>
                  {isPromoApplied && <span className="ml-1 font-bold text-green-600">Promo</span>}
                </div>
                <div className="flex items-center gap-1 sm:justify-end">
                  <RefreshCw size={12} className={isLoadingRate ? 'animate-spin' : ''} />
                  <span>{isLoadingRate ? 'Memuat rate...' : `Sumber: ${rateSource === 'api' ? 'API' : 'Fallback'}`}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConvertClick}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-brand-600/30 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700 sm:text-base"
              >
                <MessageCircle size={18} />
                <span>{mode === 'convert' ? 'Lanjut Convert ke Rupiah' : 'Lanjut Top-up USD'}</span>
                <ArrowRight size={18} />
              </button>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-2"><CheckCircle size={15} className="text-brand-600" />Verifikasi manual aman</span>
                  <span>30–60 menit</span>
                  <span>Semua bank & e-wallet</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

};
